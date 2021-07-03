import React, {useState} from 'react';
import {StyleSheet, ToastAndroid} from 'react-native';
import {Avatar, Button, ImagePicker, View, Text, TextInput} from 'components';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {useAppDispatch, useAppSelector} from 'store/configureStore';
import {useAuth} from 'core/auth/index';
import {UserState, ParsedImage, UserFormValues} from 'types';
//import {setImage} from 'store/slices/user/UserSlice';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {createMediaObject} from 'store/slices/mediaObject/mediaObjectAsyncThunk';
import {updateUser} from 'store/slices/user/userAsyncThunk';
import {getCredentials, setCredentials} from 'utils/storage';

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

  const saveImage = (image: ParsedImage) => {
    if (image !== undefined) {
      image.uri =
        'file://data/user/0/com.singular/cache/rn_image_picker_lib_temp_952cb47e-d9ca-4fad-a66a-0569cfb6e8a9.jpg';
      dispatch(createMediaObject(image));
      //dispatch(setImage({id: 40, contentUrl: value.uri}));
    }
  };

  const submitForm = async ({name, lastName, username}: UserFormValues) => {
    if (user !== null) {
      if (nameChange || lastNameChange || userNameChange) {
        const updatedUser = {
          id: user.id,
          username: username,
          name: name,
          lastName: lastName,
          image: user.image,
        };
        dispatch(updateUser(updatedUser)).then(() => {
          const message = !error
            ? 'Profile Updated'
            : 'Error while updating profile';
          ToastAndroid.showWithGravity(
            message,
            ToastAndroid.CENTER,
            ToastAndroid.SHORT,
          );
        });
      }
    }
    if (userNameChange) {
      try {
        const credentials = await getCredentials();
        if (credentials !== null) {
          await setCredentials({username, password: credentials?.password});
        }
      } catch (e) {
        throw e;
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
    <KeyboardAwareScrollView style={styles.container}>
      <View style={styles.avatar}>
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
      <View style={styles.formData}>
        <View style={styles.formField}>
          <Text variant="formLabel" marginBottom="s">
            Name
          </Text>
          <TextInput
            icon="user"
            placeholder={'Enter your name'}
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
        <View style={styles.formField}>
          <Text variant="formLabel" marginBottom="s">
            Last name
          </Text>
          <TextInput
            icon="users"
            placeholder={'Enter your last name'}
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
        <View style={styles.formField}>
          <Text variant="formLabel" marginBottom="s">
            Email
          </Text>
          <TextInput
            icon="mail"
            placeholder={'Enter your email'}
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
            onPress={() => signOut()}
            label="Sign out"
          />
        </View>
        <View style={styles.version} margin="xl">
          <Text variant="version">Version 1.0</Text>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    margin: 20,
  },
  formData: {
    padding: 20,
    flexDirection: 'column',
  },
  avatar: {
    margin: 10,
    alignItems: 'center',
  },
  formField: {
    marginVertical: 5,
  },
  version: {
    alignItems: 'center',
  },
});
