import {createSlice} from '@reduxjs/toolkit';
import {fetchActives} from './activeAsyncThunk';
import {ActiveState} from '../../../../types';

const initialState: ActiveState = {
  active: null,
  actives: null,
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
        state.actives = action.payload;
      })
      .addCase(fetchActives.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.errorData = null;
      })
      .addCase(fetchActives.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  },
});

export default activeSlice.reducer;
