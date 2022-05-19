import {createSlice} from '@reduxjs/toolkit';
import {fetchActiveRecord, fetchFilteredActiveRecord} from './recordAsyncThunk';
import {RecordState} from 'types';

const initialState: RecordState = {
  activeRecord: null,
  recordsLength: 0,
  error: false,
  loading: false,
};

const recordSlice = createSlice({
  name: 'record',
  initialState,
  reducers: {
    resetRecordState: (state) => {
      state.activeRecord = null;
      state.recordsLength = 0;
      state.error = false;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchActiveRecord.fulfilled, (state, action) => {
        state.activeRecord = {...action.payload};
        state.recordsLength = action.payload.dateRecord.length;
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
      })
      .addCase(fetchFilteredActiveRecord.fulfilled, (state, action) => {
        if (action.payload.length > 0) {
          state.activeRecord = {...action.payload[0]};
          state.recordsLength = action.payload[0].dateRecord.length;
        } else {
          state.activeRecord = null;
          state.recordsLength = 0;
        }
        state.error = false;
        state.loading = false;
      })
      .addCase(fetchFilteredActiveRecord.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(fetchFilteredActiveRecord.rejected, (state) => {
        console.log('no existe');
        state.error = true;
        state.loading = false;
      });
  },
});

export default recordSlice.reducer;
export const {resetRecordState} = recordSlice.actions;
