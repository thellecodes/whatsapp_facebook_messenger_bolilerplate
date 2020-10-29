//** Amazon Auth Types */
export const USER_LOADING = 'USER_LOADING';
export const USER_LOADED = 'USER_LOADED';
export const AUTH_ERROR = 'AUTH_ERROR';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAIL = 'LOGIN_FAIL';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const REG_LOADING = 'REG_LOADING';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAIL = 'REGISTER_FAIL';
export const LOG_LOADING = 'LOG_LOADING';

//** Chat Actions */
export const ALL_USERS = 'ALL_USERS';
export const ACTIVE_ROOM = 'ACTIVE_ROOM';
export const ACTIVE_USER = 'ACTIVE_USER';
export const ADD_MESSAGE = 'ADD_MESSAGE';
export const INJECT_MESSAGE = 'INJECT_MESSAGE';
export const LOAD_MESSAGES = 'LOAD_MESSAGES';
export const ACTIVE_ROOM_MSGS = 'ACTIVE_ROOM_MSGS';
export const CLEAR_ACTIVE_MSGS = 'CLEAR_ACTIVE_MSGS';

//** Error Types */
export const GET_ERRORS = 'GET_ERRORS';
export const CLEAR_ERRORS = 'CLEAR_ERRORS';

//** Dispatch Props */
export type AllDispatchProp = (arg0: {
  type: string;
  payload: any | void;
}) => void;

//** Action Props */
export type ActionProps = {
  type: any;
  payload: any | void;
};

//**  URI */
export const API_URI = `http://192.168.254.243:5000`;
