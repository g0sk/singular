import {createAsyncThunk} from '@reduxjs/toolkit';
import ApiBasicAttribute from 'api/basicAttributeApi';
import {Attribute} from 'types';

export const fetchBasicAttributes = createAsyncThunk<Attribute[], void, {}>(
  'basicAttribute/fetchBasicAttributes',
  async () => {
    try {
      const response = await ApiBasicAttribute.getBasicAttributes();
      if (response.status === 200) {
        return response.data;
      }
    } catch (e) {
      throw e;
    }
  },
);
