import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {configureStore, combineReducers} from '@reduxjs/toolkit';
import authReducer from 'core/auth/authSlice';
import userSlice from './slices/UserSlice';

//Flipper app debugger
//const createDebugger = require('redux-flipper').default;
const rootReducer = combineReducers({
  auth: authReducer,
  users: userSlice,
});

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export default store;
