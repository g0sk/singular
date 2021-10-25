import React, {useEffect, useLayoutEffect, useState} from 'react';
import store, {useAppDispatch, useAppSelector} from 'store/configureStore';
import Icon from 'react-native-vector-icons/Ionicons';
import {translate} from 'core';
import dayjs from 'dayjs';
import {
  fetchActiveType,
  fetchActiveTypes,
} from 'store/slices/activeType/activeTypeAsyncThunk';
import {
  deleteActive,
  fetchActive,
  fetchActives,
  updateActive,
} from 'store/slices/active/activeAsyncThunk';
import {
  Button,
  Dropdown,
  DatePicker,
  DynamicSection,
  Modal,
  Text,
  SimpleTextInput as TextInput,
  RecordModal,
  View,
} from 'components';
import {
  ActivityIndicator,
  TouchableOpacity,
  RefreshControl,
  StyleSheet,
  ScrollView,
  ToastAndroid,
} from 'react-native';
import {
  Active,
  ActiveState,
  ActiveType,
  ActiveTypeState,
  Attribute,
  RecordState,
  ActiveDetailsScreenProps,
  ServerError,
} from 'types';
import {fetchUnits} from 'store/slices/unit/unitAsyncThunk';
import {clearActive} from 'store/slices/active/activeSlice';
import {clearActiveType} from 'store/slices/activeType/activeTypeSlice';
import {fetchActiveRecord} from 'store/slices/record/recordAsyncThunk';
import {useFormik} from 'formik';
import * as Yup from 'yup';

