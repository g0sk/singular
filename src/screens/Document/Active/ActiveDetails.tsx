import React, {useEffect, useState} from 'react';
import {RecordList} from 'screens/Record/RecordList';
import store, {useAppDispatch, useAppSelector} from 'store/configureStore';
import Icon from 'react-native-vector-icons/Ionicons';
import {translate} from 'core/i18n';
import dayjs from 'dayjs';
import {clearActive} from 'store/slices/active/activeSlice';
import {fetchActiveTypes} from 'store/slices/activeType/activeTypeAsyncThunk';
import {
  createActive,
  updateActive,
  //deleteActive,
  fetchActive,
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

export const ActiveDetails: React.FC<ActiveDetailsScreenProps> = ({route}) => {
  const dispatch = useAppDispatch();
  const [change, setChange] = useState<boolean>(false);
  const [showCalendar, setShowCalendar] = useState<boolean>(false);
  const [openActivity, setOpenActivity] = useState<boolean>(false);
  const [focused, setFocused] = useState<boolean>(false);

  //Active values
  const [item, setItem] = useState<Active | null>(null);
  const [date, setDate] = useState<Date>(new Date());
  const [type, setType] = useState<ActiveType | null>(null);
  const [formattedDate, setFormattedDate] = useState<string>('');
  const [lastUpdate, setLastUpdate] = useState<string>('');
  const [basicAttributes, setBasicAttributes] = useState<Attribute[] | null>(
    null,
  );
  const [customAttributes, setCustomAttributes] = useState<Attribute[] | null>(
    null,
  );

  //slices
  const recordState: RecordState = useAppSelector((state) => state.record);
  const {active, loading}: ActiveState = useAppSelector(
    (state) => state.active,
  );
  const {activeTypes}: ActiveTypeState = useAppSelector(
    (state) => state.activeType,
  );

  //Handlers
  const _onRefreshHandler = () => {
    dispatch(fetchActive(route.params.activeId));
    dispatch(fetchActiveTypes());
  };

  const _handleSave = () => {
    if (item !== null) {
      if (item?.id !== null) {
        dispatch(updateActive(item));
      } else {
        dispatch(createActive(item));
      }
    }
  };

  const _handleTypeChange = (_item: ActiveType) => {
    setType(_item);
  };

  //Sideeffects

  //component mount
  useEffect(() => {
    setChange(true);
    const {activeId} = route.params;
    store.dispatch(fetchActiveTypes());
    store.dispatch(fetchActive(activeId));
  }, [route.params]);

  useEffect(() => {
    if (active !== null) {
      console.log('pepega');
      setItem(active);
      setDate(new Date(active.entryDate));
      setType(active.activeType);
      setBasicAttributes([...active.activeType.basicAttributes]);
      setCustomAttributes([...active.activeType.customAttributes]);
    }
  }, [active]);

  //Displayed entryDate
  useEffect(() => {
    if (date) {
      setFormattedDate(dayjs(date).format('DD/MM/YYYY'));
    }
  }, [date]);

  useEffect(() => {
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

  //Unmount
  useEffect(() => {
    return () => {
      store.dispatch(clearActive());
    };
  }, []);

  return (
    <View style={styles.container} margin="m">
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
            <View style={styles.header}>
              <TouchableOpacity
                style={styles.info}
                onPress={() => setOpenActivity(!openActivity)}>
                <View style={styles.activity} marginRight="m">
                  <View marginBottom="s">
                    <Text variant="updated">
                      {translate('active.lastUpdate')}
                    </Text>
                  </View>
                  <View style={styles.date}>
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
                    showCalendar={showCalendar}
                    setShowCalendar={setShowCalendar}
                    setParentDate={setDate}
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
                      value={item?.reference}
                      placeholder="Reference id"
                      autoCapitalize="none"
                      editable={true}
                    />
                  </View>
                </View>
              </TouchableOpacity>
            </View>
            <View marginVertical="s">
              <View>
                <Text variant="formLabel">Type</Text>
              </View>
              <View marginVertical="s">
                <Dropdown
                  selected={type}
                  options={activeTypes}
                  emptyMessage="No items"
                  header="Types"
                  setParentValue={_handleTypeChange}
                />
              </View>
            </View>
            <View marginVertical="m">
              <DynamicSection
                collection={basicAttributes}
                label="Basic Attributes"
                isEditable={true}
                setChanges={() => null}
              />
            </View>
            <View marginTop="m" marginBottom="l">
              <DynamicSection
                collection={customAttributes}
                label="Custom Attributes"
                isEditable={false}
                setChanges={() => null}
              />
            </View>
            <View marginHorizontal="xxl" marginTop="xxl" marginBottom="xxl">
              <Button variant="delete" label="Delete" onPress={() => null} />
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
  date: {
    //alignItems: 'center',
  },
  info: {
    flexDirection: 'row',
  },
  icon: {
    justifyContent: 'center',
  },
  entryDate: {},
});
