import * as Utils from "../utils/index";


export default function auth({next}) {
    if (!Utils.hasLogin()) {
        console.log("Chưa đăng nhập...")
        return next({name: "Signin"})
    }
    return next();
}