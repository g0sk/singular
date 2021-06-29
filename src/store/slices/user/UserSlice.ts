import {createSlice} from '@reduxjs/toolkit';
import {fetchUser} from './userAsyncThunk';
import {UserState} from 'types';

const initialState = {
  loading: false,
  error: false,
  user: null,
} as UserState;

const userSlice = createSlice({
  name: 'users',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.fulfilled, (state, action) => {
        console.log(action.payload);
        state.error = false;
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchUser.pending, (state) => {
        state.error = false;
        state.loading = true;
      })
      .addCase(fetchUser.rejected, (state) => {
        state.error = true;
        state.loading = false;
      });
  },
});

export default userSlice.reducer;
