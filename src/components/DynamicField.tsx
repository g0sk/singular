import React, {useEffect, useRef, useState} from 'react';
import {Dropdown, Text, View} from 'components';
import {TextInput, Pressable, StyleSheet} from 'react-native';
import {useAppSelector} from 'store/configureStore';
import {DynamicFieldsProps, Unit, UnitState} from 'types';
import {useTheme} from 'ui/theme';
import {translate} from 'core';

export const DynamicField: React.FC<DynamicFieldsProps> = ({
  field,
  setItemChange,
  listIndex,
  editDropdownValue,
  editValue,
}) => {
  const theme = useTheme();
  const [value, setValue] = useState<string>('');
  const [error, setError] = useState<boolean>(false);
  const {units}: UnitState = useAppSelector((state) => state.unit);
  const _ref = useRef<TextInput>(null);

  const _handleUnitChange = (unit: Unit) => {
    const _field = {...field};
    _field.unit = {...unit};
    setItemChange(_field, listIndex);
  };

  const _setValueChange = () => {
    if (!error) {
      const _field = {...field};
      _field.value = value;
      if (value !== field.value) {
        setItemChange(_field, listIndex);
      }
    }
  };

  useEffect(() => {
    if (value.length > 0) {
      setError(false);
    } else {
      setError(true);
    }
  }, [value]);

  useEffect(() => {
    setValue(field.value);
  }, [field]);

  return (
    <View style={styles.container}>
      <View style={styles.field} marginVertical="s">
        <Pressable
          delayLongPress={700}
          onPress={() => _ref.current?.focus()}
          style={({pressed}) => [
            {
              backgroundColor: pressed ? theme.colors.primary : 'white',
              opacity: pressed ? 0.6 : 1,
              borderRadius: pressed ? 10 : 0,
            },
          ]}>
          <View style={styles.container}>
            <View
              style={styles.label}
              borderColor="default"
              padding="s"
              marginRight="m">
              <Text>{field.name}</Text>
            </View>
            {editValue ? (
              <View marginRight="m">
                <TextInput
                  style={{
                    borderBottomColor: !error
                      ? theme.colors.primary
                      : theme.colors.error,
                    borderBottomWidth: 1,
                  }}
                  ref={_ref}
                  value={value}
                  onChangeText={setValue}
                  maxLength={8}
                  placeholder={translate('form.value')}
                  textAlign="center"
                  keyboardType="numeric"
                  onBlur={_setValueChange}
                />
              </View>
            ) : (
              <View marginRight="m">
                <Text>{value}</Text>
              </View>
            )}
            <View>
              <Dropdown
                selected={field.unit}
                editValue={editDropdownValue}
                options={units}
                placeholder={translate('form.unit.placeholder')}
                header={translate('form.unit.header')}
                setParentValue={_handleUnitChange}
              />
            </View>
          </View>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  field: {},
  label: {
    flexDirection: 'row',
    borderRadius: 10,
    borderWidth: 1,
  },
  value: {
    color: 'black',
  },
});
