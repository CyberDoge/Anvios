import LoginData from "../dto/LoginData";
import SessionModel from "../session/SessionModel";
import User from "../model/User";
import PrimaryResponse from "../dto/PrimaryResponse";

export function authUser(loginData: LoginData, session: SessionModel) {
    if (loginData.token) {
        authByToken(loginData.token).then(setSessionAndSendResponse(session));
    } else if (loginData.login && loginData.password) {
        authByLoginAndPass(loginData.login, loginData.password).then(setSessionAndSendResponse(session))
    } else {
        // todo handle invalid data type
        throw new Error("invalid auth data");
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