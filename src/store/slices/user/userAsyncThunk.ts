import {createAsyncThunk} from '@reduxjs/toolkit';
import UserApi from 'api/userApi';
import MediaApi from 'api/mediaApi';

export const fetchUserImage = createAsyncThunk(
  'user/fetchUserImage',
  async (contentUrl: string) => {
    try {
      const response = await MediaApi.getMediaImage(contentUrl);
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      throw error;
    }
  },
);

export const fetchUser = createAsyncThunk(
  'user/fetchUser',
  async (userID: number) => {
    try {
      const response = await UserApi.getUser(userID);
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      throw error;
    }
  },
);
