import axios from 'axios';
import {API_URL} from '@env';

export const apiURL = axios.create({
  baseURL: API_URL,
});
