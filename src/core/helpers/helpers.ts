import apiURL from 'api/api';
import {AxiosRequestConfig, AxiosResponse, AxiosError} from 'axios';
import {getToken, getRefreshToken} from 'core/auth/utils';

type Token = string | null;

async function getLocalToken() {
  return await getToken();
}

export function initialize() {
  //Intercept request before is sent
  apiURL.interceptors.request.use(
    (config: AxiosRequestConfig): AxiosRequestConfig => {
      const token = getLocalToken();
      if (token !== null) {
        config.headers.Authorization = 'Bearer ' + token;
      }
      return config;
    },
    (error: AxiosError): Promise<AxiosError> => {
      return Promise.reject(error);
    },
  );
  //Intercept response before is received
  apiURL.interceptors.response.use(
    (res: AxiosResponse) => {
      return res;
    },
    async (error: AxiosError) => {
      const {config, response} = error;
      if (!response?.status) {
        return Promise.reject(error);
      }
      try {
        const refreshToken = await getRefreshToken();
        if (response.status === 401 && refreshToken !== null) {
          let originalRequest = config;
          let originalPath = originalRequest.url?.replace(
            typeof originalRequest.baseURL === 'string'
              ? originalRequest.baseURL
              : '',
            '',
          );
          if (
            originalPath === '/api/authentication_token' ||
            originalPath === '/api/refresh_token'
          ) {
            return Promise.reject(error);
          }
        }
      } catch (e) {}
    },
  );
}
