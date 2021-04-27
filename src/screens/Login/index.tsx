import React, {useState} from 'react';
import {View, TextInput, Button, StyleSheet} from 'react-native';
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

  const navigatorSignIn = async () => {
    try {
      const token = await getToken();
      console.log('we got token', token);
      if (token !== null) {
        signIn(token);
      }
    } catch (e) {
      throw 'Token not found on device';
    }
  };

  const login = () => {
    const credentials = {username, password};
    dispatch(fetchToken(credentials)).then(() => navigatorSignIn());
  };

  return (
    <Screen>
      <View style={styles.container}>
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

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    backgroundColor: '#0c4291',
  },
});
