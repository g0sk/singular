import React, {useEffect, useState} from 'react';
import {Text, View} from 'components';
import {TouchableOpacity} from 'react-native';
import {ActiveItemFormProps} from 'types';
import Icon from 'react-native-vector-icons/Ionicons';
import dayjs from 'dayjs';

export const ActiveListItem: React.FC<ActiveItemFormProps> = ({
  navigation,
  active,
}: ActiveItemFormProps) => {
  const [entryDate, setEntryDate] = useState<Date>();
  const [activeDate, setActiveDate] = useState<string>();

  const _itemHandler = () => {
    navigation.push('ActiveDetails', {
      activeId: active.id,
      recordId: active.activeRecord.id,
      title: active.reference,
    });
  };

  useEffect(() => {
    setEntryDate(new Date(active.entryDate));
  }, [active]);

  useEffect(() => {
    if (entryDate) {
      setActiveDate(dayjs(entryDate).format('DD-MM-YYYY'));
    }
  }, [entryDate]);

  return (
    <View flexDirection="row" marginBottom="l" alignItems="center">
      <TouchableOpacity onPress={_itemHandler}>
        <View
          borderColor="primary"
          borderWidth={3}
          borderRadius={13}
          marginRight="m"
          width={350}
          flexDirection="row"
          paddingHorizontal="m"
          height={74}
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
              <Icon name="image" size={15} />
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};
