import {createSlice} from '@reduxjs/toolkit';
import {fetchActiveRecord} from './recordAsyncThunk';
import {RecordState} from 'types';

const initialState: RecordState = {
  activeRecord: null,
  error: false,
  loading: false,
};

const recordSlice = createSlice({
  name: 'record',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchActiveRecord.fulfilled, (state, action) => {
        state.activeRecord = {...action.payload};
        state.error = false;
        state.loading = false;
      })
      .addCase(fetchActiveRecord.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(fetchActiveRecord.rejected, (state) => {
        state.error = true;
        state.loading = false;
      });
  },
});

export default recordSlice.reducer;
