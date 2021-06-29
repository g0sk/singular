import React from 'react';
import {Text, View} from 'components';
import {DocumentStackProps} from 'types';
//import {useFormik} from 'formik';
//import * as Yup from 'yup';
//import {Active} from 'types';

/*
const ActiveSchema = Yup.object().shape({
  reference: Yup.string().required('Required'),
  entryDate: Yup.string(),
  measurementData: Yup.number(),
  measurementUnit: Yup.string(),
  estimatedLifeTime: Yup.number(),
  lifeTime: Yup.number(),
  lifeTimeMeasurementUnit: Yup.string(),
  type: Yup.string(),
  customAttributes: Yup.string(),
  file: Yup.object().shape({
    id: Yup.number(),
    contentUrl: Yup.string(),
  }),
  useWearTear: Yup.string(),
});
*/
export const Document: React.FC<DocumentStackProps> = ({route}) => {
  /*
  const {
    handleChange,
    handleBlur,
    handleSubmit,
    errors,
    touched,
    values,
    setFieldValue,
  } = useFormik({
    validationSchema: ActiveSchema,
    initialValues: {
      reference: '',
      entryDate: '',
      measurementData: 0,
      measurementUnit: '',
      estimatedLifeTime: 0,
      lifetime: 0,
      lifetimeMeasurementUnit: '',
      type: '',
      customAttributes: '',
      activeRecord: '',
      file: '',
      useWearTear: '',
    },
    onSubmit: (formaValues: Active) => null,
  });
  */
  return (
    <View>
      <Text>Document form</Text>
      <Text>{route.params?.activeId}</Text>
    </View>
  );
};
