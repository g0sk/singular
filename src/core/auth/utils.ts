import Sinfo from 'react-native-sensitive-info';
import {Credentials} from '../../../types';

const TOKEN = 'token';
const REFRESH_TOKEN = 'refreshToken';
const CREDENTIALS = 'credentials';
const keyChainOptions = {
  sharedPreferencesName: 'singularSharedPerfs',
  keyChainService: 'singularKeyChain',
};

interface Items {
  key: string;
  value: string;
}

export async function getItem<T>(key: string): Promise<T | null> {
  const value = await Sinfo.getItem(key, keyChainOptions);
  return value ? JSON.parse(value)?.[key] || null : null;
}

export async function setItem<T>(key: string, value: T): Promise<void> {
  Sinfo.setItem(key, JSON.stringify({[key]: value}), keyChainOptions);
}

export async function removeItem(key: string): Promise<void> {
  Sinfo.deleteItem(key, keyChainOptions);
}

//Token
export const getToken = () => getItem<string>(TOKEN);
export const setToken = (value: string) => setItem<string>(TOKEN, value);
export const removeToken = () => removeItem(TOKEN);

//RefreshToken
export const getRefreshToken = () => getItem<string>(REFRESH_TOKEN);
export const setRefreshToken = (value: string) =>
  setItem<string>(REFRESH_TOKEN, value);
export const removeRefreshToken = () => removeItem(REFRESH_TOKEN);

//Credentials
export const getCredentials = () => getItem<Credentials>(CREDENTIALS);
export const setCredentials = (value: Credentials) =>
  setItem<Credentials>(CREDENTIALS, value);
export const removeCredentials = () => removeItem(CREDENTIALS);
