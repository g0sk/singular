import {createAsyncThunk} from '@reduxjs/toolkit';
import MediaObjectApi from 'api/mediaApi';
import {ParsedImage} from 'types';

export const createMediaObject = createAsyncThunk(
  'mediaObject/createMediaObject',
  async (image: ParsedImage) => {
    try {
      console.log(image !== undefined);
      const response = await MediaObjectApi.createMediaImage(image);
      console.log('response', response);
      /* if (response.status === 200) {
        console.log(response.data);
        return response.data;
      } */
    } catch (error) {
      throw error;
    }
  },
);
