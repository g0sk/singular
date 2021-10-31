import React from 'react';
import {Text, View} from 'components';
import {TouchableOpacity} from 'react-native';
import {TypeItemFormProps} from 'types';
import Icon from 'react-native-vector-icons/Ionicons';

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
    <View flexDirection="row" marginBottom="l" alignItems="center">
      <TouchableOpacity onPress={_itemHandler}>
        <View
          borderColor="orange"
          borderWidth={3}
          borderRadius={13}
          marginRight="m"
          width={360}
          flexDirection="row"
          paddingHorizontal="m"
          height={62}
          alignItems="center"
          justifyContent="space-between">
          <View>
            <Text variant="listItemPrimary">{type.name}</Text>
          </View>
          <View flexDirection="row">
            <View marginRight="m">
              <Text>{type.activesCount}</Text>
            </View>
            <View>
              <Icon name="pricetag" size={20} color="black" />
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};
