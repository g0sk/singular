import {createSlice} from '@reduxjs/toolkit';
import {ActiveTypeState} from 'types';
import {
  fetchActiveTypes,
  fetchActiveType,
  createActiveType,
  deleteActiveType,
  updateActiveType,
  fetchFilteredActiveTypes,
} from 'store/slices/activeType/activeTypeAsyncThunk';
const initialState: ActiveTypeState = {
  page: 1,
  itemsPerPage: 9,
  filtered: false,
  activeTypesLength: 0,
  activeType: null,
  activeTypes: [],
  loading: false,
  error: false,
};

export const activeTypeSlice = createSlice({
  name: 'activeType',
  initialState,
  reducers: {
    resetActiveTypeState: (state) => {
      state.activeTypes = [];
      state.page = 1;
      state.activeTypesLength = 0;
      state.activeType = null;
      state.filtered = false;
    },
    clearActiveType: (state) => {
      state.activeType = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchActiveTypes.fulfilled, (state, action) => {
        state.activeTypes = state.activeTypes.concat(action.payload);
        state.activeTypesLength += action.payload.length;
        state.error = false;
        state.loading = false;
        state.page += 1;
      })
      .addCase(fetchActiveTypes.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(fetchActiveTypes.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(fetchFilteredActiveTypes.fulfilled, (state, action) => {
        state.activeTypes = state.activeTypes.concat(action.payload);
        state.activeTypesLength += action.payload.length;
        state.filtered = true;
        state.error = false;
        state.loading = false;
        state.page += 1;
      })
      .addCase(fetchFilteredActiveTypes.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(fetchFilteredActiveTypes.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(fetchActiveType.fulfilled, (state, action) => {
        state.activeType = {...action.payload};
        state.error = false;
        state.loading = false;
      })
      .addCase(fetchActiveType.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(fetchActiveType.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(createActiveType.fulfilled, (state, action) => {
        state.activeType = {...action.payload};
        state.loading = false;
        state.error = false;
      })
      .addCase(createActiveType.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(createActiveType.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(updateActiveType.fulfilled, (state, action) => {
        state.activeType = {...action.payload};
        state.loading = false;
        state.error = false;
      })
      .addCase(updateActiveType.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(updateActiveType.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(deleteActiveType.fulfilled, (state) => {
        state.activeType = null;
        state.loading = false;
        state.error = false;
      })
      .addCase(deleteActiveType.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(deleteActiveType.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  },
});

export default activeTypeSlice.reducer;
export const {resetActiveTypeState, clearActiveType} = activeTypeSlice.actions;
