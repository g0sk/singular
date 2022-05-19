import {createAsyncThunk} from '@reduxjs/toolkit';
import MediaObjectApi from 'api/mediaApi';
import {ParsedImage, MediaObjectPayload} from 'types';

export const createMediaObject = createAsyncThunk<
  MediaObjectPayload,
  ParsedImage,
  {}
>('mediaObject/createMediaObject', async (image) => {
  try {
    const response = await MediaObjectApi.createMediaImage(image);
    if (response.status === 201) {
      return response.data;
    }
  } catch (error) {
    throw error;
  }
});

export const fetchMediaObject = createAsyncThunk(
  'user/fetchUserImage',
  async (contentUrl: string) => {
    try {
      const response = await MediaObjectApi.getMediaImage(contentUrl);
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      throw error;
    }
  },
);
