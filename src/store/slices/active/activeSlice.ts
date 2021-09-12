import {createSlice} from '@reduxjs/toolkit';
import {fetchActives, fetchActive, fetchActiveTypes} from './activeAsyncThunk';
import {ActiveState} from 'types';

const initialState: ActiveState = {
  active: null,
  actives: [],
  activeTypes: [],
  page: 0,
  activesLength: 0,
  loading: false,
  error: false,
  errorData: null,
};

const activeSlice = createSlice({
  name: 'active',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchActives.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.errorData = null;
        state.actives = [...action.payload];
        //Not actives length, add items per page used on request
        state.activesLength = state.actives.length;
      })
      .addCase(fetchActives.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.errorData = null;
      })
      .addCase(fetchActives.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(fetchActive.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.active = action.payload;
      })
      .addCase(fetchActive.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(fetchActive.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(fetchActiveTypes.fulfilled, (state, action) => {
        console.log(action.payload);
        state.activeTypes = [...action.payload];
        state.loading = false;
        state.error = false;
      })
      .addCase(fetchActiveTypes.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(fetchActiveTypes.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  },
});

export default activeSlice.reducer;
