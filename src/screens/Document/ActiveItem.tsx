import React, {useEffect, useState} from 'react';
import {Text, View} from 'components';
import {TouchableOpacity} from 'react-native';
import {ActiveItemFormProps} from 'types';
import Icon from 'react-native-vector-icons/Ionicons';

export const ActiveItem: React.FC<ActiveItemFormProps> = ({
  navigation,
  active,
}: ActiveItemFormProps) => {
  const [entryDate, setEntryDate] = useState<Date>(new Date());
  const [activeDate, setActiveDate] = useState<string>();

  const _itemHandler = () => {
    navigation.push('Active', {
      active: active,
      title: active.reference,
    });
  };

  useEffect(() => {
    setEntryDate(new Date(active.entryDate));
  }, [active]);

  useEffect(() => {
    setActiveDate(entryDate?.toDateString());
  }, [entryDate]);

  return (
    <View
      marginHorizontal="s"
      flexDirection="row"
      marginBottom="l"
      alignItems="center">
      <TouchableOpacity onPress={_itemHandler}>
        <View
          borderColor="primary"
          borderWidth={3}
          borderRadius={13}
          marginRight="m"
          width={310}
          flexDirection="row"
          paddingHorizontal="m"
          height={70}
          justifyContent="space-between"
          alignContent="center"
          alignItems="center">
          <View justifyContent="center" flexDirection="column">
            <View marginBottom="s">
              <Text variant="listItemPrimary">{active.reference}</Text>
            </View>
            <View>
              <Text variant="listItemData">{active.activeType.name}</Text>
            </View>
          </View>
          <View
            justifyContent="center"
            flexDirection="column"
            alignItems="center">
            <View marginBottom="s">
              <Text variant="listItemData">{activeDate}</Text>
            </View>
            <View>
              <Icon name="document" size={15} />
            </View>
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => null}>
        <View borderRadius={8} borderWidth={0} borderColor="dark">
          <Icon name="stats-chart" size={28} />
        </View>
      </TouchableOpacity>
    </View>
  );
};
