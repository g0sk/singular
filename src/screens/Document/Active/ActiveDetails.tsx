import React, {useEffect, useLayoutEffect, useState} from 'react';
import {RecordList} from 'components';
import store, {useAppDispatch, useAppSelector} from 'store/configureStore';
import Icon from 'react-native-vector-icons/Ionicons';
import {translate} from 'core/i18n';
import dayjs from 'dayjs';
import {fetchActiveTypes} from 'store/slices/activeType/activeTypeAsyncThunk';
import {
  deleteActive,
  fetchActive,
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
} from 'types';
import {clearActive} from 'store/slices/active/activeSlice';
import {fetchUnits} from 'store/slices/unit/unitAsyncThunk';

export const ActiveDetails: React.FC<ActiveDetailsScreenProps> = ({
  route,
  navigation,
}) => {
  const dispatch = useAppDispatch();
  const [change, setChange] = useState<boolean>(false);
  const [showCalendar, setShowCalendar] = useState<boolean>(false);
  const [openActivity, setOpenActivity] = useState<boolean>(false);
  const [focused, setFocused] = useState<boolean>(false);
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
  const {activeTypes}: ActiveTypeState = useAppSelector(
    (state) => state.activeType,
  );

  //Handlers
  const _onRefreshHandler = () => {
    dispatch(fetchActive(route.params.activeId));
    dispatch(fetchActiveTypes());
  };

  const _handleDelete = () => {
    dispatch(deleteActive(route.params.activeId));
    navigation.reset({
      index: 0,
      routes: [{name: 'DocumentList', params: {tab: 'active'}}],
    });
  };

  const _handleSave = () => {
    const _item = {...item};
    if (change) {
      if (reference.length >= 2 && type && date) {
        _item.reference = reference;
        _item.entryDate = date.toString();
        _item.activeType = {...type};
        _item.basicAttributes = [...basicAttributes];
        _item.customAttributes = [...customAttributes];
        dispatch(updateActive(_item));
      } else {
        ToastAndroid.showWithGravity(
          'Reference must be 2 characters at least',
          ToastAndroid.CENTER,
          ToastAndroid.SHORT,
        );
      }
    }
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

  useLayoutEffect(() => {
    setLoading(true);
  }, []);

  useLayoutEffect(() => {
    if (activeState.active !== null) {
      setItem(activeState.active);
      setReference(activeState.active.reference);
      setDate(new Date(activeState.active.entryDate));
      setType(activeState.active.activeType);
      setBasicAttributes([...activeState.active.activeType.basicAttributes]);
      setCustomAttributes([...activeState.active.activeType.customAttributes]);
    }
    setLoading(activeState.loading);
  }, [activeState]);

  //component mount
  useEffect(() => {
    store.dispatch(fetchActiveTypes());
    store.dispatch(fetchUnits());
    const {activeId} = route.params;
    store.dispatch(fetchActive(activeId));
  }, [route.params]);

  //Displayed entryDate
  useLayoutEffect(() => {
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
      setLastUpdate('No records');
    }
  }, [recordState.activeRecord]);

  useEffect(() => {
    //navigation.setParams({title: reference});
    if (reference.length < 2) {
      setReferenceError('error');
    } else {
      setReferenceError(undefined);
    }
  }, [navigation, reference]);

  //Unmount
  useEffect(() => {
    return () => {
      store.dispatch(clearActive());
    };
  });

  return (
    <View style={styles.container} marginHorizontal="m" marginBottom="m">
      {loading ? (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="black" animating={loading} />
        </View>
      ) : (
        <View marginBottom="xl">
          <ScrollView
            horizontal={false}
            refreshControl={
              <RefreshControl
                refreshing={loading}
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
                <RecordList
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
                    <Text variant="formLabel">Entry Date</Text>
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
                    <Text variant="formLabel">Reference</Text>
                  </View>
                  <View height={40}>
                    <TextInput
                      setFocused={setFocused}
                      focused={focused}
                      textAlign="left"
                      value={reference}
                      placeholder="Reference id"
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
                <Text variant="formLabel">Type</Text>
              </View>
              <View marginVertical="s">
                <Dropdown
                  selected={type}
                  options={activeTypes}
                  header="Types"
                  placeholder="Select type"
                  setParentValue={_handleTypeChange}
                />
              </View>
            </View>
            <View marginVertical="m">
              <DynamicSection
                collection={basicAttributes}
                label="Basic Attributes"
                isEditable={false}
                setChanges={_handleBasicAttributesChange}
                open={true}
              />
            </View>
            <View marginTop="m" marginBottom="l">
              <DynamicSection
                collection={customAttributes}
                label="Custom Attributes"
                isEditable={true}
                setChanges={_handleCustomAttributesChange}
                open={true}
              />
            </View>
            <View marginHorizontal="xxl" marginTop="xxl" marginBottom="xxl">
              <Button variant="delete" label="Delete" onPress={_handleDelete} />
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
