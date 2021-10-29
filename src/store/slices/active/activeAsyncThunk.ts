import {createAsyncThunk} from '@reduxjs/toolkit';
import ActiveApi from 'api/activeApi';
import {createUrlParams} from 'helpers/filters';
import {
  Active,
  Actives,
  NewActive,
  ServerError,
  PaginationFilters,
  Pagination,
} from 'types';

export const fetchActives = createAsyncThunk<Actives, Pagination, {}>(
  'active/fetchActives',
  async (params) => {
    try {
      const response = await ActiveApi.getActives(params);
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      throw error;
    }
  },
);

export const fetchFilteredActives = createAsyncThunk<
  Actives,
  PaginationFilters,
  {}
>('active/fetchFilteredActives', async (params) => {
  const urlParams = createUrlParams(params);
  try {
    const response = await ActiveApi.getFilteredActives(urlParams);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    throw error;
  }
});

export const fetchTag = createAsyncThunk<Actives, PaginationFilters, {}>(
  'active/fetchTag',
  async (filters) => {
    const formattedFilters = createUrlParams(filters);
    try {
      const response = await ActiveApi.getTag(formattedFilters);
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
