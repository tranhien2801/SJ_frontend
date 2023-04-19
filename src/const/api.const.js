const BASE_URL = "http://192.168.1.250:8000/";
export const BASE_URL_SEARCH = "http://localhost:5000/"

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
export const EDIT_USER = "user/";
export const GET_HISTORY = "user-activity";
export const GET_USER_LIST = "user/list";
export const RESET_PASSWORD = "user/reset-password/{0}";
export const GET_JUDGMENT_LIST = "judgment/list";
export const GET_JUDGMENT = "judgment/";
export const GET_MANAGER_LIST = "user/managers";
export const GET_UNIT_LIST = "unit/list";
export const GET_CASE_TYPE_LIST = "case-type/list";
export const GET_COURT_LIST = "court/list";
export const GET_COURT_LEVEL_LIST = "court/court-level";
export const GET_JUDGMENT_LEVEL_LIST = "judgment/judgment-level"
export const LIKED_JUDGMENT = 'judgment/liked';
export const REPORT_JUDGMENT_ERROR = "judgment/error";
export const SEND_EMAIL_CONFIRM = "sendMail";
export const GET_JUDGMENT_RECOMMENDED = "recommendation?content=";
export const SEARCH_JUDGMENT_BM25 = "judgment/bm25";


export const KEY_TOKEN = "accessToken";
export const ROLE_ID = "role";
export const USER_ID = "user_id";
export const USER_NAME = "userName";

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
