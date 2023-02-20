import Cookies from "js-cookie";
import * as ApiConstant from "../const/api.const";

export const hasLogin = () => Boolean(Cookies.get(ApiConstant.KEY_TOKEN));
export const handlingLogin = data => {
  Cookies.set(ApiConstant.KEY_TOKEN, data.access_token);
  Cookies.set(ApiConstant.ROLE_ID, data.role);
  Cookies.set(ApiConstant.USER_ID, data.user_id);
  Cookies.set(ApiConstant.USER_NAME, data.name);
};

export const handlingLogout = () => {
  Cookies.remove(ApiConstant.KEY_TOKEN);
  Cookies.remove(ApiConstant.ROLE_ID);
  Cookies.remove(ApiConstant.USER_ID);
  Cookies.remove(ApiConstant.USER_NAME);
}

export const formatResponseError = error => {
  var mess = error.response.data.error;
  if (mess == null) return error.response.data.message;
  if (mess.email != null) {
    return mess.email[0];
  }
  if (mess.password != null) {
    return mess.password[0];
  }
  if (mess.currentPassword != null) {
    return mess.currentPassword[0];
  }
  if (mess.newPassword != null) {
    return mess.newPassword[0];
  }
  if (mess.reNewPassword != null) {
    return mess.reNewPassword[0];
  }
  return mess;
}
