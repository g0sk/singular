import {createSlice} from '@reduxjs/toolkit';
import {ActiveTypeState} from 'types';
import {
  fetchActiveTypes,
  fetchActiveType,
  createActiveType,
  deleteActiveType,
  updateActiveType,
} from 'store/slices/activeType/activeTypeAsyncThunk';
const initialState: ActiveTypeState = {
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
    clearActiveType: (state) => {
      state.activeType = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchActiveTypes.fulfilled, (state, action) => {
        state.activeTypes = [...action.payload];
        state.activeTypesLength = action.payload.length;
        state.error = false;
        state.loading = false;
      })
      .addCase(fetchActiveTypes.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(fetchActiveTypes.rejected, (state) => {
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
export const {clearActiveType} = activeTypeSlice.actions;
