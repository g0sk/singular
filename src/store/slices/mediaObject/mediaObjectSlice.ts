import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {MediaObjectPayload, MediaObjectState} from 'types';
import {createMediaObject, fetchMediaObject} from './mediaObjectAsyncThunk';
const initialState = {
  image: null,
  loading: false,
  error: false,
  errorData: null,
} as MediaObjectState;

const MediaObjectSlice = createSlice({
  name: 'mediaObjects',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        createMediaObject.fulfilled,
        (state, action: PayloadAction<MediaObjectPayload>) => {
          state.image = action.payload;
          state.error = false;
          state.loading = false;
        },
      )
      .addCase(createMediaObject.pending, (state) => {
        state.error = false;
        state.loading = true;
        state.errorData = null;
      })
      .addCase(createMediaObject.rejected, (state) => {
        state.error = true;
        state.loading = false;
      })
      .addCase(fetchMediaObject.fulfilled, (state, action) => {
        state.image = action.payload;
        state.loading = false;
        state.error = false;
      })
      .addCase(fetchMediaObject.pending, (state) => {
        state.error = false;
        state.loading = true;
        state.errorData = null;
      })
      .addCase(fetchMediaObject.rejected, (state) => {
        state.error = true;
        state.loading = false;
      });
  },
});

export default MediaObjectSlice.reducer;
