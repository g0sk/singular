import React, {useEffect, useState} from 'react';
import {Image, TouchableOpacity} from 'react-native';
import {API_URL} from '@env';
import {View, Text} from './';
import {User} from 'types';
import {Modal} from './Modal';
import {translate} from 'core';

type UserModalProps = {
  user: User | undefined;
};

export const UserModal: React.FC<UserModalProps> = ({user}) => {
  const [show, setShow] = useState<boolean>(false);
  const [uri, setUri] = useState<string>('tuPadre');
  useEffect(() => {
    if (user !== undefined && user.image !== null) {
      setUri(API_URL + user.image.contentUrl);
    }
  }, [user]);
  const FormField = () => {
    return (
      <TouchableOpacity onPress={() => setShow(!show)}>
        <View marginVertical="m">
          <View marginBottom="m">
            <Text variant="formLabel">
              {translate('action.general.createdBy')}
            </Text>
          </View>

          {user !== undefined ? (
            <View flexDirection="row" alignItems="center">
              <View borderRadius={70} marginRight="m">
                <Image
                  source={{uri: uri}}
                  style={{zIndex: 10, borderRadius: 70}}
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
    );
  };
  const UserInfo = () => {
    return (
      <View backgroundColor="white" height={270} borderRadius={10}>
        <View margin="m">
          <Text variant="formLabel">{translate('form.active.user.title')}</Text>
        </View>
        <View flexDirection="row" margin="m" alignItems="center">
          <View borderRadius={70} marginRight="l">
            <Image
              style={{zIndex: 10, width: 140, height: 140, borderRadius: 90}}
              source={{uri: uri}}
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
