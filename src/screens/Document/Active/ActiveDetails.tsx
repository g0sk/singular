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
  RecordModal,
  DynamicSection,
  ImageUpload,
  UserModal,
} from 'components';
import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  StyleSheet,
  TextInput,
  Alert,
  ToastAndroid,
} from 'react-native';
import {translate} from 'core';
import dayjs from 'dayjs';
import {useFocusEffect} from '@react-navigation/core';
import {fetchActiveRecords} from 'store/slices/record/recordAsyncThunk';
import {clearActive, resetActiveState} from 'store/slices/active/activeSlice';
import {resetRecordState} from 'store/slices/record/recordSlice';
import {resetUnitState} from 'store/slices/unit/unitSlice';
import {resetActiveTypeState} from 'store/slices/activeType/activeTypeSlice';
import {fetchActiveTypes} from 'store/slices/activeType/activeTypeAsyncThunk';
import {useTheme} from 'ui/theme';

export const ActiveDetails: React.FC<ActiveDetailsScreenProps> = ({
  route,
  navigation,
}) => {
  const [basicAttributes, setBasicAttributes] = useState<Attribute[]>([]);
  const [customAttributes, setCustomAttributes] = useState<Attribute[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [description, setDescription] = useState<string>('');
  const [change, setChange] = useState<boolean>(false);
  const [saved, setSaved] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const {colors} = useTheme();
  const activeState: ActiveState = useAppSelector((state) => state.active);
  const recordState: RecordState = useAppSelector((state) => state.record);

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

  //Unmount when screen loses focus
  useFocusEffect(
    useCallback(() => {
      return () => {
        store.dispatch(resetRecordState());
        store.dispatch(resetUnitState());
        store.dispatch(clearActive());
      };
    }, []),
  );

  const onSave = () => {
    if (change && activeState.active !== null) {
      setSaved(true);
      const active: Active = {
        ...activeState.active,
        file: file !== null ? {...file} : null,
        description: description,
        basicAttributes: [...basicAttributes],
        customAttributes: [...customAttributes],
      };
      dispatch(updateActive(active)).then(() => {
        if (activeState.active !== null) {
          dispatch(fetchActiveRecords(activeState.active.activeRecord.id));
          dispatch(resetActiveState());
          dispatch(
            fetchActives({
              pagination: {page: 1, itemsPerPage: 7},
              filters: [{key: 'order[entryDate]', value: 'desc'}],
            }),
          );
        }
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
      dispatch(
        fetchActives({
          pagination: {page: 1, itemsPerPage: 7},
          filters: [{key: 'order[entryDate]', value: 'desc'}],
        }),
      );
      dispatch(resetActiveTypeState());
      dispatch(
        fetchActiveTypes({
          pagination: {page: 1, itemsPerPage: 9},
          filters: [{key: 'order[id]', value: 'desc'}],
        }),
      );
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

  const onBasicAttributesChange = (_basicAttributes: Attribute[]) => {
    setBasicAttributes([..._basicAttributes]);
    onChange();
  };
  const onCustomAttributesChange = (_customAttributes: Attribute[]) => {
    setCustomAttributes([..._customAttributes]);
    onChange();
  };

  return (
    <View style={styles.container} marginHorizontal="m" marginBottom="m">
      {activeState.loading && !saved ? (
        <View style={styles.loading}>
          <ActivityIndicator
            size="large"
            color={colors.primary}
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
              <View justifyContent="space-between">
                <RecordModal
                  {...{route, navigation}}
                  activeRecord={recordState.activeRecord}
                />
              </View>
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
            <ImageUpload file={file} saveImage={onFileChange} />
            <View marginTop="l" marginBottom="m">
              <View marginBottom="m">
                <Text variant="formLabel">
                  {translate('form.active.description.label')}
                </Text>
              </View>
              <View
                borderRadius={10}
                borderColor="primary"
                borderWidth={1}
                width={280}>
                <TextInput
                  style={{textAlignVertical: 'top', padding: 10}}
                  placeholder={translate('form.active.description.placeholder')}
                  numberOfLines={4}
                  value={description}
                  multiline={true}
                  onChangeText={onDescriptionChange}
                  maxLength={255}
                />
              </View>
            </View>
            <View>
              <View marginVertical="s">
                <DynamicSection
                  collection={basicAttributes}
                  label={translate('form.active.basicAttribute.label')}
                  canAddItems={false}
                  editValue={true}
                  editDropdownValue={false}
                  setChanges={onBasicAttributesChange}
                  open={true}
                />
              </View>
              <View marginBottom="m">
                <DynamicSection
                  collection={customAttributes}
                  label={translate('form.active.customAttribute.label')}
                  canAddItems={true}
                  editValue={true}
                  editDropdownValue={true}
                  setChanges={onCustomAttributesChange}
                  open={true}
                />
              </View>
            </View>
            <UserModal user={activeState.active?.createdBy} created={true} />
            <View marginHorizontal="xxl" marginTop="l" marginBottom="xxl">
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
