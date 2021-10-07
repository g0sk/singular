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

export const createActive = createAsyncThunk<Active, Active, {}>(
  'active/createActive',
  async (active) => {
    try {
      const response = await ActiveApi.createActive(active);
      if (response.status === 201) {
        return response.data;
      }
    } catch (e) {
      throw e;
    }
  },
);

export const updateActive = createAsyncThunk<Active, Active, {}>(
  'active/updateActive',
  async (active) => {
    try {
      const response = await ActiveApi.updateActive(active, active.id);
      if (response.status === 200) {
        return response.data;
      }
    } catch (e) {
      throw e;
    }
  },
);

export const deleteActive = createAsyncThunk<Active, number, {}>(
  'active/deleteActive',
  async (id) => {
    try {
      const response = await ActiveApi.deleteActive(id);
      if (response.status === 204 || response.status === 200) {
        return response.data;
      }
    } catch (e) {
      throw e;
    }
  },
);
