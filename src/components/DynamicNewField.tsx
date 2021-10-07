import React, {useState} from 'react';
import {Dropdown, SimpleTextInput as TextInput, View} from 'components';
import {UnitState, DynamicNewFieldProps, Unit} from 'types';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {useTheme} from 'ui/theme';
import {useAppSelector} from 'store/configureStore';
import Icon from 'react-native-vector-icons/Ionicons';

export const DynamicNewField: React.FC<DynamicNewFieldProps> = ({
  setNewItem,
}) => {
  const [name, setName] = useState<string>('');
  const [value, setValue] = useState<string>('');
  const [unit, setUnit] = useState<Unit | null>(null);
  const {units}: UnitState = useAppSelector((state) => state.unit);
  const theme = useTheme();

  const _handleUnitChange = (_unit: Unit) => {
    setUnit(_unit);
  };

  const _saveHandler = () => {
    if (name.length > 2 && value.length > 0 && unit) {
      setNewItem({name, value, unit});
    }
    setName('');
    setValue('');
    setUnit(null);
  };

  return (
    <View style={styles.container}>
      <View style={styles.icon}>
        <TouchableOpacity onPress={_saveHandler}>
          <View marginRight="m">
            <Icon
              name="checkmark-circle-outline"
              color={theme.colors.primary}
              size={25}
            />
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.field}>
        <View
          style={styles.label}
          borderColor="primary"
          height={40}
          minWidth={90}
          paddingHorizontal="s"
          marginRight="m">
          <TextInput
            placeholder="Name"
            textAlign="center"
            value={name}
            onChangeText={(text) => setName(text)}
          />
        </View>
        <View
          style={styles.value}
          height={40}
          minWidth={20}
          marginRight="s"
          paddingHorizontal="s"
          borderColor="primary">
          <TextInput
            placeholder="Value"
            textAlign="center"
            value={value}
            onChangeText={(text) => setValue(text)}
          />
        </View>
        <View>
          <Dropdown
            selected={unit}
            options={units}
            placeholder="Select Unit"
            header="Units"
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
    alignItems: 'center',
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
    borderRadius: 10,
    borderBottomWidth: 1,
  },
  value: {
    borderRadius: 10,
    borderBottomWidth: 1,
    color: 'black',
  },
});
