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
      .addCase(createMediaObject.fulfilled, (state, action) => {
        state.image = action.payload;
        state.error = false;
        state.loading = false;
      })
      .addCase(createMediaObject.pending, (state) => {
        state.error = false;
        state.loading = true;
        state.errorData = null;
      })
      .addCase(createMediaObject.rejected, (state) => {
        state.error = true;
        state.loading = false;
      });
  },
});

export default MediaObjectSlice;
