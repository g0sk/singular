import React, {useEffect, useState} from 'react';
import {Dropdown, SimpleTextInput as TextInput, View} from 'components';
import {UnitState, DynamicNewFieldProps, Unit} from 'types';
import {StyleSheet, ToastAndroid, TouchableOpacity} from 'react-native';
import {useTheme} from 'ui/theme';
import {useAppSelector} from 'store/configureStore';
import Icon from 'react-native-vector-icons/Ionicons';
import {useFormik} from 'formik';
import * as yup from 'yup';
import {translate} from 'core';

const AttributeSchema = yup.object().shape({
  name: yup.string().min(2).required(),
  value: yup.string().min(1).required(),
});

export const DynamicNewField: React.FC<DynamicNewFieldProps> = ({
  setNewItem,
  editDropdownValue,
}) => {
  const [unit, setUnit] = useState<Unit | null>(null);
  const {units}: UnitState = useAppSelector((state) => state.unit);
  const [message, setMessage] = useState<string>('');
  const theme = useTheme();

  const _errorHandler = () => {
    ToastAndroid.showWithGravity(
      message,
      ToastAndroid.CENTER,
      ToastAndroid.SHORT,
    );
  };

  const _handleUnitChange = (_unit: Unit) => {
    setUnit(_unit);
  };

  const _saveHandler = (formValue: {name: string; value: string}) => {
    if (unit !== null) {
      const item = {
        id: 0,
        name: formValue.name,
        value: formValue.value,
        unit: {...unit},
      };
      setNewItem(item);
    }
    setUnit(null);
    setFieldValue('name', '');
    setFieldValue('value', '');
  };

  const {
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
    errors,
    values,
    isValid,
  } = useFormik({
    validationSchema: AttributeSchema,
    initialValues: {
      name: '',
      value: '',
    },
    onSubmit: (formValues: {name: string; value: string}) =>
      _saveHandler(formValues),
  });

  const nameBorder: string = !errors.name
    ? theme.colors.primary
    : theme.colors.error;
  const valueBorder: string = !errors.value
    ? theme.colors.primary
    : theme.colors.error;

  useEffect(() => {
    if (values.name.length < 2 || values.value.length < 1) {
      setMessage(translate('form.newField.attributeForm'));
    } else if (unit === null) {
      setMessage(translate('form.newField.unitNotSelected'));
    }
  }, [values, unit]);

  return (
    <View style={styles.container}>
      <View style={styles.icon}>
        <TouchableOpacity
          onPress={() => (isValid ? handleSubmit() : _errorHandler())}>
          <View marginRight="m">
            <Icon
              name="checkmark-circle-outline"
              color={
                isValid && unit !== null
                  ? theme.colors.primary
                  : theme.colors.gray
              }
              size={25}
            />
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.field}>
        <View style={styles.label} paddingHorizontal="s" marginRight="m">
          <TextInput
            style={{
              minWidth: 90,
              maxWidth: 115,
              height: 40,
              color: 'black',
              borderBottomColor: nameBorder,
              borderBottomWidth: 1,
            }}
            placeholder={translate('form.name')}
            textAlign="left"
            value={values.name}
            onChangeText={handleChange('name')}
            onBlur={handleBlur('name')}
          />
        </View>
        <View marginRight="s" paddingHorizontal="s">
          <TextInput
            style={{
              minWidth: 40,
              maxWidth: 65,
              height: 40,
              color: 'black',
              borderBottomColor: valueBorder,
              borderBottomWidth: 1,
            }}
            placeholder={translate('form.value')}
            textAlign="left"
            value={values.value}
            keyboardType="numeric"
            onChangeText={handleChange('value')}
          />
        </View>
        <View>
          <Dropdown
            selected={unit}
            options={units}
            editValue={editDropdownValue}
            placeholder={translate('form.unit.placeholder')}
            header={translate('form.unit.header')}
            setParentValue={_handleUnitChange}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  icon: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  field: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    flexDirection: 'row',
  },
  value: {
    color: 'black',
  },
});
