import LoginRequest from "../dto/LoginRequest";
import SessionModel from "../session/SessionModel";
import User from "../model/User";
import InvalidDataFormatError from "../error/InvalidDataFormatError";
import PrimaryRequest from "../dto/PrimaryRequest";

export function authUser({data, requestId}: PrimaryRequest<LoginRequest>, session: SessionModel) {
    if (data.token) {
        authByToken(data.token).then(setSessionAndSendResponse(session, requestId));
    } else if (data.login && data.password) {
        authByLoginAndPass(data.login, data.password).then(setSessionAndSendResponse(session, requestId))
    } else {
        throw new InvalidDataFormatError("invalid auth data");
    }
}

const setSessionAndSendResponse = (session: SessionModel, requestId: string) => (result: string | null) => {
    session.userId = result;
    if (session.userId) {
        session.sendMessage("success", requestId);
    } else {
        session.sendMessage("failed", requestId);
    }
};

async function authByToken(token: string): Promise<string | null> {
    return (await User.findIdByToken(token));
}

async function authByLoginAndPass(login: string, password: string): Promise<string | null> {
    return await User.findIdByLoginAndPassword(login, password);
}