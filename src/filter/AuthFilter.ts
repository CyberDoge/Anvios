import SessionModel from "../session/SessionModel";
import NotAuthUserError from "../error/NotAuthUserError";
import {CREDENTIAL_AUTH, REG_ACCOUNT, REG_ANON} from "../const/RoutePathAndTypeConst";
import User from "../model/User";
import {AlreadyRegisteredError} from "../error";
import {Filter} from "./Filter";
import PrimaryRequest from "../dto/PrimaryRequest";


export class AuthFilter implements Filter {
    async doFilter({routePath}: PrimaryRequest<any>, session: SessionModel): Promise<void | never> {
        if (routePath !== CREDENTIAL_AUTH && routePath !== REG_ANON && routePath !== REG_ACCOUNT && !session.userId) {
            throw new NotAuthUserError();
        } else if (routePath === REG_ACCOUNT && session.userId) {
            const user = await User.findById(session.userId).exec();
            if (user?.login) {
                throw new AlreadyRegisteredError()
            }
        }
    }
}