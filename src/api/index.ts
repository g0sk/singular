import axios from 'axios';
import {API_URL} from '@env';

export const apiURL = axios.create({
  baseURL: API_URL,
  headers: {
    // eslint-disable-next-line prettier/prettier
    'Host': '13.37.40.182',
    'Content-Type': 'application/json',
  },
});
