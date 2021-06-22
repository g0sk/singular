import {apiURL} from './index';
import {Credentials} from 'types';
type Token = string;

const fetchToken = (credentials: Credentials) =>
  apiURL.post('/authentication_token', {
    username: credentials.username,
    password: credentials.password,
  });

const fetchRefreshToken = (refresh_token: string) =>
  apiURL.post('/refresh_token', refresh_token);

export default {
  fetchToken,
  fetchRefreshToken,
};
