//** Auth Types */
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
