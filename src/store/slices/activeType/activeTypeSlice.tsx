import {createSlice} from '@reduxjs/toolkit';
import {ActiveTypeState} from 'types';
import {
  fetchActiveTypes,
  fetchActiveType,
  createActiveType,
  deleteActiveType,
  updateActiveType,
  fetchFilteredActiveTypes,
  fetchActiveTypesList,
} from 'store/slices/activeType/activeTypeAsyncThunk';
const initialState: ActiveTypeState = {
  nextPage: 1,
  itemsPerPage: 12,
  filtered: false,
  activeTypesLength: 0,
  activeType: null,
  activeTypes: [],
  activeTypesList: [],
  loading: false,
  error: false,
};

export const activeTypeSlice = createSlice({
  name: 'activeType',
  initialState,
  reducers: {
    resetActiveTypeState: (state) => {
      state.activeTypes = [];
      state.nextPage = 1;
      state.activeTypesList = [];
      state.activeTypesLength = 0;
      //state.activeType = null;
      state.filtered = false;
    },
    clearActiveTypeList: (state) => {
      state.activeTypesList = [];
    },
    clearActiveType: (state) => {
      state.activeType = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchActiveTypes.fulfilled, (state, action) => {
        state.activeTypes = state.activeTypes.concat(action.payload.types);
        state.activeTypesLength += action.payload.count;
        state.error = false;
        state.loading = false;
        state.nextPage = action.payload.page + 1;
      })
      .addCase(fetchActiveTypes.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(fetchActiveTypes.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(fetchActiveTypesList.fulfilled, (state, action) => {
        state.activeTypesList = [...action.payload.types];
        state.error = false;
        state.loading = false;
      })
      .addCase(fetchActiveTypesList.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(fetchActiveTypesList.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(fetchFilteredActiveTypes.fulfilled, (state, action) => {
        state.activeTypes = state.activeTypes.concat(action.payload.types);
        state.activeTypesLength += action.payload.count;
        state.filtered = true;
        state.error = false;
        state.loading = false;
        state.nextPage += action.payload.page + 1;
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
      .addCase(updateActiveType.fulfilled, (state) => {
        //state.activeType = {...action.payload};
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
export const {
  resetActiveTypeState,
  clearActiveType,
  clearActiveTypeList,
} = activeTypeSlice.actions;
