import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import AuthApi from 'api/authApi';
import {
  AuthState,
  AuthResponse,
  Credentials,
  RefreshTokenResponse,
  ErrorData,
} from 'types';

const initialState = {
  token: null,
  refreshToken: null,
  loading: false,
  error: false,
  errorData: null,
  userID: null,
} as AuthState;

export const fetchToken = createAsyncThunk<
  AuthResponse,
  Credentials,
  {rejectValue: ErrorData}
>('auth/fetchToken', async (credentials: Credentials, {rejectWithValue}) => {
  try {
    const response = await AuthApi.fetchToken(credentials);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    return rejectWithValue(error as ErrorData);
  }
});

export const fetchRefreshToken = createAsyncThunk<
  RefreshTokenResponse,
  string,
  {rejectValue: ErrorData}
>('auth/fetchRefreshToken', async (refreshToken: string, {rejectWithValue}) => {
  try {
    const response = await AuthApi.fetchRefreshToken(refreshToken);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    return rejectWithValue(error as ErrorData);
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    logOut: (state) => {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchToken.fulfilled, (state, action) => {
        state.error = false;
        state.errorData = null;
        state.loading = false;
        state.token = action.payload.token;
        state.refreshToken = action.payload.refresh_token;
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
      .addCase(fetchRefreshToken.rejected, (state, action) => {
        state.error = true;
        state.loading = false;
        if (action.payload) {
          state.errorData = action.payload;
        }
      });
  },
});
export const {logOut} = authSlice.actions;
export default authSlice.reducer;
