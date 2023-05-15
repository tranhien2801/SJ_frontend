import Cookies from "js-cookie";
import * as ApiConstant from "../const/api.const";
import * as Data from "../const/data.const"

export const hasLogin = () => Boolean(Cookies.get(ApiConstant.KEY_TOKEN));

export const isAdmin = () => Boolean(Cookies.get(ApiConstant.POWER_ID) == Data.POWER.AdminSystem)

export const isManager = () => Boolean(Cookies.get(ApiConstant.POWER_ID) == Data.POWER.Manager)

export const isUser = () => Boolean(Cookies.get(ApiConstant.POWER_ID) == Data.POWER.User)


export const handlingLogin = data => {
  Cookies.set(ApiConstant.KEY_TOKEN, data.access_token);
  Cookies.set(ApiConstant.POWER_ID, data.power);
  Cookies.set(ApiConstant.USER_ID, data.user_id);
  Cookies.set(ApiConstant.USER_NAME, data.name);
};

export const handlingLogout = () => {
  Cookies.remove(ApiConstant.KEY_TOKEN);
  Cookies.remove(ApiConstant.POWER_ID);
  Cookies.remove(ApiConstant.USER_ID);
  Cookies.remove(ApiConstant.USER_NAME);
}

export const saveInforCrawled = data => {
  Cookies.set(ApiConstant.NUMBER_JUDGMENTS_CRAWLED, data.number_crawled);
  Cookies.set(ApiConstant.DATE_CRAWLED_NEWEST, data.date_crawled);
  Cookies.set(ApiConstant.CRAWLING, false);
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
};

