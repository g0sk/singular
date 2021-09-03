import {updateUser} from 'store/slices/user/userAsyncThunk';
import {createSlice} from '@reduxjs/toolkit';
import {fetchUser} from './userAsyncThunk';
import {UserState} from 'types';

const initialState = {
  loading: false,
  error: false,
  user: null,
} as UserState;

const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.error = false;
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(fetchUser.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.error = false;
        state.loading = false;
      })
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(updateUser.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  },
});

export default userSlice.reducer;
