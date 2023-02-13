import Cookies from "js-cookie";
import * as ApiConstant  from "../const/api.const";

export const hasLogin = () => Boolean(Cookies.get(ApiConstant.KEY_TOKEN));
export const handlingLogin = data => {
  Cookies.set(ApiConstant.KEY_TOKEN, data.access_token);
  Cookies.set(ApiConstant.ROLE_ID, data.role);
  Cookies.set(ApiConstant.USER_ID, data.user_id);
  Cookies.set(ApiConstant.USER_NAME, data.name);
};

