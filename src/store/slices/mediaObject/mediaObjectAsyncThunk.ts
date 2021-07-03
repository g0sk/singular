import {createAsyncThunk} from '@reduxjs/toolkit';
import MediaObjectApi from 'api/mediaApi';
import {File, ParsedImage} from 'types';

export const createMediaObject = createAsyncThunk<File, ParsedImage, {}>(
  'mediaObject/createMediaObject',
  async (image) => {
    try {
      const response = await MediaObjectApi.createMediaImage(
        image?.uri ? image.uri : '',
      );
      if (response.status === 200) {
        console.log(response.data);
        return response.data;
      }
    } catch (error) {
      throw error;
    }
  },
);
