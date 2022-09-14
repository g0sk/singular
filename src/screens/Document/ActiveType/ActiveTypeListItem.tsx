import React from 'react';
import {Text, View} from 'components';
import {TouchableOpacity} from 'react-native';
import {TypeItemFormProps} from 'types';
import Icon from 'react-native-vector-icons/Ionicons';
import {translate} from 'core';

export const ActiveTypeListItem: React.FC<TypeItemFormProps> = ({
  navigation,
  type,
}) => {
  const _itemHandler = () => {
    navigation.navigate('ActiveTypeDetails', {
      typeId: type.id,
      title: type.name,
    });
  };

  return (
    <View marginBottom="l" alignItems="center">
      <TouchableOpacity onPress={_itemHandler}>
        <View
          borderColor="orange"
          borderWidth={3}
          borderRadius={13}
          paddingHorizontal="m"
          width={360}
          height={74}
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between">
          <View flexDirection="column" justifyContent="space-between">
            <View marginBottom="s">
              <Text variant="listItemPrimary">{type.name}</Text>
            </View>
            <View alignItems="center" flexDirection="row">
              <View marginRight="ss">
                <Text>
                  {type.basicAttributes.length + type.customAttributes.length}
                </Text>
              </View>
              <View>
                <Text>{translate('activeType.attributes')}</Text>
              </View>
            </View>
          </View>
          <View flexDirection="column" justifyContent="center">
            <View flexDirection="row" alignItems="center">
              <View marginRight="s">
                <Icon name="pricetag" size={20} color="black" />
              </View>
              <View marginRight="s">
                <Text>{type.activesCount}</Text>
              </View>
              <View>
                <Text>{translate('active.actives')}</Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};
