import SessionModel from "../session/SessionModel";

import LoginData from "../dto/LoginData";
import {regUser, regUserAnonymous} from "../service/RegUserService";
import PrimaryResponse from "../dto/PrimaryResponse";
import {sendError} from "./ErrorController";
import InternalServerError from "../error/InternalServerError";

export function regAnonymous(session: SessionModel) {
    regUserAnonymous().then(value => {
        if (value) {
            session.userId = value._id;
            session.sendResponse(new PrimaryResponse({token: value.token}));
        }
    }).catch(e => {
        sendError(e, session);
    });
}

export async function regAccount(loginData: LoginData, session: SessionModel): Promise<void> {
    const user = (await regUser(loginData))?.toObject();
    if (!user) {
        throw new InternalServerError();
    }
    session.userId = user._id;
    session.sendResponse(new PrimaryResponse({token: user.token}));
}