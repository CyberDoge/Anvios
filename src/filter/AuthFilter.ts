import Filter from "./Filter";
import SessionModel from "../session/SessionModel";
import NotAuthUserError from "../error/NotAuthUserError";
import {AUTH, REG_ACCOUNT, REG_ANON} from "../const/RoutePathConst";
import User from "../model/User";
import {AlreadyRegisteredError} from "../error/AlreadyRegisteredError";


export default class AuthFilter implements Filter {
    async doFilter(path: string, session: SessionModel): Promise<void | never> {
        if (path !== AUTH && path !== REG_ANON && path !== REG_ACCOUNT && !session.userId) {
            throw new NotAuthUserError();
        } else if (path === REG_ACCOUNT && session.userId) {
            const user = await User.findById(session.userId).exec();
            if (user?.login) {
                throw new AlreadyRegisteredError()
            }
        }
    }
}