import {
  createSlice,
  createAsyncThunk,
  isRejectedWithValue,
} from '@reduxjs/toolkit';
import UserApi from 'api/userApi';

interface User {
  id: number;
  username: string;
  name: string;
  lastName: string;
  email: string;
}

interface UserState {
  loading: boolean;
  error: boolean;
  user: User | null;
}

const initialState = {
  loading: false,
  error: false,
  user: null,
} as UserState;

export const fetchUser = createAsyncThunk(
  'user/fetchUser',
  async (userID: number = 1) => {
    try {
      const response = await UserApi.getUser(userID);
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      return isRejectedWithValue(error);
    }
  },
);

const userSlice = createSlice({
  name: 'users',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.error = false;
        state.loading = false;
        state.user = {
          id: action.payload.user.id,
          username: action.payload.user.username,
          name: action.payload.user.name,
          lastName: action.payload.user.lastName,
          email: action.payload.user.email,
        };
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
