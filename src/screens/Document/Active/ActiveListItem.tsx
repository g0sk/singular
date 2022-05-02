import React, {useEffect, useState} from 'react';
import {API_URL} from '@env';
import {Text, View} from 'components';
import {Image, TouchableOpacity} from 'react-native';
import {ActiveItemFormProps} from 'types';
import Icon from 'react-native-vector-icons/Ionicons';
import dayjs from 'dayjs';
import {translate} from 'core';

export const ActiveListItem: React.FC<ActiveItemFormProps> = ({
  navigation,
  active,
}: ActiveItemFormProps) => {
  const [activeDate, setActiveDate] = useState<string>();

  const _itemHandler = () => {
    navigation.push('ActiveDetails', {
      activeId: active.id,
      recordId: active.activeRecord.id,
      title: active.reference,
    });
  };

  useEffect(() => {
    setActiveDate(dayjs(new Date(active.entryDate)).format('DD-MM-YYYY'));
  }, [active]);

  return (
    <View flexDirection="row" marginBottom="l" alignItems="center">
      <TouchableOpacity onPress={_itemHandler}>
        <View
          borderColor="primary"
          borderWidth={3}
          borderRadius={13}
          marginRight="m"
          width={360}
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
          <View flexDirection="row" alignItems="center">
            <View>
              <View marginRight="l" marginLeft="s">
                {active.createdBy.image ? (
                  <View borderWidth={2} borderRadius={20} borderColor="primary">
                    <Image
                      source={{
                        uri: API_URL + active.createdBy.image.contentUrl,
                      }}
                      style={{
                        borderRadius: 10,
                        borderWidth: active.file ? 0 : 1,
                      }}
                      height={26}
                      width={26}
                    />
                  </View>
                ) : (
                  <Icon name="person-circle-outline" size={30} />
                )}
              </View>
              <View>
                <Text>{active.createdBy.name}</Text>
              </View>
            </View>
            <View flexDirection="row">
              <View
                justifyContent="center"
                flexDirection="column"
                alignItems="center">
                {!active.file && active.description.length === 0 && (
                  <View marginBottom="s">
                    <Text variant="dataLabel">
                      {translate('active.lastUpdate')}
                    </Text>
                  </View>
                )}
                <View marginBottom="s">
                  <Text variant="listItemData">{activeDate}</Text>
                </View>
                <View flexDirection="row">
                  {active.file && (
                    <View marginRight="m">
                      <Icon name="image" size={15} />
                    </View>
                  )}
                  {active.description.length > 0 && (
                    <View>
                      <Icon name="reader" size={15} />
                    </View>
                  )}
                </View>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};
