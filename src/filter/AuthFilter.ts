import Filter from "./Filter";
import SessionModel from "../session/SessionModel";
import NotAuthUserError from "../error/NotAuthUserError";
import {AUTH, REG_ACCOUNT, REG_ANON} from "../const/RoutePathConst";
import User from "../model/User";
import InternalServerError from "../error/InternalServerError";
import {AlreadyRegisteredError} from "../error/AlreadyRegisteredError";
import {handleAndSendError} from "../controller/ErrorController";

export default class AuthFilter implements Filter {
    doFilter(path: string, session: SessionModel): void {
        if (path !== AUTH && path !== REG_ANON && path !== REG_ACCOUNT && !session.userId) {
            throw new NotAuthUserError();

        } else if (path === REG_ACCOUNT && session.userId) {
            User.findById(session.userId).findOne((err, res) => {
                if (err) {
                    // todo normal log
                    console.log(err);
                    handleAndSendError(new InternalServerError(), session);
                }
                if (res?.login) {
                    // todo stop filter chain
                    handleAndSendError(new AlreadyRegisteredError(), session);
                }
            })
        }
    }

}