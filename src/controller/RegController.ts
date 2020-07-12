import SessionModel from "../session/SessionModel";

import LoginData from "../dto/LoginData";
import {regUser, regUserAnonymous} from "../service/RegUserService";
import PrimaryResponse from "../dto/PrimaryResponse";
import {sendError} from "./ErrorController";
import InvalidRegCredentialsError from "../error/InvalidRegCredentialsError";

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

export function regAccount(loginData: LoginData, session: SessionModel) {
    regUser(loginData).then(value => {
        const user = value?.toObject();
        session.userId = user._id;
        session.sendResponse(new PrimaryResponse({token: user.token}));
    }).catch(e => {
        if (e instanceof InvalidRegCredentialsError) {
            sendError(e, session);
        } else {
            // todo normal log
            console.error(e)
        }
    });
}