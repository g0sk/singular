import {
  createSlice,
  createAsyncThunk,
  isRejectedWithValue,
} from '@reduxjs/toolkit';
import AuthApi, {Credentials} from 'api/authApi';
import {setToken, setRefreshToken} from 'core/auth/utils';

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
    try {
      const response = await AuthApi.fetchToken(credentials);
      if (response.status === 200) {
        setToken(response.data.token);
        setRefreshToken(response.data.refresh_token);
        return response.data;
      }
    } catch (error) {
      return isRejectedWithValue(error);
    }
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
