import {useDispatch} from 'react-redux';
import {configureStore} from '@reduxjs/toolkit';
import {authReducer} from '../core/auth/authSlice';

//Flipper app debugger
//const createDebugger = require('redux-flipper').default;

const store = configureStore({
  reducer: {
    authReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export default store;
