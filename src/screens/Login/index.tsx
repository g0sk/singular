import React, {useState} from 'react';
import {View, TextInput, Button} from 'react-native';
import Screen from 'components/Screen';
import {fetchToken} from 'core/auth/authSlice';
import {useAppDispatch} from 'store/configureStore';

type Token = string | null;

export const Login: React.FC = () => {
  const dispatch = useAppDispatch();
  //const authState = useAppSelector((state) => state.auth);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const login = () => {
    const credentials = {username, password};
    dispatch(fetchToken(credentials));
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
