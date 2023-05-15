import * as Utils from "../utils/index";

export default function manager({next}) {
    if (Utils.isManager()) {
        console.log("Đây là tài khoản manager")
        return next();
    }
}