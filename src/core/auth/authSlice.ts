import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import AuthApi, {Credentials} from 'api/authApi';
import {setToken, setRefreshToken} from 'core/auth/utils';

type AuthState = {
  userID: number;
  token: string | null;
  refreshToken: string | null;
  loading: boolean;
  error: boolean;
  errorData: ErrorData | null;
};

type AuthResponse = {
  token: string;
  user_data: {
    id: number;
    username: string;
  };
  refreshToken: string;
};

type RefreshTokenResponse = {
  token: string;
  refresh_token: string;
};

type ErrorData = {
  code: number;
  message: string;
} | null;

const initialState = {
  token: null,
  refreshToken: null,
  loading: false,
  error: false,
  errorData: null,
} as AuthState;

export const fetchToken = createAsyncThunk<
  AuthResponse,
  Credentials,
  {rejectValue: ErrorData}
>('auth/fetchToken', async (credentials: Credentials, thunkApi) => {
  try {
    const response = await AuthApi.fetchToken(credentials);
    if (response.status === 200) {
      setToken(response.data.token);
      setRefreshToken(response.data.refresh_token);
      return response.data;
    }
  } catch (error) {
    if (!error) {
      throw error;
    }
    return thunkApi.rejectWithValue(error);
  }
});

export const fetchRefreshToken = createAsyncThunk<
  RefreshTokenResponse,
  string,
  {rejectValue: ErrorData}
>('auth/fetchRefreshToken', async (refreshToken: string) => {
  try {
    const response = await AuthApi.fetchRefreshToken(refreshToken);
    if (response.status === 200) {
      setToken(response.data.token);
      setRefreshToken(response.data.refresh_token);
      return response.data;
    }
  } catch (error) {
    throw error;
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchToken.fulfilled, (state, action) => {
        state.error = false;
        state.errorData = null;
        state.loading = false;
        state.token = action.payload.token;
        state.userID = action.payload.user_data.id;
      })
      .addCase(fetchToken.pending, (state) => {
        state.error = false;
        state.errorData = null;
        state.loading = true;
      })
      .addCase(fetchToken.rejected, (state, action) => {
        state.error = true;
        state.loading = false;
        if (action.payload) {
          state.errorData = action.payload;
        }
      })
      .addCase(fetchRefreshToken.fulfilled, (state, action) => {
        state.error = false;
        state.loading = false;
        state.token = action.payload.token;
        state.refreshToken = action.payload.refresh_token;
      })
      .addCase(fetchRefreshToken.pending, (state) => {
        state.error = false;
        state.loading = true;
      })
      .addCase(fetchRefreshToken.rejected, (state) => {
        state.error = true;
        state.loading = false;
      });
  },
});

export default authSlice.reducer;
