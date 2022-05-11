import React, {useEffect, useRef, useState} from 'react';
import {Dropdown, Text, View} from 'components';
import {TextInput, Pressable} from 'react-native';
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

  const onUnitChange = (unit: Unit) => {
    const _field = {...field};
    _field.unit = {...unit};
    setItemChange(_field, listIndex);
  };

  const onValueChange = () => {
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
    <View flexDirection="row" alignItems="center">
      <View>
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
          <View flexDirection="row" alignItems="center" marginVertical="s">
            <View
              flexDirection="row"
              borderRadius={10}
              borderWidth={1}
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
                    padding: 0,
                    margin: 0,
                  }}
                  ref={_ref}
                  value={value}
                  onChangeText={setValue}
                  maxLength={8}
                  placeholder={translate('form.value')}
                  textAlign="center"
                  keyboardType="numeric"
                  onBlur={() => onValueChange()}
                  selectionColor={theme.colors.primary}
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
                editSelected={editDropdownValue}
                options={units}
                placeholder={translate('form.unit.placeholder')}
                header={translate('form.unit.header')}
                setParentValue={onUnitChange}
              />
            </View>
          </View>
        </Pressable>
      </View>
    </View>
  );
};
