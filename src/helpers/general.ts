import {apiURL} from 'api';
import {AxiosRequestConfig, AxiosResponse, AxiosError} from 'axios';
import {getCredentials} from 'core/auth/utils';
import {fetchToken, fetchRefreshToken} from 'core/auth/authSlice';
import store from 'store/configureStore';

export function initialize(): void {
  //Intercept request before is sent, looks for JWT token if its saved on device, else throw error.
  apiURL.interceptors.request.use(
    async (config: AxiosRequestConfig): Promise<AxiosRequestConfig> => {
      try {
        const token = store.getState().auth.token;
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
      const credentials = await getCredentials();
      const {refreshToken} = store.getState().auth;
      //401
      if (response.status === 401) {
        if (refreshToken === null) {
          //Invalid Credentials
          //Return {code, message} to display message on screen
          return Promise.reject(response.data);
        } else {
          //Expired tokens, need to fetch new ones
          let originalRequest = config;
          const originalPath = originalRequest.url?.replace(
            originalRequest.url,
            '',
          );
          if (
            originalPath === '/authentication_token' ||
            originalPath === '/refresh_token'
          ) {
            //If we have credentials we fetch new tokens
            if (credentials !== null) {
              store.dispatch(fetchToken(credentials));
              const {token} = store.getState().auth;
              if (token !== null) {
                originalRequest.headers.Authorization = 'Bearer' + token;
                return apiURL.request(originalRequest);
              }
              return Promise.reject(error.response);
            } else {
              return Promise.reject(error.response);
            }
          } else {
            const refresh_token = store.getState().auth.refreshToken;
            if (refresh_token !== null) {
              store.dispatch(fetchRefreshToken(refresh_token));
              const newToken = store.getState().auth.token;
              if (newToken) {
                originalRequest.headers.Authorization = 'Bearer' + newToken;
                return apiURL.request(originalRequest);
              }
            }
          }
        }
      }
    },
  );
}
