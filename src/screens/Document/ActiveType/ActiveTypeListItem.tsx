import React from 'react';
import {Text, View} from 'components';
import {TouchableOpacity} from 'react-native';
//import Icon from 'react-native-vector-icons/Ionicons';
import {TypeItemFormProps} from 'types';

export const ActiveTypeListItem: React.FC<TypeItemFormProps> = ({
  navigation,
  type,
}) => {
  const _itemHandler = () => {
    navigation.push('ActiveTypeDetails', {
      typeId: type.id,
      title: type.name,
    });
  };

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
          width={360}
          flexDirection="row"
          paddingHorizontal="m"
          height={50}
          justifyContent="space-between">
          <View alignContent="center" justifyContent="center">
            <Text variant="listItemPrimary">{type.name}</Text>
          </View>
          <View justifyContent="center">
            <Text variant="listItemData">{}</Text>
          </View>
        </View>
      </TouchableOpacity>
      {/* <TouchableOpacity onPress={() => null}>
        <View borderRadius={8} borderWidth={0} borderColor="dark">
          <Icon name="stats-chart" size={28} />
        </View>
      </TouchableOpacity> */}
    </View>
  );
};
