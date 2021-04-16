import AuthApi from 'api/authApi';
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {setToken, setRefreshToken} from './utils';

export interface Credentials {
  username: string;
  password: string;
}

export type Token = string;

export interface Response {
  token: string;
  refreshToken: string;
}

interface Status {
  isFetching: boolean;
  isSuccess: boolean;
  isError: boolean;
  error: {
    code: string | undefined;
    message: string | undefined;
  } | null;
}

export interface AuthState extends Status {
  token: string | null;
  status: 'signIn' | 'signOut' | null;
}

export const initialState = {
  token: null,
  status: null,
  isFetching: false,
  isSuccess: false,
  error: null,
} as AuthState;

const fetchToken = createAsyncThunk(
  'auth/fetchToken',
  async (credentials: Credentials, thunkAPI) => {
    try {
      const response = await AuthApi.fetchToken(credentials);
      if (response.status === 200) {
        setToken(response.data.token);
        setRefreshToken(response.data.token);
        return response.data;
      }
      return thunkAPI.rejectWithValue(response.data);
    } catch (e) {
      return thunkAPI.rejectWithValue(e.response.data);
    }
  },
);

const fetchRefreshToken = createAsyncThunk(
  'auth/fetchRefreshToken',
  async (refreshToken: string, thunkAPI) => {
    try {
      const response = await AuthApi.fetchRefreshToken(refreshToken);
      if (response.status === 200) {
        setToken(response.data.token);
        return response.data.token;
      }
      return thunkAPI.rejectWithValue(response.data);
    } catch (e) {
      return thunkAPI.rejectWithValue(e.response.data);
    }
  },
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signOut(state) {
      state = initialState;
      return state;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchToken.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.isFetching = false;
        state.isSuccess = true;
      })
      .addCase(fetchToken.pending, (state) => {
        state.isFetching = false;
      })
      .addCase(fetchToken.rejected, (state, action) => {
        state.isFetching = false;
        state.isError = true;
        state.error = {
          code: action.error?.code,
          message: action.error?.message,
        };
      })
      .addCase(fetchRefreshToken.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.isFetching = false;
        state.isSuccess = true;
      })
      .addCase(fetchRefreshToken.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(fetchRefreshToken.rejected, (state, action) => {
        state.isFetching = false;
        state.isError = true;
        state.error = {
          code: action.error?.code,
          message: action.error?.message,
        };
      });
  },
});

export const authReducer = authSlice.reducer;
export const authActions = authSlice.actions;
export default authSlice;
