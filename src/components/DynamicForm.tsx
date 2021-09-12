export const a = 2;
/* import React, {useEffect, useState} from 'react';
import {View, Text, SimpleTextInput as TextInput, Dropdown} from 'components';
import {TouchableOpacity, StyleSheet} from 'react-native';
import {translate} from 'core';
import Icon from 'react-native-vector-icons/Feather';
import {ActiveTypes, FormProps} from 'types';
import {dateWithoutTimezone} from 'helpers/date';

export function DynamicForm<T>({item, setChange}: FormProps<T>) {
  const [object, setObject] = useState<T>({} as T);
  const [modified, setModified] = useState<boolean>(false);
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const [entryDate, setEntryDate] = useState<string>(new Date().toString());
  const activeTypes: ActiveTypes = [];
  const formattedEntryDate = dateWithoutTimezone(entryDate);

  useEffect(() => {
    setObject(item);
  }, [item]);

  return (
    <View style={styles.form} marginTop="l" marginRight="m">
      <View style={styles.field}>
        <Text marginVertical="s" variant="formLabel">
          {translate('form.active.entryDate.label')}
        </Text>
        <View style={styles.entryDate}>
          <View width={150} marginRight="xl">
            <TextInput
              placeholder={translate('form.active.entryDate.placeholder')}
              editable={false}
              value={formattedEntryDate}
            />
          </View>
          <TouchableOpacity onPress={() => setShowDatePicker(!showDatePicker)}>
            <Icon name="calendar" size={25} />
          </TouchableOpacity>
        </View>
        <View style={styles.field} marginTop="xl">
          <View marginBottom="m">
            <Text variant="formLabel">
              {translate('form.active.type.label')}
            </Text>
            <Dropdown selected={} list={activeTypes} />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  form: {},
  field: {
    flexDirection: 'column',
  },
  entryDate: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  type: {},
});
 */
