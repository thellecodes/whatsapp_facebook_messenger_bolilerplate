import {combineReducers} from 'redux';
import authReducer from './authReducer';
import chatReducer from './chatReducer';
import errorReducer from './errorReducer';

export default combineReducers({
  auth: authReducer,
  err: errorReducer,
  chat: chatReducer,
});
