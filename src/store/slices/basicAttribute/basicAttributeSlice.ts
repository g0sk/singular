import {createSlice} from '@reduxjs/toolkit';
import {BasicAttributeState} from 'types';
import {fetchBasicAttributes} from './basicAttributeAsyncThunk';
const initialState: BasicAttributeState = {
  basicAttribute: null,
  basicAttributes: [],
  loading: false,
  error: false,
};

const basicAttributeSlice = createSlice({
  name: 'basicAttribute',
  initialState,
  reducers: {},
  extraReducers: (build) => {
    build
      .addCase(fetchBasicAttributes.fulfilled, (state, action) => {
        state.basicAttributes = [...action.payload];
        state.loading = false;
        state.error = false;
      })
      .addCase(fetchBasicAttributes.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(fetchBasicAttributes.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  },
});

export default basicAttributeSlice.reducer;
