import {createSlice} from '@reduxjs/toolkit';
import {
  createActive,
  //deleteActive,
  updateActive,
  fetchActives,
  fetchActive,
  fetchFilteredActive,
} from './activeAsyncThunk';
import {ActiveState} from 'types';

const initialState: ActiveState = {
  active: null,
  actives: [],
  page: 1,
  activesLength: 0,
  itemsPerPage: 7,
  loading: false,
  error: false,
  errorData: null,
};

const activeSlice = createSlice({
  name: 'active',
  initialState,
  reducers: {
    resetActiveState: (state) => {
      state.active = null;
      state.actives = [];
      state.page = 1;
      state.activesLength = 0;
    },
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
        state.actives = state.actives.concat(action.payload);
        state.activesLength += action.payload.length;
        state.page += 1;
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
      .addCase(fetchFilteredActive.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.errorData = null;
        state.active = action.payload[0];
        state.activesLength += action.payload.length;
        state.page += 1;
      })
      .addCase(fetchFilteredActive.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.errorData = null;
      })
      .addCase(fetchFilteredActive.rejected, (state) => {
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
      .addCase(createActive.rejected, (state, action) => {
        state.error = true;
        state.loading = false;
        if (action.payload) {
          state.errorData = {...action.payload};
        }
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
      .addCase(updateActive.rejected, (state, action) => {
        state.error = true;
        state.loading = false;
        if (action.payload) {
          state.errorData = {...action.payload};
        }
      });
  },
});

export default activeSlice.reducer;
export const {resetActiveState, clearActive} = activeSlice.actions;
