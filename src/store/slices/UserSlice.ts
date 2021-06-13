import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import UserApi from 'api/userApi';
import MediaApi from 'api/mediaApi';

interface User {
  id: number;
  username: string;
  name: string;
  lastName: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
  image?: {
    id: number;
    contentUrl: string;
  };
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

export const fetchUserImage = createAsyncThunk(
  'user/fetchUserImage',
  async (contentUrl: string) => {
    try {
      const response = await MediaApi.getMediaImage(contentUrl);
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      throw error;
    }
  },
);

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
