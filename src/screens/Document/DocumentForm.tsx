import React, {useEffect, useState} from 'react';
import {RecordList} from 'screens/Record/RecordList';
import {useAppSelector} from 'store/configureStore';
import Icon from 'react-native-vector-icons/Ionicons';
import {translate} from 'core/i18n';
import {Button, Dropdown, DatePicker, Modal, Text, View} from 'components';
import {
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {
  //Active,
  ActiveState,
  ActiveType,
  //Attribute,
  DocumentFormProps,
  //Record,
  RecordState,
} from 'types';

export const DocumentForm: React.FC<DocumentFormProps> = ({active}) => {
  const [change, setChange] = useState<boolean>(false);
  //const [item, setItem] = useState<Active>({} as Active);
  const {activeTypes}: ActiveState = useAppSelector((state) => state.active);
  const [type, setType] = useState<ActiveType>({} as ActiveType);
  const [showCalendar, setShowCalendar] = useState<boolean>(false);
  const [date, setDate] = useState<Date>(new Date());
  const [formattedDate, setFormattedDate] = useState<string>('');
  //const [basicAttributes, setBasicAttributes] = useState<Attribute[]>([]);
  //const [customAttributes, setCustomAttributes] = useState<Attribute[]>([]);
  const [openActivity, setOpenActivity] = useState<boolean>(false);
  const [lastUpdate, setLastUpdate] = useState<string>('');
  const {activeRecord, loading}: RecordState = useAppSelector(
    (state) => state.record,
  );
  const [enableScrollViewScroll, setEnableScrollViewScroll] = useState<boolean>(
    false,
  );

  //Active/new active mount
  useEffect(() => {
    setChange(true);
    if (active !== null) {
      console.log(active);
      //setItem(active);
      if (active.activeType) {
        setType(active.activeType);
        //setBasicAttributes([...active.activeType.basicAttributes]);
        //setCustomAttributes([...active.activeType.customAttributes]);
      }
    }
  }, [active, activeTypes]);

  //Displayed entryDate
  useEffect(() => {
    setFormattedDate(date.toLocaleDateString('es'));
  }, [date]);

  useEffect(() => {
    if (activeRecord !== null) {
      setLastUpdate(
        new Date(
          activeRecord.dateRecord[activeRecord.dateRecord.length - 1],
        ).toLocaleDateString('es'),
      );
    }
  }, [activeRecord]);

  const _setScroll = () => {
    setEnableScrollViewScroll(true);
    return true;
  };

  return (
    <View
      style={styles.container}
      onStartShouldSetResponderCapture={_setScroll}>
      {loading ? (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="black" animating={loading} />
        </View>
      ) : (
        <ScrollView horizontal={false} scrollEnabled={enableScrollViewScroll}>
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
                  <Text>{lastUpdate}</Text>
                </View>
              </View>
              <View style={styles.icon}>
                <Icon name="file-tray-full" size={34} />
              </View>
            </TouchableOpacity>
            {change && (
              <View width={100}>
                <Button
                  onPress={() => null}
                  variant="secondary"
                  label={translate('action.general.save')}
                />
              </View>
            )}
          </View>
          {active !== null && (
            <Modal
              children={<RecordList activeRecord={activeRecord} />}
              show={openActivity}
              setVisibility={setOpenActivity}
            />
          )}
          <View>
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
          <View marginVertical="s">
            <View>
              <Text variant="formLabel">Type</Text>
            </View>
            <View marginVertical="s">
              <Dropdown
                selected={type}
                options={activeTypes}
                placeholder="Select"
                emptyMessage="No items"
                header="Types"
                setParentValue={setType}
              />
            </View>
          </View>
          <View>
            {/*  <DynamicSection
              setParentScroll={setEnableScrollViewScroll}
              parentNativeEvent={nativeEvent}
              collection={item.basicAttributes}
              label="Basic Attributes"
            /> */}
          </View>
        </ScrollView>
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
