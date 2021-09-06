import React, {useState, useEffect} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {DynamicFormProps} from 'types';
//import {useFormik} from 'formik';
import {SimpleTextInput as TextInput, Text, View} from 'components';
import {translate} from 'core';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/Feather';
import {dateWithoutTimezone} from 'helpers/date';
import store from 'store/configureStore';
import {fetchActiveTypes} from 'store/slices/active/activeAsyncThunk';
import DropDownPicker from 'react-native-dropdown-picker';

export const Form: React.FC<DynamicFormProps> = ({
  active,
  //hasCustomAttributes,
  //setChange,
  //schema,
}) => {
  const [openDropdown, setOpenDropdown] = useState<boolean>(false);
  const [dropdownValue, setDropdownValue] = useState<number | null>(null);

  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const [entryDate, setEntryDate] = useState<string>(new Date().toString());
  const {activeTypes} = store.getState().active;

  useEffect(() => {
    if (active.entryDate) {
      setEntryDate(active.entryDate);
    }
    store.dispatch(fetchActiveTypes());
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
  const updateDate = (e: any, date: any) => {
    setShowDatePicker(!showDatePicker);
    setEntryDate(date.toString());
  };
  const formattedEntryDate = dateWithoutTimezone(entryDate);
  return (
    <View style={styles.form} marginTop="l" marginRight="m">
      {showDatePicker && (
        <DateTimePicker
          mode="date"
          display="default"
          value={new Date(entryDate)}
          onChange={updateDate}
        />
      )}
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
          </View>
          <DropDownPicker
            placeholder={translate('form.active.type.placeholder')}
            open={openDropdown}
            value={dropdownValue}
            items={activeTypes}
            setOpen={setOpenDropdown}
            setValue={setDropdownValue}
            ListEmptyComponent={() => (
              <View padding="s">
                <Text>{translate('form.active.type.empty')}</Text>
              </View>
            )}
            //searchable={true}
            //searchablePlaceholder={translate('form.active.type.search')}
          />
        </View>
      </View>
    </View>
  );
};

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
