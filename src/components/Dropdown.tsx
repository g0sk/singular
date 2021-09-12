import React, {useEffect, useState} from 'react';
import {DropdownProps} from 'types';
import {
  TouchableOpacity,
  TouchableHighlight,
  FlatList,
  StyleSheet,
} from 'react-native';
import {View, Text, Modal} from 'components';
import {useTheme} from 'ui/Theme';
export function Dropdown<T>({
  selected,
  options,
  placeholder,
  emptyMessage,
  header,
}: DropdownProps<T>) {
  const [value, setValue] = useState<T>({} as T);
  const [items, setItems] = useState<T[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const theme = useTheme();

  /* const filterItems = useCallback(() => {
    setItems((state) => {
      return state.filter((_item) => {
        return _item.id !== value?.id;
      });
    });
  }, [value]); */

  //component mount
  useEffect(() => {
    /* let initialItems: T[] = [];
    if (selected !== null) {
      if (options.length > 1) {
        initialItems = options.filter((option: T) => option.id !== selected.id);
      }
    } else {
      initialItems = [...options];
    }
    */
    selected !== null ? setValue(selected) : null;
    setItems(options);
    console.log('selected', selected);
    console.log('options', items);
  }, [selected, options, items]);

  /* useEffect(() => {
    setItems((state) => {
      const filteredList = state.filter((item) => item.id !== value?.id);
      return filteredList;
    });
  }, [value]); */

  const _pickerOnPressHandler = () => {
    setOpen(!open);
  };
  const _itemOnPressHandler = (item: T) => {
    setValue(item);
  };

  const Picker = () => {
    return (
      <TouchableOpacity onPress={_pickerOnPressHandler}>
        <View style={styles.picker} margin="m">
          {value !== null ? (
            <Text>Value.name</Text>
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
          underlayColor={theme.colors.primary}>
          <Text>item.name</Text>
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
      <View style={styles.emptyComponent}>
        <Text>{emptyMessage}</Text>
      </View>
    );
  };

  const OptionList = () => {
    return (
      <View style={styles.options} margin="m">
        <FlatList
          data={options}
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
        <Modal show={open} children={<OptionList />} visibleSetter={setOpen} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  modal: {},
  picker: {
    borderRadius: 20,
    borderColor: 'purple',
    borderWidth: 2,
    minHeight: 30,
    width: 250,
  },
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
  },
  header: {
    color: 'black',
  },
});
