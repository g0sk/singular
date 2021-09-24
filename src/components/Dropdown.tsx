import React, {useEffect, useState} from 'react';
import {DropdownProps, ItemGeneric} from 'types';
import {
  TouchableOpacity,
  TouchableHighlight,
  FlatList,
  StyleSheet,
} from 'react-native';
import {View, Text, Modal} from 'components';
import {useTheme} from 'ui/theme';

export function Dropdown<T extends ItemGeneric>({
  selected,
  options,
  placeholder,
  emptyMessage,
  header,
}: DropdownProps<T>) {
  const [value, setValue] = useState<T>();

  const [items, setItems] = useState<T[]>();
  const [open, setOpen] = useState<boolean>(false);
  const theme = useTheme();

  useEffect(() => {
    if (selected) {
      setValue(selected);
    }
    setItems(options);
  }, [selected, options]);

  useEffect(() => {
    let _items: T[] = [];
    if (value) {
      _items = options.filter((option) => option.id !== value?.id);
    }
    setItems(_items);
  }, [options, value]);

  const _pickerOnPressHandler = () => {
    setOpen(!open);
  };
  const _itemOnPressHandler = (item: T) => {
    setValue(item);
  };

  const Picker = () => {
    return (
      <TouchableOpacity onPress={_pickerOnPressHandler}>
        <View
          alignSelf="flex-start"
          style={styles.picker}
          borderColor="primary"
          paddingHorizontal="m"
          paddingVertical="s">
          {value !== null ? (
            <Text>{value?.name}</Text>
          ) : (
            <Text>{placeholder}</Text>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  const renderItem = (item: T) => {
    return (
      <View margin="m" borderBottomColor="gray" borderBottomWidth={0.5}>
        <TouchableHighlight
          onPress={() => _itemOnPressHandler(item)}
          underlayColor={theme.colors.gray}
          activeOpacity={0.9}>
          <Text>{item.name}</Text>
        </TouchableHighlight>
      </View>
    );
  };

  const ListHeaderComponent = () => {
    return (
      <View margin="m">
        <Text style={styles.header}>{header}</Text>
      </View>
    );
  };

  const ListEmptyComponent = () => {
    return (
      <View style={styles.emptyComponent} margin="m">
        <Text>{emptyMessage}</Text>
      </View>
    );
  };

  const OptionList = () => {
    return (
      <View style={styles.options} margin="m">
        <FlatList
          data={items}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => renderItem(item)}
          scrollEnabled={true}
          ListHeaderComponent={<ListHeaderComponent />}
          ListEmptyComponent={<ListEmptyComponent />}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Picker />
      <View style={styles.modal}>
        <Modal show={open} children={<OptionList />} setVisibility={setOpen} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  modal: {},
  picker: {
    borderRadius: 12,
    borderWidth: 2,
    minHeight: 30,
  },
  entryDate: {},
  options: {
    borderRadius: 15,
    backgroundColor: 'white',
    minHeight: 200,
  },
  item: {
    borderBottomColor: '#593ac1',
    borderBottomWidth: 1,
    textTransform: 'uppercase',
  },
  emptyComponent: {
    height: 200,
    textAlign: 'center',
    fontSize: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    color: 'black',
  },
});
