import React, {useState} from 'react';
import {VERSION} from '@env';
import {Alert, StyleSheet, ToastAndroid} from 'react-native';
import {
  Avatar,
  Button,
  Header,
  ImagePicker,
  View,
  Text,
  TextInput,
} from 'components';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {useAppDispatch, useAppSelector} from 'store/configureStore';
import {useAuth} from 'core';
import {UserState, ParsedImage, UserFormValues} from 'types';
//import {setImage} from 'store/slices/user/UserSlice';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {createMediaObject} from 'store/slices/mediaObject/mediaObjectAsyncThunk';
import {updateUser} from 'store/slices/user/userAsyncThunk';
import {getCredentials, setCredentials} from 'utils/storage';
import {translate} from 'core';

const UserSchema = Yup.object().shape({
  username: Yup.string()
    .email('Incorrect email format')
    .required('Email required'),
  name: Yup.string().required('Name required').min(3),
  lastName: Yup.string().required('Lastname required').min(3),
});

export const Profile: React.FC = () => {
  const dispatch = useAppDispatch();
  const {user, error}: UserState = useAppSelector((state) => state.users);
  const [userNameChange, setUsernameChange] = useState<boolean>(false);
  const [nameChange, setNameChange] = useState<boolean>(false);
  const [lastNameChange, setLastNameChange] = useState<boolean>(false);
  const [modal, setModal] = useState<boolean>(false);
  const {signOut} = useAuth();

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

  const saveImage = (image: ParsedImage) => {
    if (image !== undefined) {
      image.uri =
        'file://data/user/0/com.singular/cache/rn_image_picker_lib_temp_952cb47e-d9ca-4fad-a66a-0569cfb6e8a9.jpg';
      dispatch(createMediaObject(image));
      //dispatch(setImage({id: 40, contentUrl: value.uri}));
    }
  };

  const submitForm = ({name, lastName, username}: UserFormValues) => {
    if (user !== null) {
      if (nameChange || lastNameChange || userNameChange) {
        const updatedUser = {
          id: user.id,
          username: username,
          name: name,
          lastName: lastName,
          image: user.image,
        };
        dispatch(updateUser(updatedUser)).then(async () => {
          const message = !error
            ? 'Profile Updated'
            : 'Error while updating profile';
          ToastAndroid.showWithGravity(
            message,
            ToastAndroid.CENTER,
            ToastAndroid.SHORT,
          );
          if (userNameChange) {
            try {
              const credentials = await getCredentials();
              if (credentials !== null) {
                await setCredentials({
                  username,
                  password: credentials?.password,
                });
              }
            } catch (e) {
              throw e;
            }
          }
        });
      }
    }
    setUsernameChange(false);
    setNameChange(false);
    setLastNameChange(false);
  };
  const {
    handleChange,
    handleBlur,
    handleSubmit,
    errors,
    touched,
    values,
  } = useFormik({
    validationSchema: UserSchema,
    initialValues: {
      name: user ? user.name : '',
      lastName: user ? user.lastName : '',
      username: user ? user.username : '',
    },
    onSubmit: (formValues: UserFormValues) => {
      submitForm(formValues);
    },
    validateOnBlur: false,
    validateOnChange: false,
  });
  const openImagePicker = () => setModal(true);
  const customHandleBlur = (a: string) => {
    handleBlur(a);
    handleSubmit();
  };
  return (
    <KeyboardAwareScrollView>
      <View margin="m">
        <Header label={translate('screen.profile.title')} />
      </View>
      <View marginHorizontal="xl" marginVertical="l">
        <View style={styles.avatar} marginBottom="l">
          <Avatar
            isContentUrl={false}
            uri={user?.image?.contentUrl}
            hasBorder={true}
            height={90}
            width={90}
            press={openImagePicker}
            longPress={() => null}
          />
          <ImagePicker
            setModalVisibility={setModal}
            visible={modal}
            saveImage={saveImage}
          />
        </View>
        <View style={styles.formData} marginHorizontal="m">
          <View marginBottom="s">
            <Text variant="formLabel" marginBottom="s">
              {translate('form.user.name.label')}
            </Text>
            <TextInput
              icon="user"
              placeholder={translate('form.user.name.label')}
              value={values.name}
              autoCapitalize="words"
              autoCompleteType="name"
              onChangeText={handleChange('name')}
              onChange={() => setNameChange(true)}
              onBlur={() => customHandleBlur('name')}
              error={errors.name}
              touched={nameChange ? touched.name : false}
              onSubmitEditing={() => handleSubmit()}
            />
          </View>
          <View marginBottom="s">
            <Text variant="formLabel" marginBottom="s">
              {translate('form.user.lastName.label')}
            </Text>
            <TextInput
              icon="users"
              placeholder={translate('form.user.lastName.placeholder')}
              value={values.lastName}
              autoCapitalize="words"
              autoCompleteType="username"
              onChangeText={handleChange('lastName')}
              onChange={() => setLastNameChange(true)}
              onBlur={() => customHandleBlur('lastName')}
              error={errors.name}
              touched={lastNameChange ? touched.lastName : false}
              onSubmitEditing={() => handleSubmit()}
            />
          </View>
          <View marginBottom="s">
            <Text variant="formLabel" marginBottom="s">
              {translate('form.user.email.label')}
            </Text>
            <TextInput
              icon="mail"
              placeholder={translate('form.user.email.placeholder')}
              value={values.username}
              autoCapitalize="none"
              autoCompleteType="email"
              onChangeText={handleChange('username')}
              onBlur={() => customHandleBlur('username')}
              error={errors.username}
              touched={userNameChange ? touched.username : false}
              onChange={() => setUsernameChange(true)}
              returnKeyLabel="go"
              onSubmitEditing={() => handleSubmit()}
            />
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
    </KeyboardAwareScrollView>
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
