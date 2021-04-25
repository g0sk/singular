import React, {useState} from 'react';
import {View, TextInput, Button} from 'react-native';
import Screen from 'components/Screen';
import {fetchToken} from 'core/auth/authSlice';
import {useAuth} from 'core/auth';
import {useAppDispatch} from 'store/configureStore';
import {getToken} from 'core/auth/utils';

export const Login: React.FC = () => {
  const dispatch = useAppDispatch();
  //const authState = useAppSelector((state) => state.auth);
  const {signIn} = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const login = async () => {
    const credentials = {username, password};
    dispatch(fetchToken(credentials));
    navigatorSignIn();
  };

  const navigatorSignIn = async () => {
    try {
      const token = await getToken();
      if (token !== null) {
        signIn(token);
      }
    } catch (e) {
      throw 'Token not found on device';
    }
  };
  return (
    <Screen>
      <View>
        <TextInput
          value={username}
          placeholder="Username"
          onChangeText={(value) => setUsername(value)}
        />
        <TextInput
          value={password}
          placeholder="Password"
          onChangeText={(value) => setPassword(value)}
        />
        <Button title="Login" onPress={() => login()} />
      </View>
    </Screen>
  );
};
