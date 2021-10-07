import React, {useState} from 'react';
import {Dropdown, Text, SimpleTextInput as TextInput, View} from 'components';
import {Pressable, StyleSheet} from 'react-native';
import {useAppSelector} from 'store/configureStore';
import {DynamicFieldsProps, Unit, UnitState} from 'types';
import {useTheme} from 'ui/theme';

export const DynamicField: React.FC<DynamicFieldsProps> = ({
  field,
  setItemChange,
}) => {
  const theme = useTheme();
  const [focused, setFocused] = useState<boolean>(false);
  const {units}: UnitState = useAppSelector((state) => state.unit);

  const _handleValueChange = (value: string) => {
    const _field = {...field};
    _field.value = value;
    setItemChange(_field);
  };

  const _handleUnitChange = (unit: Unit) => {
    const _field = {...field};
    _field.unit = unit;
    setItemChange(_field);
  };
  return (
    <View style={styles.container}>
      <View style={styles.field} marginVertical="s">
        <Pressable
          delayLongPress={700}
          onPress={() => setFocused(true)}
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
            <View marginRight="m">
              <TextInput
                value={field.value}
                onChangeText={_handleValueChange}
                maxLength={8}
                focused={focused}
                setFocused={setFocused}
                textAlign="center"
              />
            </View>
            <View>
              <Dropdown
                selected={field.unit}
                options={units}
                placeholder="Select unit"
                header="Units"
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
