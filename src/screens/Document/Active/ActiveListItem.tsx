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
    navigation.navigate('ActiveDetails', {
      activeId: active.id,
      recordId: active.activeRecord.id,
      title: active.reference,
    });
  };

  useEffect(() => {
    setActiveDate(dayjs(new Date(active.updatedAt)).format('DD-MM-YYYY'));
  }, [active]);

  const UserImage = () => {
    return (
      <View alignItems="center">
        <View>
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
          <Text>{active.updatedBy.name}</Text>
        </View>
      </View>
    );
  };

  return (
    <View marginBottom="l" alignItems="center">
      <TouchableOpacity onPress={_itemHandler}>
        <View
          borderColor="primary"
          borderWidth={3}
          borderRadius={13}
          width={360}
          flexDirection="row"
          paddingHorizontal="m"
          height={74}
          justifyContent="space-between"
          alignItems="center">
          <View justifyContent="center" flexDirection="column" marginRight="s">
            <View marginBottom="s">
              <Text variant="listItemPrimary">{active.reference}</Text>
            </View>
            <View flexDirection="row">
              <View>
                <Text variant="orangeText">{active.activeType.name}</Text>
              </View>
            </View>
          </View>
          <View flexDirection="row" alignItems="center">
            <View flexDirection="row" marginRight="l">
              <View
                justifyContent="center"
                flexDirection="column"
                alignItems="center">
                <View marginBottom="s">
                  <Text variant="dataLabel">
                    {translate('active.lastUpdate')}
                  </Text>
                </View>
                <View marginBottom="s">
                  <Text variant="listItemData">{activeDate}</Text>
                </View>
              </View>
            </View>
            {active.file !== null ? (
              <View>
                <View>
                  <View>
                    <Image
                      source={{
                        uri: API_URL + active.file.contentUrl,
                      }}
                      style={{
                        borderRadius: 30,
                        borderWidth: active.file ? 0 : 1,
                      }}
                      height={50}
                      width={50}
                    />
                  </View>
                </View>
              </View>
            ) : (
              <UserImage />
            )}
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};
