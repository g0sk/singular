import {createAsyncThunk} from '@reduxjs/toolkit';
import ApiCustomAttribute from 'api/customAttributeApi';
import {Attribute, NewAttribute} from 'types';
export const createCustomAttribute = createAsyncThunk<
  Attribute,
  NewAttribute,
  {}
>('customAttribute/createCustomAttribute', async (customAttribute) => {
  try {
    const response = await ApiCustomAttribute.createCustomAttribute(
      customAttribute,
    );
    if (response.status === 201) {
      return response.data;
    }
  } catch (e) {
    throw e;
  }
});

export const fetchCustomAttributes = createAsyncThunk<Attribute[], void, {}>(
  'customAttribute/fetchCustomAttributes',
  async () => {
    try {
      const response = await ApiCustomAttribute.getCustomAttributes();
      if (response.status === 200) {
        return response.data;
      }
    } catch (e) {
      throw e;
    }
  },
);
