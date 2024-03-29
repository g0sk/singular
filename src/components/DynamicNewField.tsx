import React, {useRef, useState} from 'react';
import {Dropdown, SimpleTextInput as TextInput, View} from 'components';
import {UnitState, DynamicNewFieldProps, Unit} from 'types';
import {
  ToastAndroid,
  TextInput as RNTextInput,
  TouchableOpacity,
} from 'react-native';
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
}) => {
  const [unit, setUnit] = useState<Unit | null>(null);
  const {units}: UnitState = useAppSelector((state) => state.unit);
  const theme = useTheme();
  const valueRef = useRef<RNTextInput>(null);

  const handleError = () => {
    let message = translate('form.newField.unitNotSelected');
    if (errors !== undefined) {
      if (values.name.length < 2) {
        message = translate('form.newField.nameMin');
      } else if (values.value.length < 1) {
        message = translate('form.newField.valueMin');
      }
    }
    ToastAndroid.showWithGravity(
      message,
      ToastAndroid.CENTER,
      ToastAndroid.SHORT,
    );
  };

  const onUnitChange = (_unit: Unit) => {
    setUnit(_unit);
  };

  const resetState = () => {
    setUnit(null);
    setFieldValue('name', '');
    setFieldValue('value', '');
  };

  const onSave = (formValue: {name: string; value: string}) => {
    if (unit !== null) {
      const item = {
        id: 0,
        name: formValue.name,
        value: formValue.value,
        unit: {...unit},
      };
      resetState();
      setNewItem(item);
    }
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
    onSubmit: (formValues: {name: string; value: string}) => onSave(formValues),
  });

  const nameBorder: string = !errors.name
    ? theme.colors.primary
    : theme.colors.error;
  const valueBorder: string = !errors.value
    ? theme.colors.primary
    : theme.colors.error;

  return (
    <View flexDirection="row">
      <View flexDirection="row" alignItems="center">
        <TouchableOpacity
          onPress={() =>
            !isValid || unit === null ? handleError() : handleSubmit()
          }>
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
      <View flexDirection="row" alignItems="center">
        <View flexDirection="row" paddingHorizontal="s" marginRight="m">
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
            returnKeyLabel="next"
            onSubmitEditing={() => valueRef.current?.focus()}
          />
        </View>
        <View marginRight="s" paddingHorizontal="s">
          <TextInput
            ref={valueRef}
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
            editSelected={true}
            placeholder={translate('form.unit.placeholder')}
            header={translate('form.unit.header')}
            setParentValue={onUnitChange}
          />
        </View>
      </View>
    </View>
  );
};
