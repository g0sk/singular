import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import AuthApi, {Credentials} from 'api/authApi';

type Token = string | undefined;

type AuthState = {
  token: Token;
  refreshToken: Token;
  loading: boolean;
  error: boolean;
};

const initialState = {
  token: undefined,
  refreshToken: undefined,
  loading: false,
  error: false,
} as AuthState;

export const fetchToken = createAsyncThunk(
  'auth/fetchToken',
  async (credentials: Credentials) => {
    const response = await AuthApi.fetchToken(credentials);
    return response.data;
  },
);

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchToken.fulfilled, (state, action) => {
        state.error = false;
        state.loading = false;
        state.token = action.payload?.token;
      })
      .addCase(fetchToken.pending, (state) => {
        state.error = false;
        state.loading = true;
      })
      .addCase(fetchToken.rejected, (state) => {
        state.error = true;
        state.loading = false;
      });
  },
});

export default authSlice.reducer;
