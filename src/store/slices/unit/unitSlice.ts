import {createSlice} from '@reduxjs/toolkit';
import {
  createUnit,
  //deleteUnit,
  updateUnit,
  fetchUnits,
  fetchUnit,
} from './unitAsyncThunk';
import {UnitState} from 'types';

const initialState: UnitState = {
  unit: null,
  units: [],
  unitsLength: 0,
  loading: false,
  error: false,
};

const activeSlice = createSlice({
  name: 'active',
  initialState,
  reducers: {
    clearUnit: (state) => {
      state.unit = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUnits.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.units = [...action.payload];
        //Not actives length, add items per page used on request
        state.unitsLength = state.units.length;
      })
      .addCase(fetchUnits.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(fetchUnits.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(fetchUnit.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.unit = action.payload;
      })
      .addCase(fetchUnit.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(fetchUnit.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(createUnit.fulfilled, (state, action) => {
        state.unit = {...action.payload};
        state.loading = false;
        state.error = false;
      })
      .addCase(createUnit.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(createUnit.rejected, (state) => {
        state.error = true;
        state.loading = false;
      })
      .addCase(updateUnit.fulfilled, (state, action) => {
        state.unit = action.payload;
        state.loading = false;
        state.error = false;
      })
      .addCase(updateUnit.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(updateUnit.rejected, (state) => {
        state.error = true;
        state.loading = false;
      });
  },
});

export default activeSlice.reducer;
export const {clearUnit} = activeSlice.actions;
