import React, {useCallback, useLayoutEffect, useState} from 'react';
import {
  Active,
  ActiveDetailsScreenProps,
  ActiveState,
  Attribute,
  File,
  RecordState,
} from 'types';
import {fetchUnits} from 'store/slices/unit/unitAsyncThunk';
import {
  deleteActive,
  fetchActive,
  fetchActives,
  updateActive,
} from 'store/slices/active/activeAsyncThunk';
import store, {useAppDispatch, useAppSelector} from 'store/configureStore';
import {
  Button,
  Text,
  View,
  Modal,
  RecordModal,
  DynamicSection,
  ImageUpload,
  UserModal,
} from 'components';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
  ToastAndroid,
} from 'react-native';
import {translate} from 'core';
import dayjs from 'dayjs';
import {useFocusEffect} from '@react-navigation/core';
import {clearActiveType} from 'store/slices/activeType/activeTypeSlice';
import {fetchActiveRecords} from 'store/slices/record/recordAsyncThunk';
import {resetActiveState} from 'store/slices/active/activeSlice';

export const ActiveDetails: React.FC<ActiveDetailsScreenProps> = ({
  route,
  navigation,
}) => {
  const [basicAttributes, setBasicAttributes] = useState<Attribute[]>([]);
  const [customAttributes, setCustomAttributes] = useState<Attribute[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [description, setDescription] = useState<string>('');
  const [change, setChange] = useState<boolean>(false);
  const [update, setUpdate] = useState<string>('');
  const [saved, setSaved] = useState<boolean>(false);
  const [openActivity, setOpenActivity] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const activeState: ActiveState = useAppSelector((state) => state.active);
  const recordState: RecordState = useAppSelector((state) => state.record);

  //Unmount when screen loses focus
  useFocusEffect(
    useCallback(() => {
      return () => {
        return () => {
          setUpdate('');
          clearActiveType();
        };
      };
    }, []),
  );

  useLayoutEffect(() => {
    store.dispatch(fetchActiveRecords(route.params.recordId));
    store.dispatch(fetchActive(route.params.activeId));
    store.dispatch(fetchUnits());
  }, [route.params]);

  useLayoutEffect(() => {
    if (activeState.active !== null) {
      setFile(activeState.active.file);
      setBasicAttributes(activeState.active.basicAttributes);
      setCustomAttributes(activeState.active.customAttributes);
    }
  }, [activeState.active]);

  useLayoutEffect(() => {
    if (recordState.activeRecord !== null) {
      const _date = new Date(
        recordState.activeRecord.dateRecord[
          recordState.activeRecord.dateRecord.length - 1
        ],
      );
      setUpdate(dayjs(_date).format('DD/MM/YYYY'));
    } else {
      setUpdate(translate('record.empty'));
    }
  }, [recordState.activeRecord]);

  const onSave = () => {
    if (change && activeState.active !== null) {
      setSaved(true);
      const _item: Active = {
        ...activeState.active,
        file: file !== null ? {...file} : null,
        description: description,
        basicAttributes: [...basicAttributes],
        customAttributes: [...customAttributes],
      };
      dispatch(updateActive(_item)).then(() => {
        fetchActives({page: 1, itemsPerPage: 7});
        setChange(false);
        ToastAndroid.showWithGravity(
          translate('success.general.saved'),
          ToastAndroid.CENTER,
          ToastAndroid.SHORT,
        );
      });
    }
  };

  const onDelete = () => {
    Alert.alert(
      translate('form.active.action.delete.title') +
        ' ' +
        activeState.active?.reference +
        '?',
      translate('form.active.action.delete.message', {
        name: 'hola',
      }),
      [
        {
          text: translate('action.general.cancel'),
          onPress: () => null,
        },
        {
          text: translate('action.general.delete'),
          onPress: onDeleteActive,
        },
      ],
    );
  };

  const onDeleteActive = () => {
    dispatch(deleteActive(route.params.activeId)).then(() => {
      dispatch(resetActiveState());
      dispatch(fetchActives({page: 1, itemsPerPage: 7}));
      navigation.goBack();
    });
  };

  const _handleRefresh = () => {
    dispatch(fetchActive(route.params.activeId));
  };

  const onChange = useCallback(() => {
    if (!change) {
      setChange(true);
    }
  }, [change]);

  const onFileChange = (_file: File | null) => {
    if (_file !== null) {
      setFile({..._file});
    } else {
      setFile(null);
    }
    onChange();
  };

  const onDescriptionChange = (_description: string) => {
    setDescription(_description);
    onChange();
  };

  return (
    <View style={styles.container} marginHorizontal="m" marginBottom="m">
      {activeState.loading && !saved ? (
        <View style={styles.loading}>
          <ActivityIndicator
            size="large"
            color="black"
            animating={activeState.loading}
          />
        </View>
      ) : (
        <View marginBottom="xl">
          <ScrollView
            horizontal={false}
            refreshControl={
              <RefreshControl
                refreshing={activeState.loading}
                onRefresh={_handleRefresh}
              />
            }>
            <View style={styles.header} paddingTop="m" marginRight="m">
              <TouchableOpacity
                style={styles.info}
                onPress={() => setOpenActivity(!openActivity)}>
                <View style={styles.activity} marginRight="m">
                  <View marginBottom="s">
                    <Text variant="updated">
                      {translate('active.lastUpdate')}
                    </Text>
                  </View>
                  <View>
                    <Text>{update}</Text>
                  </View>
                </View>
                <View style={styles.icon}>
                  <Icon name="file-tray-full" size={34} />
                </View>
              </TouchableOpacity>
              {change && (
                <View width={100}>
                  <Button
                    onPress={onSave}
                    variant="secondary"
                    label={translate('action.general.save')}
                  />
                </View>
              )}
            </View>
            <Modal
              children={
                <RecordModal
                  {...{route, navigation}}
                  activeRecord={recordState.activeRecord}
                />
              }
              show={openActivity}
              setVisibility={setOpenActivity}
            />
            <View alignSelf="flex-start">
              <View style={styles.entryDate} marginVertical="m">
                <View>
                  <Text variant="formLabel">
                    {translate('form.active.entryDate.label')}
                  </Text>
                </View>
                <View marginTop="s">
                  <Text>
                    {dayjs(activeState.active?.entryDate).format('DD/MM/YYYY')}
                  </Text>
                </View>
              </View>
            </View>
            <View>
              <View flexDirection="column" alignItems="flex-start">
                <View>
                  <Text variant="formLabel">
                    {translate('form.active.reference.label')}
                  </Text>
                </View>
                <View>
                  <Text>{activeState.active?.reference}</Text>
                </View>
              </View>
            </View>
            <View marginTop="m" marginBottom="s">
              <View>
                <Text variant="formLabel">
                  {translate('form.active.type.label')}
                </Text>
              </View>
              <View marginVertical="s">
                <Text>{activeState.active?.activeType.name}</Text>
              </View>
            </View>
            <View>
              <ImageUpload file={file} saveImage={onFileChange} />
            </View>
            <View marginTop="l" marginBottom="m">
              <View marginBottom="m">
                <Text variant="formLabel">
                  {translate('form.active.description')}
                </Text>
              </View>
              <View
                borderRadius={10}
                borderColor="primary"
                borderWidth={1}
                width={280}>
                <TextInput
                  style={{textAlignVertical: 'top', paddingRight: 10}}
                  numberOfLines={4}
                  value={description}
                  multiline={true}
                  onChangeText={onDescriptionChange}
                  maxLength={255}
                />
              </View>
            </View>
            <View>
              <View marginVertical="m">
                <DynamicSection
                  editValue={true}
                  collection={basicAttributes}
                  label={translate('form.active.basicAttribute.label')}
                  isEditable={false}
                  editDropdownValue={false}
                  setChanges={(_basicAttributes) =>
                    setBasicAttributes(_basicAttributes)
                  }
                  open={true}
                />
              </View>
              <View marginTop="m" marginBottom="l">
                <DynamicSection
                  editValue={true}
                  collection={customAttributes}
                  label={translate('form.active.customAttribute.label')}
                  isEditable={true}
                  editDropdownValue={true}
                  setChanges={(_customAttributes) =>
                    setCustomAttributes(_customAttributes)
                  }
                  open={true}
                />
              </View>
            </View>
            <View>
              <UserModal user={activeState.active?.createdBy} />
            </View>
            <View marginHorizontal="xxl" marginTop="xxl" marginBottom="xxl">
              <Button
                variant="delete"
                label={translate('action.general.delete')}
                onPress={onDelete}
              />
            </View>
          </ScrollView>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  loading: {
    alignItems: 'center',
    height: 400,
    justifyContent: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  activity: {
    flexDirection: 'column',
  },
  info: {
    flexDirection: 'row',
  },
  icon: {
    justifyContent: 'center',
  },
  entryDate: {},
});
