import React, {useRef} from 'react';
import * as Yup from 'yup';
import {useFormik} from 'formik';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {
  ImageBackground,
  Dimensions,
  TextInput as RNTextInput,
  ToastAndroid,
} from 'react-native';
import {Button, CheckBox, Text, TextInput, View} from 'components';
import {fetchToken} from 'core/auth/authSlice';
import {fetchUser} from 'store/slices/user/userAsyncThunk';
import {useAuth} from 'core';
import store, {useAppDispatch, useAppSelector} from 'store/configureStore';
import {ErrorHandler} from 'handlers/error';
import {removeCredentials, setCredentials} from 'utils/storage';
import {translate} from 'core';
import {FormValues} from 'types';

const {height, width} = Dimensions.get('window');

const LoginSchema = Yup.object().shape({
  username: Yup.string()
    .email(translate('form.login.email.error.invalid'))
    .required(translate('form.login.email.error.required')),
  password: Yup.string()
    .min(5, translate('form.login.password.error.short'))
    .max(15, translate('form.login.password.error.long'))
    .required(translate('form.login.password.error.required')),
  saveCredentials: Yup.boolean(),
});

export const Login: React.FC = () => {
  const dispatch = useAppDispatch();
  const {signIn} = useAuth();
  const {loading} = useAppSelector((state) => state.auth);
  const login = ({username, password, saveCredentials}: FormValues) => {
    dispatch(fetchToken({username, password})).then(() => {
      const authState = store.getState().auth;
      if (authState.error && authState.errorData !== null) {
        ToastAndroid.showWithGravity(
          authState.errorData.message,
          ToastAndroid.CENTER,
          ToastAndroid.SHORT,
        );
      } else {
        if (authState.userID !== null) {
          //Credentials are correct
          if (saveCredentials) {
            setCredentials({username, password});
          } else {
            removeCredentials();
          }
          dispatch(fetchUser(authState.userID)).then(() => navigatorSignIn());
        }
      }
    });
  };

  const navigatorSignIn = async () => {
    try {
      const {token, refreshToken} = store.getState().auth;
      const {user} = store.getState().users;
      if (token !== null && refreshToken !== null && user !== null) {
        signIn({token, refreshToken, user});
      } else {
        console.log('Authentication error');
      }
    } catch (e) {
      throw e;
    }
  };

  const password = useRef<RNTextInput>(null);
  const {
    handleChange,
    handleBlur,
    handleSubmit,
    errors,
    touched,
    values,
    setFieldValue,
    isValid,
  } = useFormik({
    validationSchema: LoginSchema,
    initialValues: {
      username: '',
      password: '',
      saveCredentials: true,
    },
    onSubmit: (formValues: FormValues) => login(formValues),
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
                {translate('screen.login.title')}
              </Text>
              <Text variant="description" textAlign="center">
                {translate('screen.login.description')}
              </Text>
              <View>
                <View marginVertical="m" marginHorizontal="s">
                  <TextInput
                    icon="mail"
                    placeholder={translate('form.login.email.placeholder')}
                    autoCapitalize="none"
                    autoCompleteType="email"
                    onChangeText={handleChange('username')}
                    onBlur={handleBlur('username')}
                    error={errors.username}
                    touched={touched.username}
                    returnKeyLabel="next"
                    onSubmitEditing={() => password.current?.focus()}
                  />
                  <View marginTop="m">
                    <TextInput
                      ref={password}
                      icon="lock"
                      placeholder={translate('form.login.password.placeholder')}
                      secureTextEntry={true}
                      autoCapitalize="none"
                      autoCompleteType="password"
                      onChangeText={handleChange('password')}
                      onBlur={handleBlur('password')}
                      error={errors.password}
                      touched={touched.password}
                      returnKeyLabel="go"
                      onSubmitEditing={() => handleSubmit()}
                    />
                  </View>
                  <View paddingTop="m" paddingHorizontal="s">
                    <CheckBox
                      label={translate('button.login.rememberMe')}
                      checked={values.saveCredentials}
                      onChange={() =>
                        setFieldValue(
                          'saveCredentials',
                          !values.saveCredentials,
                        )
                      }
                    />
                  </View>
                </View>
                <View marginHorizontal="m">
                  <Button
                    disabled={!isValid}
                    variant={isValid ? 'primary' : 'disabled'}
                    label={translate('button.login.logIn')}
                    onPress={() => handleSubmit()}
                    loading={loading}
                  />
                </View>
              </View>
            </View>
          </View>
        </ImageBackground>
      </KeyboardAwareScrollView>
    </ErrorHandler>
  );
};
