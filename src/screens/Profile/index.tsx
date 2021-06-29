import React, {useRef} from 'react';
import {TextInput as RNTextInput, StyleSheet} from 'react-native';
import {View, Text, TextInput} from 'components';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {useAppSelector} from 'store/configureStore';
import {UserFormValues} from '../../../types';

const UserSchema = Yup.object().shape({
  username: Yup.string().required('Email required'),
  name: Yup.string(),
  lastName: Yup.string(),
  image: Yup.object({
    id: Yup.number(),
    contentUrl: Yup.string(),
  }),
});

export const Profile = () => {
  //const [hasChange, setHasChange] = useState<boolean>(false);
  const user = useAppSelector((state) => state.users.user);
  const lastName = useRef<RNTextInput>(null);
  const username = useRef<RNTextInput>(null);

  const pepega = (formValues: UserFormValues) => console.log(formValues);
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
    onSubmit: (formValues: UserFormValues) => pepega(formValues),
  });
  return (
    <View>
      <View>
        <View>
          <Text>Avatar</Text>
        </View>
        <View style={styles.fieldName}>
          <View>
            <Text>Name</Text>
            <TextInput
              icon={null}
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
          <View>
            <Text>Name</Text>
            <TextInput
              icon={null}
              placeholder={'Enter your last name'}
              value={values.lastName}
              autoCapitalize="words"
              autoCompleteType="name"
              onChangeText={handleChange('lastName')}
              onBlur={handleBlur('name')}
              error={errors.name}
              touched={touched.lastName}
              returnKeyLabel="next"
              onSubmitEditing={() => username.current?.focus()}
            />
          </View>
          <View>
            <Text>Email</Text>
            <TextInput
              icon={null}
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
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  field: {},
  fieldName: {
    flexDirection: 'row',
  },
  avatar: {},
});
