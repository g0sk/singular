import {createSlice} from '@reduxjs/toolkit';
import {
  createActive,
  //deleteActive,
  updateActive,
  fetchActives,
  fetchActive,
} from './activeAsyncThunk';
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
    clearActive: (state) => {
      state.active = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchActives.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.errorData = null;
        state.actives = [...action.payload];
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
        state.active = action.payload;
        state.loading = false;
        state.error = false;
      })
      .addCase(fetchActive.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(fetchActive.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(createActive.fulfilled, (state, action) => {
        state.active = action.payload;
        state.loading = false;
        state.error = false;
      })
      .addCase(createActive.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(createActive.rejected, (state) => {
        state.error = true;
        state.loading = false;
      })
      .addCase(updateActive.fulfilled, (state, action) => {
        state.active = {...action.payload};
        state.loading = false;
        state.error = false;
      })
      .addCase(updateActive.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(updateActive.rejected, (state) => {
        state.error = true;
        state.loading = false;
      });
  },
});

export default activeSlice.reducer;
export const {clearActive} = activeSlice.actions;
