import * as Utils from "../utils/index";

export default function admin({next}) {
    if (Utils.isAdmin()) {
        console.log("Đây là tài khoản admin")
        return next();
    }
}