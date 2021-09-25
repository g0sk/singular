import React, {useEffect, useState} from 'react';
import {RecordList} from 'screens/Record/RecordList';
import {useAppSelector} from 'store/configureStore';
import Icon from 'react-native-vector-icons/Ionicons';
import {translate} from 'core/i18n';
import {
  Button,
  Dropdown,
  DatePicker,
  DynamicSection,
  Modal,
  Text,
  View,
} from 'components';
import {
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {
  Active,
  ActiveState,
  ActiveType,
  Attribute,
  RecordState,
  ActiveScreenProps,
} from 'types';

export const DocumentActive: React.FC<ActiveScreenProps> = ({route}) => {
  const [change, setChange] = useState<boolean>(false);
  const [item, setItem] = useState<Active | null>(null);
  const {activeTypes}: ActiveState = useAppSelector((state) => state.active);
  const [type, setType] = useState<ActiveType>({} as ActiveType);
  const [showCalendar, setShowCalendar] = useState<boolean>(false);
  const [date, setDate] = useState<Date>(new Date());
  const [formattedDate, setFormattedDate] = useState<string>('');
  const [basicAttributes, setBasicAttributes] = useState<Attribute[] | null>(
    null,
  );
  const [customAttributes, setCustomAttributes] = useState<Attribute[] | null>(
    null,
  );
  const [openActivity, setOpenActivity] = useState<boolean>(false);
  const [lastUpdate, setLastUpdate] = useState<string>('');
  const {activeRecord, loading}: RecordState = useAppSelector(
    (state) => state.record,
  );

  //Active/new active mount
  useEffect(() => {
    const {active} = route.params;
    setChange(true);
    if (active !== null) {
      setItem(active);
      setType(active.activeType);
      setBasicAttributes([...active.activeType.basicAttributes]);
      setCustomAttributes([...active.activeType.customAttributes]);
    }
  }, [route.params]);

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
    } else {
      setLastUpdate('No records');
    }
  }, [activeRecord]);

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
            bounces={true}
            alwaysBounceVertical={true}>
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
                    onPress={() => null}
                    variant="secondary"
                    label={translate('action.general.save')}
                  />
                </View>
              )}
            </View>
            <Modal
              children={
                <RecordList activeRecord={item ? activeRecord : null} />
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
            <View marginVertical="s">
              <View>
                <Text variant="formLabel">Type</Text>
              </View>
              <View marginVertical="s">
                <Dropdown
                  selected={type}
                  options={activeTypes}
                  placeholder="Select a type"
                  emptyMessage="No items"
                  header="Types"
                  setParentValue={setType}
                />
              </View>
            </View>
            <View marginVertical="m">
              <DynamicSection
                custom={false}
                collection={basicAttributes}
                label="Basic Attributes"
                canCreateNewField={false}
              />
            </View>
            <View marginTop="m" marginBottom="l">
              <DynamicSection
                custom={true}
                collection={customAttributes}
                label="Custom Attributes"
                canCreateNewField={false}
              />
            </View>
            <View marginHorizontal="xxl" marginTop="dxxl" marginBottom="xxl">
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
