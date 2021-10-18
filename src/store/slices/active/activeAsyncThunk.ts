import {createAsyncThunk} from '@reduxjs/toolkit';
import ActiveApi from 'api/activeApi';
import {
  Active,
  Actives,
  NewActive,
  PaginationFilters,
  ServerError,
} from 'types';

export const fetchActives = createAsyncThunk<Actives, PaginationFilters, {}>(
  'active/fetchActives',
  async (pagination) => {
    try {
      const response = await ActiveApi.getActives(pagination);
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

export const createActive = createAsyncThunk<
  Active,
  NewActive,
  {rejectValue: ServerError}
>('active/createActive', async (active, {rejectWithValue}) => {
  try {
    const response = await ActiveApi.createActive(active);
    if (response.status === 201) {
      return response.data;
    }
  } catch (error: any) {
    return rejectWithValue(error);
  }
});

export const updateActive = createAsyncThunk<
  Active,
  Active,
  {rejectValue: ServerError}
>('active/updateActive', async (active, {rejectWithValue}) => {
  try {
    const response = await ActiveApi.updateActive(active, active.id);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error: any) {
    return rejectWithValue(error);
  }
});

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
