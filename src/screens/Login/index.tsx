import React, {useState} from 'react';
import Screen from 'components/Screen';
//import {fetchToken} from 'core/auth/authSlice';
import {useAuth} from 'core/auth';
import {useAppSelector} from 'store/configureStore';
import {getToken, setToken} from 'core/auth/utils';
import Header from 'components/Header';
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';

export const Login: React.FC = () => {
  //const dispatch = useAppDispatch();
  const authState = useAppSelector((state) => state.auth);
  const {signIn} = useAuth();
  const title = 'Singular';
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const login = () => {
    //const credentials = {username, password};
    //dispatch(fetchToken(credentials)).then(() => navigatorSignIn());
    setToken('hola');
    navigatorSignIn();
  };

  const navigatorSignIn = async () => {
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

  return (
    <Screen>
      <View style={styles.container}>
        <View style={styles.body}>
          <View style={styles.header}>
            <Header title={title} hasDescription={false} />
          </View>
          <View style={styles.form}>
            <TextInput
              value={username}
              placeholder="Enter your username"
              onChangeText={(value) => setUsername(value)}
              style={styles.formInput}
            />
            <TextInput
              value={password}
              secureTextEntry={true}
              placeholder="Enter your password"
              onChangeText={(value) => setPassword(value)}
              style={styles.formInput}
            />
            <Button title="Log in" onPress={() => login()} />
            <ActivityIndicator
              animating={authState.loading}
              color="red"
              size="large"
            />
          </View>
        </View>
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    backgroundColor: '#000b31',
    height: '100%',
    width: '100%',
  },
  body: {
    backgroundColor: '#ffffff',
    height: 300,
    borderRadius: 25,
    margin: 20,
    padding: 30,
  },
  header: {
    top: 0,
    paddingBottom: 20,
  },
  title: {},
  titleDescription: {},
  form: {},
  formInput: {
    justifyContent: 'center',
    marginBottom: 10,
    borderRadius: 5,
    borderColor: '#000b31',
    borderWidth: 1,
    height: 40,
    padding: 10,
  },
  button: {},
  rememberCredentials: {},
});
