import React, {useEffect, useLayoutEffect, useState} from 'react';
import {DropdownProps, ItemGeneric} from 'types';
import {
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Pressable,
  ToastAndroid,
} from 'react-native';
import {View, Text, Modal} from 'components';
import {useTheme} from 'ui/theme';
import {translate} from 'core';

export function Dropdown<T extends ItemGeneric>({
  selected,
  options,
  placeholder,
  header,
  setParentValue,
  edit,
}: DropdownProps<T>) {
  const [value, setValue] = useState<T | null>(null);
  const [items, setItems] = useState<T[]>();
  const [open, setOpen] = useState<boolean>(false);
  const theme = useTheme();

  useLayoutEffect(() => {
    selected !== null ? setValue(selected) : setValue(null);
    setItems(options);
  }, [selected, options, placeholder]);

  useEffect(() => {
    if (selected !== null) {
      setValue(selected);
    }
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
    if (edit) {
      setOpen(!open);
    } else {
      ToastAndroid.showWithGravity(
        translate('form.unit.noEdit'),
        ToastAndroid.CENTER,
        ToastAndroid.SHORT,
      );
    }
  };
  const _itemOnPressHandler = (item: T) => {
    setOpen(!open);
    setValue(item);
    setParentValue(item);
  };

  const Picker = () => {
    return (
      <View
        alignSelf="flex-start"
        style={styles.picker}
        borderColor="primary"
        minWidth={75}
        maxWidth={130}>
        <TouchableOpacity onPress={_pickerOnPressHandler}>
          <View paddingHorizontal="s" paddingVertical="s" alignItems="center">
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
      <View margin="m" justifyContent="flex-start" marginVertical="m">
        <Pressable
          onPress={() => _itemOnPressHandler(item)}
          style={({pressed}) => [
            {
              backgroundColor: pressed ? theme.colors.primary : 'white',
              opacity: pressed ? 0.4 : 1,
              borderRadius: pressed ? 10 : 0,
            },
          ]}>
          <View height={30} justifyContent="center" paddingHorizontal="s">
            <Text>{item.name}</Text>
          </View>
        </Pressable>
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
        <Text>{translate('form.field.noItems')}</Text>
      </View>
    );
  };

  const OptionList = () => {
    return (
      <View
        style={styles.options}
        margin="m"
        paddingHorizontal="m"
        paddingBottom="l"
        maxHeight={350}>
        <ListHeaderComponent />
        <FlatList
          data={items}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => renderItem(item)}
          scrollEnabled={true}
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
