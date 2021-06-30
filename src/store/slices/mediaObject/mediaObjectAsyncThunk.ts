import {createAsyncThunk} from '@reduxjs/toolkit';
import MediaObjectApi from 'api/mediaApi';
import {ErrorData, File} from 'types';

export const createMediaObject = createAsyncThunk<
  File,
  string,
  {rejectValue: ErrorData}
>('mediaObject/createMediaObject', async (contentUrl, {rejectWithValue}) => {
  try {
    const response = await MediaObjectApi.createMediaImage(contentUrl);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    return rejectWithValue(error);
  }
});
