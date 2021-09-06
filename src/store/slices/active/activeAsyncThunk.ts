import {createAsyncThunk} from '@reduxjs/toolkit';
import ActiveApi from 'api/activeApi';
import {Active, Actives} from 'types';

export const fetchActives = createAsyncThunk<Actives, void, {}>(
  'active/fetchActives',
  async () => {
    try {
      const response = await ActiveApi.getActives();
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      throw error;
    }
  },
);

export const fetchActive = createAsyncThunk<Active, number, {}>(
  'active/fetchActive',
  async (id) => {
    try {
      const response = await ActiveApi.getActive(id);
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      throw error;
    }
  },
);

export const fetchActiveTypes = createAsyncThunk<Array<string>, void, {}>(
  'active/fetchActiveTypes',
  async () => {
    try {
      const response = await ActiveApi.getTypes();
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      throw error;
    }
  },
);
