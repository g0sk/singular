import apiURL from './api';

interface Credentials {
  username: string;
  password: string;
}

const fetchToken = (credentials: Credentials) =>
  apiURL.post('/authentication_token', credentials);
const fetchRefreshToken = (refresh_token: string) =>
  apiURL.post('/refresh_token', refresh_token);

export default {
  fetchToken,
  fetchRefreshToken,
};
