import {createAsyncThunk} from '@reduxjs/toolkit';
import ApiBasicAttribute from 'api/attributeValueApi';
import {Attribute} from 'types';

export const fetchAttributeValues = createAsyncThunk<Attribute[], void, {}>(
  'attributeValue/fetchAttributeValue',
  async () => {
    try {
      const response = await ApiBasicAttribute.getAttributeValues();
      if (response.status === 200) {
        return response.data;
      }
    } catch (e) {
      throw e;
    }
  },
);
