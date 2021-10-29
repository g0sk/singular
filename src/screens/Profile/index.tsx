import React, {useLayoutEffect, useState} from 'react';
import {VERSION} from '@env';
import {Alert, StyleSheet, ToastAndroid} from 'react-native';
import {Button, SimpleHeader, View, Text, Avatar} from 'components';
import {useAppDispatch, useAppSelector} from 'store/configureStore';
import {useAuth, translate} from 'core';
import {File, UserState} from 'types';
import Icon from 'react-native-vector-icons/Feather';
import {useTheme} from 'ui/theme';
import {updateUser} from 'store/slices/user/userAsyncThunk';

export const Profile: React.FC = () => {
  const theme = useTheme();
  const [file, setFile] = useState<File | null>(null);
  const dispatch = useAppDispatch();
  const {signOut} = useAuth();
  const {user, error, loading}: UserState = useAppSelector(
    (state) => state.user,
  );

  useLayoutEffect(() => {
    if (user !== null) {
      setFile(user.image);
    }
  }, [user]);
  const logOut = () => {
    Alert.alert(
      translate('action.login.logOut.title'),
      translate('action.login.logOut.message'),
      [
        {
          text: translate('button.general.cancel'),
          onPress: () => null,
        },
        {
          text: translate('button.login.logOut'),
          onPress: () => signOut(),
        },
      ],
    );
  };

  const saveImage = (_file: File | null) => {
    if (user !== null && _file !== null) {
      const _user = {...user};
      _user.image = {..._file};
      dispatch(updateUser(_user)).then(() => {
        if (!loading && !error) {
          ToastAndroid.showWithGravity(
            translate('action.image.updated'),
            ToastAndroid.CENTER,
            ToastAndroid.SHORT,
          );
        }
      });
    }
  };

  return (
    <View>
      <View margin="m">
        <SimpleHeader label={translate('screen.profile.title')} />
      </View>
      <View marginHorizontal="xl" marginVertical="l">
        <View alignItems="center">
          <Avatar file={file} saveImage={saveImage} />
        </View>
        <View style={styles.formData} marginHorizontal="m">
          <View marginBottom="m">
            <Text variant="formLabel" marginBottom="s">
              {translate('form.user.name.label')}
            </Text>
            <View
              height={48}
              flexDirection="row"
              alignItems="center"
              paddingHorizontal="m"
              borderColor="default"
              borderWidth={2}
              borderRadius={12}>
              <View marginRight="m">
                <Icon name="user" color={theme.colors.default} size={20} />
              </View>
              <View>
                <Text>{user?.name}</Text>
              </View>
            </View>
          </View>
          <View marginBottom="m">
            <Text variant="formLabel" marginBottom="s">
              {translate('form.user.lastName.label')}
            </Text>
            <View
              height={48}
              flexDirection="row"
              alignItems="center"
              paddingHorizontal="m"
              borderColor="default"
              borderWidth={2}
              borderRadius={12}>
              <View marginRight="m">
                <Icon name="users" color={theme.colors.default} size={20} />
              </View>
              <View>
                <Text>{user?.lastName}</Text>
              </View>
            </View>
          </View>
          <View marginBottom="m">
            <Text variant="formLabel" marginBottom="s">
              {translate('form.user.email.label')}
            </Text>
            <View
              height={48}
              flexDirection="row"
              alignItems="center"
              paddingHorizontal="m"
              borderColor="default"
              borderWidth={2}
              borderRadius={12}>
              <View marginRight="m">
                <Icon name="mail" color={theme.colors.default} size={20} />
              </View>
              <View>
                <Text>{user?.username}</Text>
              </View>
            </View>
          </View>
          <View marginHorizontal="l" marginVertical="l">
            <Button
              variant="primary"
              onPress={() => logOut()}
              label={translate('action.login.logOut.title')}
            />
          </View>
          <View style={styles.version} margin="l">
            <Text variant="version">
              {translate('app.data.version') + ' ' + VERSION}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  formData: {
    flexDirection: 'column',
  },
  avatar: {
    alignItems: 'center',
  },
  version: {
    alignItems: 'center',
  },
});
