import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {
  configureStore,
  combineReducers,
  Reducer,
  AnyAction,
} from '@reduxjs/toolkit';
import Reducers from './slices';

const combinedReducers = combineReducers({
  auth: Reducers.authReducer,
  user: Reducers.userReducer,
  active: Reducers.activeReducer,
  mediaObject: Reducers.mediaObjectReducer,
  record: Reducers.recordReducer,
});

const rootReducer: Reducer = (state: RootState, action: AnyAction) => {
  //Reset store on logOut
  if (action.type === 'auth/logOut') {
    return combinedReducers(undefined, action);
  }
  return combinedReducers(state, action);
};

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export default store;
