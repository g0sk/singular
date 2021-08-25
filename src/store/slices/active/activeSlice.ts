import {createSlice} from '@reduxjs/toolkit';
import {fetchActives, fetchActive} from './activeAsyncThunk';
import {ActiveState} from 'types';

const initialState: ActiveState = {
  active: null,
  actives: [],
  page: 0,
  activesLength: 0,
  loading: false,
  error: false,
  errorData: null,
};

const activeSlice = createSlice({
  name: 'active',
  initialState,
  reducers: {
    fetchOctives: (state) => {
      state.actives = [];
    },
  },
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
      });
  },
});

export default activeSlice.reducer;
