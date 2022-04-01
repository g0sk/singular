import activeReducer from './active/activeSlice';
import userReducer from './user/userSlice';
import authReducer from 'core/auth/authSlice';
import mediaObjectReducer from './mediaObject/mediaObjectSlice';
import recordReducer from './record/recordSlice';
import activeTypeReducer from './activeType/activeTypeSlice';
import unitReducer from './unit/unitSlice';
import customAttributeReducer from './customAttribute/customAttributeSlice';
import basicAttributeReducer from './basicAttribute/basicAttributeSlice';
import tagReducer from './tag/tagSlice';

export default {
  authReducer,
  activeReducer,
  userReducer,
  mediaObjectReducer,
  recordReducer,
  activeTypeReducer,
  unitReducer,
  customAttributeReducer,
  basicAttributeReducer,
  tagReducer,
};
