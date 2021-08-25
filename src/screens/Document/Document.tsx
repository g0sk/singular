import React, {useEffect} from 'react';
import {Text, View, Button} from 'components';
import {translate} from 'core';
import {DocumentStackProps} from 'types';
import {StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
//import * as DatePicker from 'react-native-modern-datepicker';

export const Document: React.FC<DocumentStackProps> = ({route}) => {
  //const [change, setChange] = useState<boolean>(false);
  /* const [date, setDate] = useState<Date>(new Date());
  const [active, setActive] = useState<Active>();
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false); */

  useEffect(() => {
    //setActive(route.params.active);
    console.log(route.params.active);
  }, [route.params.active]);
  return (
    <View style={styles.container} margin="m">
      {/* {showDatePicker && (
        <DatePicker
          mode="date"
          display="inline"
          onChange={onChange}
          value={date}
          maximumDate={new Date(2300, 10, 20)}
          minimumDate={new Date(1950, 0, 1)}
        />
      )} */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.info}>
          <View style={styles.update} marginRight="m">
            <View marginBottom="s">
              <Text variant="updated">{translate('active.lastUpdate')}</Text>
            </View>
            <View style={styles.date}>
              <Text>17/17/27</Text>
            </View>
          </View>
          <View style={styles.icon}>
            <Icon name="documents" size={34} />
          </View>
        </TouchableOpacity>
        <View width={100}>
          <Button
            onPress={() => null}
            variant="secondary"
            label={translate('action.general.save')}
          />
        </View>
      </View>
      <View style={styles.form} marginTop="l" padding="m">
        <Text>holi</Text>
      </View>
      <View marginVertical="xl" marginHorizontal="xxl">
        <Button
          onPress={() => null}
          variant="delete"
          label={translate('action.general.delete')}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  update: {
    flexDirection: 'column',
  },
  date: {
    alignItems: 'center',
  },
  info: {
    flexDirection: 'row',
  },
  icon: {
    justifyContent: 'center',
  },
  button: {},
  form: {
    height: 200,
    borderRadius: 25,
    borderColor: '#4b4a4d',
    borderWidth: 2,
  },
  field: {},
});
