import {combineReducers} from 'redux';

import user from './user';
import customAlert from './customAlert';
export default combineReducers({
  user: user,
  customAlert: customAlert,
});
