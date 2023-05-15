import * as Utils from "../utils/index";

export default function adminOrManager({next}) {
    if (Utils.isAdmin() || Utils.isManager()) {
        return next();
    }
}