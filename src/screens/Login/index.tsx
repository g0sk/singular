import React from 'react';
//import {fetchToken} from 'core/auth/authSlice';
//import {fetchUser} from 'store/slices/UserSlice';
//import {useAuth} from 'core/auth';
//import {useAppDispatch, useAppSelector} from 'store/configureStore';
import {ErrorHandler} from 'handlers/error';
//import {getToken} from 'core/auth/utils';

import {Button, Text, TextInput, View} from 'components';
import {Dimensions} from 'react-native';

const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

export const Login: React.FC = () => {
  //const dispatch = useAppDispatch();
  //const authState = useAppSelector((state) => state.auth);
  //const {signIn} = useAuth();
  /*
  const login = ({username, password}) => {
    const credentials = {username, password};
    dispatch(fetchToken(credentials)).then(() => {
      dispatch(fetchUser(authState.userID));
      navigatorSignIn();
    });
  };
  */
  const emailValidator = (email: string): boolean => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };
  const passwordValidator = (password: string): boolean => {
    return password.length >= 5;
  };

  /* const navigatorSignIn = async () => {
    try {
      const token = await getToken();
      console.log('Token: ', token);
      if (token !== null) {
        signIn(token);
      }
    } catch (e) {
      throw 'Token not found on device';
    }
  };
  */
  return (
    <ErrorHandler>
      <View backgroundColor="primary" padding="l" height={HEIGHT} width={WIDTH}>
        <View
          borderRadius={30}
          backgroundColor="lightBackground"
          alignContent="center"
          marginTop="xl"
          marginHorizontal="s"
          padding="l">
          <Text variant="header1" textAlign="center" marginBottom="l">
            Welcome to Singular
          </Text>
          <Text variant="body" textAlign="center">
            Log in to start using the app
          </Text>
          <View marginVertical="m" margin="s">
            <TextInput
              icon="mail"
              placeholder="Enter your email"
              validator={emailValidator}
            />
            <View marginTop="m">
              <TextInput
                icon="lock"
                placeholder="Enter your password"
                secureTextEntry={true}
                validator={passwordValidator}
              />
            </View>
          </View>
          <Button
            marginHorizontal="xl"
            marginVertical="s"
            variant="secondary"
            label="Log in"
            onPress={() => null}
          />
        </View>
      </View>
    </ErrorHandler>
  );
};
