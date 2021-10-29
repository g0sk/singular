import React, {useState} from 'react';
import {FlatList, Keyboard, Pressable} from 'react-native';
import {Modal, Text, View} from './';
import Icon from 'react-native-vector-icons/Ionicons';
import {SearchFilter} from 'types';
import {translate} from 'core';
import {useTheme} from 'ui/theme';

export const FilterModal: React.FC<{
  setFilter: (filter: SearchFilter) => void;
  filters: SearchFilter[];
}> = ({setFilter, filters}) => {
  const [show, setShow] = useState<boolean>(false);
  const theme = useTheme();

  const onItemPress = (item: SearchFilter) => {
    setShow(!show);
    setFilter(item);
  };

  const FilterPicker = () => {
    return (
      <Pressable
        onPressIn={() => Keyboard.dismiss()}
        onPress={() => setShow(!show)}
        style={({pressed}) => [{opacity: pressed ? 0.2 : 1}]}>
        <View>
          <Icon name="filter" size={25} />
        </View>
      </Pressable>
    );
  };

  const ListHeaderComponent = () => {
    return (
      <View margin="m">
        <Text variant="formLabel">{translate('filter.label')}</Text>
      </View>
    );
  };

  const renderItem = (item: SearchFilter) => {
    return (
      <View margin="m" justifyContent="flex-start" marginVertical="m">
        <Pressable
          onPress={() => onItemPress(item)}
          style={({pressed}) => [
            {
              backgroundColor: pressed ? theme.colors.primary : 'white',
              opacity: pressed ? 0.4 : 1,
              borderRadius: pressed ? 10 : 0,
            },
          ]}>
          <View flexDirection="row" alignItems="center">
            <View
              height={16}
              width={16}
              borderRadius={8}
              backgroundColor={item.color}
            />
            <View height={30} justifyContent="center" paddingHorizontal="s">
              <Text textTransform="capitalize">{item.name}</Text>
            </View>
          </View>
        </Pressable>
      </View>
    );
  };

  const FilterList = () => {
    return (
      <View marginBottom="m" marginHorizontal="m">
        <FlatList
          data={filters}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({item}) => renderItem(item)}
        />
      </View>
    );
  };

  const DropdownModal = () => {
    return (
      <View backgroundColor="white" borderRadius={10}>
        <ListHeaderComponent />
        <FilterList />
      </View>
    );
  };

  const FilterDropdown = () => {
    return (
      <Modal children={<DropdownModal />} show={show} setVisibility={setShow} />
    );
  };

  return (
    <View>
      <FilterPicker />
      <FilterDropdown />
    </View>
  );
};
