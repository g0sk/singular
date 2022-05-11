import React, {useCallback, useLayoutEffect, useState} from 'react';
import {
  Active,
  ActiveDetailsScreenProps,
  ActiveState,
  Attribute,
  File,
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
  DynamicSection,
  ImageUpload,
  UserModal,
  Screen,
} from 'components';
import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  TextInput,
  Alert,
  ToastAndroid,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {translate} from 'core';
import dayjs from 'dayjs';
import {useFocusEffect} from '@react-navigation/core';
import {fetchActiveRecords} from 'store/slices/record/recordAsyncThunk';
import {resetActiveState} from 'store/slices/active/activeSlice';
import {resetRecordState} from 'store/slices/record/recordSlice';
import {resetUnitState} from 'store/slices/unit/unitSlice';
import {resetActiveTypeState} from 'store/slices/activeType/activeTypeSlice';
import {fetchActiveTypes} from 'store/slices/activeType/activeTypeAsyncThunk';
import {useTheme} from 'ui/theme';
import Icon from 'react-native-vector-icons/Ionicons';

const height = Dimensions.get('window').height;

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
        //store.dispatch(clearActive());
      };
    }, []),
  );

  const goToRecordList = () => {
    if (activeState.active) {
      navigation.navigate('RecordList', {
        recordId: activeState.active.activeRecord.id,
      });
    }
  };

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
        navigation.goBack();
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
    <Screen>
      <View marginHorizontal="m" marginBottom="m">
        {activeState.loading && !saved ? (
          <View
            justifyContent="center"
            alignItems="center"
            height={height - 60}>
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
              <View
                flexDirection="row"
                justifyContent="space-between"
                paddingTop="m"
                marginRight="m">
                <View justifyContent="space-between">
                  <TouchableOpacity onPress={goToRecordList}>
                    <View flexDirection="column" marginRight="m">
                      <View marginBottom="s">
                        <Text variant="updated">
                          {translate('active.lastUpdate')}
                        </Text>
                      </View>
                      <View flexDirection="row" alignItems="center">
                        <View marginRight="m">
                          <Text>{'09/09/09'}</Text>
                        </View>
                        <View marginRight="m">
                          <Icon name="file-tray-full" size={28} />
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
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
                <View marginVertical="m">
                  <View>
                    <Text variant="formLabel">
                      {translate('form.active.entryDate.label')}
                    </Text>
                  </View>
                  <View marginTop="s">
                    <Text>
                      {dayjs(activeState.active?.entryDate).format(
                        'DD/MM/YYYY',
                      )}
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
                    placeholder={translate(
                      'form.active.description.placeholder',
                    )}
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
    </Screen>
  );
};
