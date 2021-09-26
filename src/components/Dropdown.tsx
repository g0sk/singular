import React, {useEffect, useState} from 'react';
import {DropdownProps, ItemGeneric} from 'types';
import {TouchableOpacity, FlatList, StyleSheet} from 'react-native';
import {View, Text, Modal} from 'components';

export function Dropdown<T extends ItemGeneric>({
  selected,
  options,
  placeholder,
  emptyMessage,
  header,
}: DropdownProps<T>) {
  const [value, setValue] = useState<T | null>(null);
  const [items, setItems] = useState<T[]>();
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    if (selected !== null) {
      setValue(selected);
    }
    console.log(options);
    setItems(options);
  }, [selected, options]);

  useEffect(() => {
    let _items: T[] = [];
    if (value !== null) {
      _items = options.filter((option) => option.id !== value?.id);
    } else {
      _items = [...options];
    }
    setItems(_items);
  }, [options, value]);

  const _pickerOnPressHandler = () => {
    setOpen(!open);
  };
  const _itemOnPressHandler = (item: T) => {
    setValue(item);
    setOpen(!open);
  };

  const Picker = () => {
    return (
      <View alignSelf="flex-start" style={styles.picker} borderColor="primary">
        <TouchableOpacity onPress={_pickerOnPressHandler}>
          <View paddingHorizontal="m" paddingVertical="s">
            {value !== null ? (
              <Text variant="listItemData">{value.name}</Text>
            ) : (
              <Text variant="listItemData">{placeholder}</Text>
            )}
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  const renderItem = (item: T) => {
    return (
      <View margin="m" justifyContent="flex-start">
        <TouchableOpacity onPress={() => _itemOnPressHandler(item)}>
          <Text>{item.name}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const ListHeaderComponent = () => {
    return (
      <View margin="m">
        <Text variant="formLabel" style={styles.header}>
          {header}
        </Text>
      </View>
    );
  };

  const ListEmptyComponent = () => {
    return (
      <View style={styles.emptyComponent}>
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
