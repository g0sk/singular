import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
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
  async (userID: number) => {
    try {
      const response = await UserApi.getUser(userID);
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      throw error;
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
          id: action.payload.id,
          username: action.payload.username,
          name: action.payload.name,
          lastName: action.payload.lastName,
          email: action.payload.email,
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
