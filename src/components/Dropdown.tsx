import React, {useLayoutEffect, useState} from 'react';
import {DropdownProps, ItemGeneric} from 'types';
import {
  TouchableOpacity,
  FlatList,
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
  editSelected,
}: DropdownProps<T>) {
  const [items, setItems] = useState<T[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const theme = useTheme();

  useLayoutEffect(() => {
    if (selected !== null) {
      const _items = options.filter((_) => _.id !== selected.id);
      setItems(_items);
    } else {
      setItems(options);
    }
  }, [selected, options]);

  const onPickerPressHandler = () => {
    if (editSelected) {
      setOpen(!open);
    } else {
      ToastAndroid.showWithGravity(
        translate('form.unit.noEdit'),
        ToastAndroid.CENTER,
        ToastAndroid.SHORT,
      );
    }
  };
  const onItemPressHandler = (item: T) => {
    setOpen(!open);
    setParentValue(item);
  };

  const Picker = () => {
    return (
      <View
        alignSelf="flex-start"
        borderRadius={12}
        borderWidth={2}
        minHeight={30}
        borderColor="primary"
        minWidth={75}
        maxWidth={130}>
        <TouchableOpacity onPress={onPickerPressHandler}>
          <View paddingHorizontal="s" paddingVertical="s" alignItems="center">
            {selected !== null ? (
              <Text variant="listItemData">{selected.name}</Text>
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
          onPress={() => onItemPressHandler(item)}
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
        <Text variant="formLabel">{header}</Text>
      </View>
    );
  };

  const ListEmptyComponent = () => {
    return (
      <View height={200} justifyContent="center" alignItems="center">
        <Text textAlign="center" fontSize={25}>
          {translate('form.field.noItems')}
        </Text>
      </View>
    );
  };

  const OptionList = () => {
    return (
      <View
        borderRadius={15}
        backgroundColor="white"
        minHeight={200}
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
    <View>
      <Picker />
      <View>
        <Modal show={open} children={<OptionList />} setVisibility={setOpen} />
      </View>
    </View>
  );
}