export const ActiveDetails: React.FC<ActiveDetailsScreenProps> = ({
  route,
  navigation,
}) => {
  const dispatch = useAppDispatch();
  const [change, setChange] = useState<boolean>(false);
  const [showCalendar, setShowCalendar] = useState<boolean>(false);
  const [openActivity, setOpenActivity] = useState<boolean>(false);
  const [focused, setFocused] = useState<boolean>(false);
  const [save, setSave] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  //Active values
  const [item, setItem] = useState<Active>({} as Active);
  const [reference, setReference] = useState<string>('');
  const [date, setDate] = useState<Date>(new Date());
  const [type, setType] = useState<ActiveType | null>(null);
  const [formattedDate, setFormattedDate] = useState<string>('');
  const [lastUpdate, setLastUpdate] = useState<string>('');
  const [basicAttributes, setBasicAttributes] = useState<Attribute[]>([]);
  const [customAttributes, setCustomAttributes] = useState<Attribute[]>([]);

  //Errors
  const [referenceError, setReferenceError] = useState<string | undefined>(
    undefined,
  );

  //slices
  const recordState: RecordState = useAppSelector((state) => state.record);
  const activeState: ActiveState = useAppSelector((state) => state.active);
  const activeTypeState: ActiveTypeState = useAppSelector(
    (state) => state.activeType,
  );

  //Handlers
  const _onRefreshHandler = () => {
    dispatch(fetchActive(route.params.activeId));
    dispatch(fetchActiveTypes());
  };

  const _handleDelete = () => {
    dispatch(deleteActive(route.params.activeId)).then(() => {
      dispatch(fetchActives());
      navigation.goBack();
    });
  };

  const _handleSave = () => {
    const _item = {...item};
    if (change) {
      if (reference.length >= 2 && type) {
        setSave(true);
        _item.reference = reference;
        _item.entryDate = date.toString();
        _item.activeType = {...type};
        _item.basicAttributes = [...basicAttributes];
        _item.customAttributes = [...customAttributes];
        dispatch(updateActive(_item))
          .unwrap()
          .then(() => {
            dispatch(fetchActives());
            ToastAndroid.showWithGravity(
              translate('success.general.saved'),
              ToastAndroid.CENTER,
              ToastAndroid.SHORT,
            );
          })
          .catch((error: ServerError) => {
            ToastAndroid.showWithGravity(
              translate('error.general.used') +
                ' (' +
                error.violations[0].propertyPath +
                ')',
              ToastAndroid.CENTER,
              ToastAndroid.LONG,
            );
            setReferenceError('error');
          });
      } else {
        if (reference.length < 2) {
          ToastAndroid.showWithGravity(
            translate('form.field.minRef'),
            ToastAndroid.CENTER,
            ToastAndroid.SHORT,
          );
        }
        if (type === null) {
          ToastAndroid.showWithGravity(
            translate('form.field.unitSelect'),
            ToastAndroid.CENTER,
            ToastAndroid.SHORT,
          );
        }
      }
    }
    setSave(false);
    setChange(false);
  };

  const _handleDateChange = (_date: Date) => {
    setDate(_date);
    setChange(true);
  };

  const _handleReferenceChange = (_reference: string) => {
    setReference(_reference);
    setChange(true);
  };

  const _handleTypeChange = (_item: ActiveType) => {
    setType(_item);
    store.dispatch(fetchActiveType(_item.id));
    setChange(true);
  };

  const _handleBasicAttributesChange = (_basicAttributes: Attribute[]) => {
    setBasicAttributes([..._basicAttributes]);
    setChange(true);
  };

  const _handleCustomAttributesChange = (_customAttributes: Attribute[]) => {
    setCustomAttributes([..._customAttributes]);
    setChange(true);
  };

  //component mount
  useEffect(() => {
    store.dispatch(fetchActiveTypes());
    store.dispatch(fetchUnits());
    store.dispatch(fetchActive(route.params.activeId));
  }, [route.params.activeId]);

  useLayoutEffect(() => {
    if (activeState.active !== null) {
      store.dispatch(fetchActiveRecord(activeState.active.activeRecord.id));
    }
  }, [activeState.active]);

  useLayoutEffect(() => {
    if (activeState.loading || recordState.loading) {
      setLoading(true);
    }
    if (!activeState.loading && !recordState.loading) {
      setLoading(false);
    }
  }, [activeState.loading, recordState.loading]);

  //Displayed entryDate
  useEffect(() => {
    if (date) {
      setFormattedDate(dayjs(date).format('DD/MM/YYYY'));
    }
  }, [date]);

  useLayoutEffect(() => {
    if (recordState.activeRecord !== null) {
      const _date = new Date(
        recordState.activeRecord.dateRecord[
          recordState.activeRecord.dateRecord.length - 1
        ],
      );
      setLastUpdate(dayjs(_date).format('DD/MM/YYYY'));
    } else {
      setLastUpdate(translate('record.empty'));
    }
  }, [recordState.activeRecord]);

  useEffect(() => {
    navigation.setOptions({title: reference});
    if (reference.length < 2) {
      setReferenceError('error');
    } else {
      setReferenceError(undefined);
    }
  }, [navigation, reference]);

  useEffect(() => {
    return () => {
      store.dispatch(clearActive());
      store.dispatch(clearActiveType());
    };
  }, [save]);

  return (
    <View style={styles.container} marginHorizontal="m" marginBottom="m">
      {loading && !save ? (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="black" animating={loading} />
        </View>
      ) : (
        <View marginBottom="xl">
          <ScrollView
            horizontal={false}
            refreshControl={
              <RefreshControl
                refreshing={activeState.loading}
                onRefresh={_onRefreshHandler}
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
                    <Text>{lastUpdate ? lastUpdate : ''}</Text>
                  </View>
                </View>
                <View style={styles.icon}>
                  <Icon name="file-tray-full" size={34} />
                </View>
              </TouchableOpacity>
              {change && (
                <View width={100}>
                  <Button
                    onPress={_handleSave}
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
                  activeRecord={item ? recordState.activeRecord : null}
                />
              }
              show={openActivity}
              setVisibility={setOpenActivity}
            />
            <View alignSelf="flex-start">
              <TouchableOpacity onPress={() => setShowCalendar(!showCalendar)}>
                {showCalendar && (
                  <DatePicker
                    entryDate={date}
                    setShowCalendar={setShowCalendar}
                    setParentDate={_handleDateChange}
                  />
                )}
                <View style={styles.entryDate} marginVertical="m">
                  <View>
                    <Text variant="formLabel">
                      {translate('form.active.entryDate.label')}
                    </Text>
                  </View>
                  <View marginTop="s">
                    <Text>{formattedDate}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity onPress={() => setFocused(!focused)}>
                <View flexDirection="column" alignItems="flex-start">
                  <View>
                    <Text variant="formLabel">
                      {translate('form.active.reference.label')}
                    </Text>
                  </View>
                  <View height={40}>
                    <TextInput
                      setFocused={setFocused}
                      focused={focused}
                      textAlign="left"
                      value={reference}
                      placeholder={translate(
                        'form.active.reference.placeholder',
                      )}
                      autoCapitalize="none"
                      onChangeText={_handleReferenceChange}
                      error={referenceError}
                    />
                  </View>
                </View>
              </TouchableOpacity>
            </View>
            <View marginTop="m" marginBottom="s">
              <View>
                <Text variant="formLabel">
                  {translate('form.active.type.label')}
                </Text>
              </View>
              <View marginVertical="s">
                <Dropdown
                  selected={type}
                  editValue={true}
                  options={activeTypeState.activeTypes}
                  header={translate('form.active.type.header')}
                  placeholder={translate('form.active.type.placeholder')}
                  setParentValue={_handleTypeChange}
                />
              </View>
            </View>
            {activeTypeState.loading ? (
              <View>
                <ActivityIndicator
                  animating={activeTypeState.loading}
                  size="large"
                  color="black"
                />
              </View>
            ) : (
              <View>
                <View marginVertical="m">
                  <DynamicSection
                    editValue={true}
                    collection={basicAttributes}
                    label={translate('form.active.basicAttribute.label')}
                    isEditable={false}
                    editDropdownValue={false}
                    setChanges={_handleBasicAttributesChange}
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
                    setChanges={_handleCustomAttributesChange}
                    open={true}
                  />
                </View>
              </View>
            )}
            <View marginHorizontal="xxl" marginTop="xxl" marginBottom="xxl">
              <Button
                variant="delete"
                label={translate('action.general.delete')}
                onPress={_handleDelete}
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
