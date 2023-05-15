import * as Utils from "../utils/index";

export default function user({next}) {
    if (Utils.isUser() || Utils.isManager()) {
        return next();
    }
}