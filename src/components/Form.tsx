import React, {useState, useEffect} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {DynamicFormProps} from 'types';
//import {useFormik} from 'formik';
import {SimpleTextInput as TextInput, Text, View} from 'components';
import {translate} from 'core';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/Feather';
import {dateWithoutTimezone} from 'helpers/date';

export const Form: React.FC<DynamicFormProps> = ({
  active,
  //hasCustomAttributes,
  //setChange,
  //schema,
}) => {
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const [entryDate, setEntryDate] = useState<string>(new Date().toString());
  /*
  const updateActive = (activeValues) => {
    null;
  };
 */
  useEffect(() => {
    if (active.entryDate) {
      setEntryDate(active.entryDate);
    }
  }, [active.entryDate]);

  /* const {
    handleChange,
    handleBlur,
    handleSubmit,
    errors,
    touched,
    values,
    setFieldValue,
    isValid,
  } = useFormik({
    validationSchema: schema,
    initialValues: active,
    onSubmit: (activeValues) => updateActive(activeValues),
  }); */
  const pepega = (e: any, date: any) => {
    setShowDatePicker(!showDatePicker);
    console.log('entry: ', active.entryDate);
    console.log('\n' + 'pepe: ' + date);
  };
  const formattedEntryDate = dateWithoutTimezone(entryDate);
  return (
    <View style={styles.form} marginTop="l" marginRight="m">
      {showDatePicker && (
        <DateTimePicker
          mode="date"
          display="default"
          value={new Date(entryDate)}
          onChange={pepega}
        />
      )}
      <View style={styles.entryDate}>
        <Text marginVertical="s" variant="formLabel">
          {translate('form.active.entryDate.label')}
        </Text>
        <View style={styles.entryDateField}>
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
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  form: {},
  entryDate: {
    flexDirection: 'column',
  },
  entryDateField: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
