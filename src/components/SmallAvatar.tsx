import {API_URL} from '@env';
import {Text, View} from 'components';
import React from 'react';
import {Image, TouchableOpacity} from 'react-native';
import {useAppSelector} from 'store/configureStore';
import {UserState} from 'types';
import {DrawerContentComponentProps} from '@react-navigation/drawer';

export const SmallAvatar: React.FC<DrawerContentComponentProps> = ({
  navigation,
}) => {
  const {user}: UserState = useAppSelector((state) => state.user);
  return (
    <View flexDirection="column">
      <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
        <View marginBottom="m">
          <Image
            style={{
              height: 80,
              width: 80,
              borderRadius: 80,
            }}
            source={
              user && user.image
                ? {uri: API_URL + user.image.contentUrl}
                : require('../../assets/images/user.png')
            }
          />
        </View>
        <View marginBottom="s">
          <Text variant="drawerName">
            {user ? user.name + ' ' + user.lastName : 'Name'}
          </Text>
        </View>
        <View>
          <Text variant="drawerEmail">{user ? user.username : 'E-mail'}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};
