import {API_URL} from '@env';
import {Text, View} from 'components';
import {translate} from 'core';
import dayjs from 'dayjs';
import React from 'react';
import {Image, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {RecordListItemProps} from 'types';
import {useTheme} from 'ui/theme';

export const RecordListItem: React.FC<RecordListItemProps> = ({
  recordActive,
  navigation,
}) => {
  const {colors} = useTheme();
  const goToDetails = () => {
    navigation.navigate('RecordDetails', {
      recordActive,
      title: recordActive.reference,
    });
  };

  const UserInfo = () => {
    return (
      <View flexDirection="row" alignItems="center">
        <View marginRight="s">
          {recordActive.user.image ? (
            <View borderWidth={2} borderRadius={20} borderColor="primary">
              <Image
                source={{
                  uri: API_URL + recordActive.user.image.contentUrl,
                }}
                style={{
                  borderRadius: 10,
                  borderWidth: recordActive.user ? 0 : 1,
                }}
                height={40}
                width={40}
              />
            </View>
          ) : (
            <Icon name="person-circle-outline" size={30} />
          )}
        </View>
        <View>
          <View>
            <Text>
              {recordActive.user.name + ' ' + recordActive.user.lastName}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  const AdditionalInfo = () => {
    return (
      <View flexDirection="row" alignItems="center">
        {recordActive.description.length > 0 && (
          <View marginRight="m">
            <Icon name="document-text" size={20} color={colors.primary} />
          </View>
        )}
        {recordActive.file && (
          <View>
            <Icon name="image" size={20} color={colors.primary} />
          </View>
        )}
      </View>
    );
  };

  return (
    <View
      flexDirection="column"
      marginHorizontal="m"
      marginBottom="m"
      alignItems="center">
      <TouchableOpacity onPress={goToDetails}>
        <View
          borderColor="primary"
          borderWidth={2}
          borderRadius={13}
          width={360}
          flexDirection="row"
          paddingHorizontal="m"
          paddingVertical="s"
          height={100}>
          <View flexDirection="column" width="100%">
            <View flexDirection="row" alignItems="center" marginBottom="s">
              <View marginRight="ss">
                <Text variant="updated">{translate('active.updatedOn')}</Text>
              </View>
              <View flexDirection="row">
                <View>
                  <View>
                    <Text variant="updated">
                      {dayjs(new Date(recordActive.updatedAt.date)).format(
                        'DD-MM-YYYY',
                      )}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            <View
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center">
              <View>
                <UserInfo />
              </View>
              <View>
                <AdditionalInfo />
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};
