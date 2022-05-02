import React, {useEffect, useState} from 'react';
import {Image, TouchableOpacity} from 'react-native';
import {API_URL} from '@env';
import {View, Text} from './';
import {User} from 'types';
import {Modal} from './Modal';
import {translate} from 'core';

type UserModalProps = {
  user: User | undefined;
  created: boolean;
};

export const UserModal: React.FC<UserModalProps> = ({user, created}) => {
  const [show, setShow] = useState<boolean>(false);
  const [uri, setUri] = useState<string>('');
  useEffect(() => {
    if (user !== undefined && user.image !== null) {
      setUri(API_URL + user.image.contentUrl);
    }
  }, [user]);

  const FormField = () => {
    return (
      <View alignSelf="flex-start">
        <TouchableOpacity onPress={() => setShow(!show)}>
          <View marginBottom="m">
            <View marginBottom="m">
              <Text variant="formLabel">
                {translate(
                  created
                    ? 'action.general.createdBy'
                    : 'action.general.updatedBy',
                )}
              </Text>
            </View>

            {user !== undefined ? (
              <View flexDirection="row" alignItems="center">
                <View
                  borderRadius={70}
                  marginRight="m"
                  borderWidth={uri.length > 0 ? 0 : 1}>
                  <Image
                    source={
                      uri.length > 0
                        ? {uri: uri}
                        : require('../../assets/images/user.png')
                    }
                    style={{
                      zIndex: 10,
                      borderRadius: 70,
                    }}
                    height={60}
                    width={60}
                  />
                </View>
                <View>
                  <Text>{user.name + ' ' + user.lastName}</Text>
                </View>
              </View>
            ) : null}
          </View>
        </TouchableOpacity>
      </View>
    );
  };
  const UserInfo = () => {
    return (
      <View backgroundColor="white" height={270} borderRadius={10}>
        <View margin="m">
          <Text variant="formLabel">{translate('form.active.user.title')}</Text>
        </View>
        <View flexDirection="row" margin="m" alignItems="center">
          <View
            borderRadius={70}
            marginRight="l"
            borderWidth={uri.length > 0 ? 0 : 1}>
            <Image
              style={{zIndex: 10, width: 140, height: 140, borderRadius: 90}}
              source={
                uri.length > 0
                  ? {uri: uri}
                  : require('../../assets/images/user.png')
              }
            />
          </View>
          {user !== undefined ? (
            <View>
              <View marginBottom="m">
                <View marginBottom="s">
                  <Text variant="dataLabel">
                    {translate('form.active.user.name')}
                  </Text>
                </View>
                <View>
                  <Text>
                    {user !== null ? user.name + ' ' + user.lastName : ''}
                  </Text>
                </View>
              </View>
              <View>
                <View marginBottom="m">
                  <Text variant="dataLabel">
                    {translate('form.active.user.email')}
                  </Text>
                </View>
                <View>
                  <Text>{user !== null ? user.username : ''}</Text>
                </View>
              </View>
            </View>
          ) : null}
        </View>
      </View>
    );
  };

  return (
    <View>
      <FormField />
      <Modal children={<UserInfo />} show={show} setVisibility={setShow} />
    </View>
  );
};
