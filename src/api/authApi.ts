import apiURL from './api';

type Token = string;

type Response = {
  token: Token;
  refreshToken: Token;
};

export type Credentials = {
  username: string;
  password: string;
};

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
