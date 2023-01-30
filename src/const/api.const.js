const BASE_URL = "http://192.168.1.165:8080/";

const HEADER_DEFAULT = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

const TIMEOUT = 300000;

const STT_OK = 200;
const STT_BAD_REQUEST = 400;
const STT_UNAUTHORIZED = 401;
const STT_FORBIDDEN = 403;
const STT_NOT_FOUND = 404;
const STT_INTERNAL_SERVER = 500;
const STT_DUPLICATE_MESSAGE = 700;
const STT_MAINTAIN = 503;

export const USER_API = "api/user";
export const LOGIN_PAGE = "auth/login";
export const CREATE_USER_LOGIN = "auth/signup";
export const DELETE_USER = "user";
export const CHANGE_PASSWORD = "user/change-password";
export const EDIT_USER = "user/{0}";
export const GET_HISTORY = "user-activity";
export const GET_USER_LOGIN = "user/list";
export const RESET_PASSWORD = "user/reset-password/{0}";

export {
  BASE_URL,
  HEADER_DEFAULT,
  TIMEOUT,
  STT_OK,
  STT_BAD_REQUEST,
  STT_UNAUTHORIZED,
  STT_NOT_FOUND,
  STT_FORBIDDEN,
  STT_INTERNAL_SERVER,
  STT_DUPLICATE_MESSAGE,
  STT_MAINTAIN,
};
