import {apiURL} from 'api';
import {AxiosRequestConfig, AxiosResponse, AxiosError} from 'axios';
import {getToken, getRefreshToken} from 'core/auth/utils';
import {fetchRefreshToken} from 'core/auth/authSlice';
import store from 'store/configureStore';

type Token = string | null;

export function initialize(): void {
  //Intercept request before is sent, looks for JWT token if its saved on device, else throw error.
  apiURL.interceptors.request.use(
    async (config: AxiosRequestConfig): Promise<AxiosRequestConfig> => {
      try {
        const token = await getToken();
        if (token !== null) {
          config.headers.Authorization = 'Bearer ' + token;
        }
        return config;
      } catch (e) {
        throw e;
      }
    },
    (error: AxiosError): Promise<AxiosError> => {
      return Promise.reject(error);
    },
  );

  /*
    Intercept response before is received. If theres a 200 status
    code on response, it returns the response. If it gets a 401,
    we look on the device for refreshToken, if not found we redirect to login.
  */

  apiURL.interceptors.response.use(
    (res: AxiosResponse) => {
      return res;
    },
    async (error: AxiosError) => {
      if (!error.response) {
        return Promise.reject(error);
      }
      const {config, response} = error;
      const refreshToken: Token = await getRefreshToken();
      if (response.status === 401 && refreshToken === null) {
        return Promise.reject(response.data);
      }
      if (response.status === 401 && refreshToken !== null) {
        let originalRequest = config;
        const originalPath = originalRequest.url?.replace(
          originalRequest.url,
          '',
        );
        if (
          originalPath === '/authentication_token' ||
          originalPath === '/refresh_token'
        ) {
          return Promise.reject(error);
        }
        store.dispatch(fetchRefreshToken(refreshToken)).then(async () => {
          const token = await getToken();
          if (token !== null) {
            originalRequest.headers.Authorization = 'Bearer' + token;
            return apiURL.request(originalRequest);
          }
        });
      }
    },
  );
}
