import Sinfo from 'react-native-sensitive-info';

const TOKEN = 'token';
const REFRESH_TOKEN = 'refreshToken';
const USERNAME = 'username';
const PASSWORD = 'password';
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

//Username
export const getUsername = () => getItem<string>(USERNAME);
export const setUsername = (value: string) => setItem<string>(USERNAME, value);
export const removeUsername = () => removeItem(USERNAME);

//Password
export const getPassword = () => getItem<string>(PASSWORD);
export const setPassword = (value: string) => setItem<string>(PASSWORD, value);
export const removePassword = () => removeItem(PASSWORD);
