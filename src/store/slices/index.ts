import activeReducer from './active/activeSlice';
import userReducer from './user/userSlice';
import authReducer from 'core/auth/authSlice';
import mediaObjectReducer from './mediaObject/mediaObjectSlice';
import recordReducer from './record/recordSlice';
export default {
  authReducer,
  activeReducer,
  userReducer,
  mediaObjectReducer,
  recordReducer,
};
