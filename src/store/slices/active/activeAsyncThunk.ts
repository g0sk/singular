import {createAsyncThunk} from '@reduxjs/toolkit';
import ActiveApi from 'api/activeApi';
import {Actives} from 'types';

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
