import Filter from "./Filter";
import SessionModel from "../session/SessionModel";
import NotAuthUserError from "../error/NotAuthUserError";
import {AUTH, REG_ACCOUNT, REG_ANON} from "../const/RoutePathConst";

export default class AuthFilter implements Filter {
    doFilter(path: string, session: SessionModel): void {
        if (path !== AUTH && path !== REG_ANON && path !== REG_ACCOUNT && !session.userId) {
            throw new NotAuthUserError();
        } else if (session.userId && path !== REG_ACCOUNT) {
            // todo custom error
            throw new Error("User already authenticated")
        }
    }

}