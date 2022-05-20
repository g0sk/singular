import {createAsyncThunk} from '@reduxjs/toolkit';
import RecordApi from 'api/recordApi';
import {createUrlFilterParams} from 'helpers/filters';
import {Filters, Record} from 'types';
import {RecordActive} from 'types';

export const fetchActiveRecords = createAsyncThunk<Record, number, {}>(
  'active/fetchActiveRecords',
  async (id) => {
    try {
      const response = await RecordApi.getActiveRecord(id);
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      throw error;
    }
  },
);

export const fetchActiveRecord = createAsyncThunk<Record, number, {}>(
  'active/fetchActiveRecords',
  async (id) => {
    try {
      const response = await RecordApi.getActiveRecord(id);
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      throw error;
    }
  },
);

export const fetchFilteredActiveRecord = createAsyncThunk<
  RecordActive[],
  {activeId: number; filters: Filters},
  {}
>('record/fetchFilteredActiveRecord', async (params) => {
  const urlParams = createUrlFilterParams(params.filters);
  try {
    const response = await RecordApi.getFilteredActiveRecord(
      params.activeId,
      urlParams,
    );
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    throw error;
  }
});
