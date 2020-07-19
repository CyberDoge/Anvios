import LoginRequest from "../dto/LoginRequest";
import SessionModel from "../session/SessionModel";
import User from "../model/User";
import PrimaryResponse from "../dto/PrimaryResponse";
import InvalidDataFormatError from "../error/InvalidDataFormatError";

export function authUser(loginData: LoginRequest, session: SessionModel) {
    if (loginData.token) {
        authByToken(loginData.token).then(setSessionAndSendResponse(session));
    } else if (loginData.login && loginData.password) {
        authByLoginAndPass(loginData.login, loginData.password).then(setSessionAndSendResponse(session))
    } else {
        throw new InvalidDataFormatError("invalid auth data");
    }
}

const setSessionAndSendResponse = (session: SessionModel) => (result: string | null) => {
    session.userId = result;
    session.sendResponse(new PrimaryResponse(null, !!session.userId));
};

async function authByToken(token: string): Promise<string | null> {
    return (await User.findIdByToken(token));
}

async function authByLoginAndPass(login: string, password: string): Promise<string | null> {
    return await User.findIdByLoginAndPassword(login, password);
}