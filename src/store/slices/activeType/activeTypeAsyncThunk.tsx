import {createAsyncThunk} from '@reduxjs/toolkit';
import ActiveTypeApi from 'api/activeTypeApi';
import {ActiveType, ActiveTypes} from 'types';

export const fetchActiveTypes = createAsyncThunk<ActiveTypes, void, {}>(
  'activeType/fetchActiveTypes',
  async () => {
    try {
      const response = await ActiveTypeApi.getActiveTypes();
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      throw error;
    }
  },
);

export const fetchActiveType = createAsyncThunk<ActiveType, number, {}>(
  'activeType/fetchActiveType',
  async (id) => {
    try {
      const response = await ActiveTypeApi.getActiveType(id);
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      throw error;
    }
  },
);

export const createActiveType = createAsyncThunk<ActiveType, ActiveType, {}>(
  'activeType/createActiveType',
  async (activeType) => {
    try {
      const response = await ActiveTypeApi.createActiveType(activeType);
      if (response.status === 201) {
        return response.data;
      }
    } catch (error) {
      throw error;
    }
  },
);

export const updateActiveType = createAsyncThunk<ActiveType, ActiveType, {}>(
  'activeType/updateActiveType',
  async (activeType) => {
    try {
      const response = await ActiveTypeApi.updateActiveType(
        activeType,
        activeType.id,
      );
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      throw error;
    }
  },
);

export const deleteActiveType = createAsyncThunk<void, number, {}>(
  'activeType/deleteActiveType',
  async (id) => {
    try {
      const response = await ActiveTypeApi.deleteActiveType(id);
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      throw error;
    }
  },
);
