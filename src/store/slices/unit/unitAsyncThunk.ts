import {createAsyncThunk} from '@reduxjs/toolkit';
import UnitApi from 'api/unitApi';
import {Unit} from 'types';

export const fetchUnits = createAsyncThunk<Unit[], void, {}>(
  'unit/fetchUnits',
  async () => {
    try {
      const response = await UnitApi.getUnits();
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      throw error;
    }
  },
);

export const fetchUnit = createAsyncThunk<Unit, number, {}>(
  'unit/fetchUnit',
  async (id) => {
    try {
      const response = await UnitApi.getUnit(id);
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      throw error;
    }
  },
);

export const createUnit = createAsyncThunk<Unit, Unit, {}>(
  'unit/createUnit',
  async (unit) => {
    try {
      const response = await UnitApi.createUnit(unit);
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      throw error;
    }
  },
);

export const updateUnit = createAsyncThunk<Unit, Unit, {}>(
  'unit/unpdateUnit',
  async (unit) => {
    try {
      const response = await UnitApi.updateUnit(unit);
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      throw error;
    }
  },
);

export const deleteUnit = createAsyncThunk<void, number, {}>(
  'unit/deleteUnit',
  async (id) => {
    try {
      const response = await UnitApi.deleteUnit(id);
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      throw error;
    }
  },
);
