import {createSlice} from '@reduxjs/toolkit';
import {MediaObjectState} from 'types';
import {createMediaObject} from './mediaObjectAsyncThunk';
const initialState = {
  loading: false,
  error: false,
  image: null,
  errorData: null,
} as MediaObjectState;

const MediaObjectSlice = createSlice({
  name: 'mediaObjects',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createMediaObject.fulfilled, (state) => {
        state.error = false;
        state.loading = false;
      })
      .addCase(createMediaObject.pending, (state) => {
        state.error = false;
        state.loading = true;
        state.errorData = null;
      })
      .addCase(createMediaObject.rejected, (state, action) => {
        state.error = true;
        state.loading = false;
        if (action.payload) {
          state.errorData = action.payload;
        }
      });
  },
});

export default MediaObjectSlice;
