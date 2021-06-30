import React, {useState, useRef} from 'react';
import {TextInput as RNTextInput, StyleSheet} from 'react-native';
import {Avatar, Button, ImagePicker, View, Text, TextInput} from 'components';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {useAppDispatch, useAppSelector} from 'store/configureStore';
import {useAuth} from 'core/auth/index';
import {ParsedImage, UserFormValues} from 'types';
import {setImage} from 'store/slices/user/UserSlice';
//import {createMediaObject} from 'store/slices/mediaObject/mediaObjectAsyncThunk';
const UserSchema = Yup.object().shape({
  username: Yup.string().required('Email required'),
  name: Yup.string().required(),
  lastName: Yup.string().required(),
  image: Yup.object({
    id: Yup.number(),
    contentUrl: Yup.string(),
  }),
});

export const Profile = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.users.user);
  //const [editMode, setEditMode] = useState<boolean>(false);
  const [modal, setModal] = useState<boolean>(false);
  const {signOut} = useAuth();
  const lastName = useRef<RNTextInput>(null);
  const username = useRef<RNTextInput>(null);

  const submitForm = (formValues: UserFormValues) => console.log(formValues);
  const saveImage = (value: ParsedImage) => {
    if (value !== undefined) {
      //dispatch(createMediaObject(value.uri));
      dispatch(setImage({id: 40, contentUrl: value.uri}));
    }
  };
  const {
    handleChange,
    handleBlur,
    handleSubmit,
    errors,
    touched,
    values,
    //setFieldValue,
  } = useFormik({
    validationSchema: UserSchema,
    initialValues: {
      name: user.name,
      lastName: user.lastName,
      username: user.username,
      image: user.image,
    },
    onSubmit: (formValues: UserFormValues) => submitForm(formValues),
  });
  const openImagePicker = () => setModal(true);
  return (
    <View style={styles.container}>
      <View style={styles.avatar}>
        <Avatar
          isContentUrl={false}
          uri={user.image?.contentUrl}
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
          <Text variant="formLabel">Name</Text>
          <TextInput
            icon="user"
            placeholder={'Enter your name'}
            value={values.name}
            autoCapitalize="words"
            autoCompleteType="name"
            onChangeText={handleChange('name')}
            onBlur={handleBlur('name')}
            error={errors.name}
            touched={touched.name}
            returnKeyLabel="next"
            onSubmitEditing={() => lastName.current?.focus()}
          />
        </View>
        <View style={styles.formField}>
          <Text variant="formLabel">Last name</Text>
          <TextInput
            icon="users"
            placeholder={'Enter your last name'}
            value={values.lastName}
            autoCapitalize="words"
            autoCompleteType="username"
            onChangeText={handleChange('lastName')}
            onBlur={handleBlur('lastname')}
            error={errors.name}
            touched={touched.lastName}
            returnKeyLabel="next"
            onSubmitEditing={() => username.current?.focus()}
          />
        </View>
        <View style={styles.formField}>
          <Text variant="formLabel">Email</Text>
          <TextInput
            icon="mail"
            placeholder={'Enter your email'}
            value={values.username}
            autoCapitalize="none"
            autoCompleteType="email"
            onChangeText={handleChange('username')}
            onBlur={handleBlur('username')}
            error={errors.username}
            touched={touched.username}
            returnKeyLabel="go"
            onSubmitEditing={() => handleSubmit()}
          />
        </View>
        <View>
          <Button
            variant="primary"
            margin="l"
            onPress={() => signOut()}
            label="Sign out"
          />
        </View>
      </View>
    </View>
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
});
