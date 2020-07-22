import SessionModel from "../session/SessionModel";

import LoginRequest from "../dto/LoginRequest";
import {regUser, regUserAnonymous} from "../service/RegUserService";
import PrimaryResponse from "../dto/PrimaryResponse";
import {sendError} from "./ErrorController";
import InternalServerError from "../error/InternalServerError";
import PrimaryRequest from "../dto/PrimaryRequest";

export function regAnonymous(request: PrimaryRequest<void>, session: SessionModel) {
    regUserAnonymous().then(value => {
        if (value) {
            session.userId = value._id;
            session.sendResponse(new PrimaryResponse({token: value.token}, request.requestId));
        }
    }).catch(e => {
        sendError(e, request.requestId, session);
    });
}

export async function regAccount(request: PrimaryRequest<LoginRequest>, session: SessionModel): Promise<void> {
    const user = (await regUser(request.data));
    if (!user) {
        throw new InternalServerError();
    }
    session.userId = user._id;
    session.sendResponse(new PrimaryResponse({token: user.token}, request.requestId));
}