import SessionModel from "../session/SessionModel";

import LoginRequest from "../dto/LoginRequest";
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

export async function regAccount(loginData: LoginRequest, session: SessionModel): Promise<void> {
    const user = (await regUser(loginData));
    if (!user) {
        throw new InternalServerError();
    }
    session.userId = user._id;
    session.sendResponse(new PrimaryResponse({token: user.token}));
}