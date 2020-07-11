import Filter from "./Filter";
import SessionModel from "../session/SessionModel";
import NotAuthUserError from "../error/NotAuthUserExcpetion";
import {AUTH} from "../const/RoutePathConst";

export default class AuthFilter implements Filter {
    doFilter(path: string, session: SessionModel): void {
        if (path !== AUTH && !session.userId) {
            throw new NotAuthUserError();
        }
    }

}