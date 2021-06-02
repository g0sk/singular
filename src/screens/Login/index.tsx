import React from 'react';
import * as Yup from 'yup';
import {useFormik} from 'formik';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {ImageBackground, Dimensions} from 'react-native';
import {Button, Text, TextInput, View} from 'components';
//import {fetchToken} from 'core/auth/authSlice';
//import {fetchUser} from 'store/slices/UserSlice';
//import {useAuth} from 'core/auth';
//import {useAppDispatch, useAppSelector} from 'store/configureStore';
import {ErrorHandler} from 'handlers/error';
//import {getToken} from 'core/auth/utils';

const {height, width} = Dimensions.get('window');

const FormSchema = Yup.object().shape({
  username: Yup.string().email('Invalid username').required('Required'),
  password: Yup.string()
    .min(5, 'Too short')
    .max(15, 'Too long')
    .required('Required'),
});
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

  const {
    handleChange,
    handleBlur,
    //handleSubmit,
    errors,
    touched,
    //values,
    //setFieldValue,
  } = useFormik({
    validationSchema: FormSchema,
    initialValues: {username: '', password: ''},
    onSubmit: (values) => console.log(values),
  });

  return (
    <ErrorHandler>
      <KeyboardAwareScrollView style={{height, width}}>
        <ImageBackground
          source={require('../../../assets/images/purple-background.jpg')}
          style={{height, width}}>
          <View padding="l">
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
              <View>
                <View marginVertical="m" margin="s">
                  <TextInput
                    icon="mail"
                    placeholder="Enter your email"
                    autoCapitalize="none"
                    autoCompleteType="email"
                    onChangeText={handleChange('username')}
                    onBlur={handleBlur('username')}
                    error={errors.username}
                    touched={touched.username}
                  />
                  <View marginTop="m">
                    <TextInput
                      icon="lock"
                      placeholder="Enter your password"
                      secureTextEntry={true}
                      autoCapitalize="none"
                      autoCompleteType="password"
                      onChangeText={handleChange('password')}
                      onBlur={handleBlur('password')}
                      error={errors.password}
                      touched={touched.password}
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
          </View>
        </ImageBackground>
      </KeyboardAwareScrollView>
    </ErrorHandler>
  );
};
