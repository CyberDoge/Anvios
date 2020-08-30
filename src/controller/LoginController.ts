import SessionModel from "../session/SessionModel";
import User from "../model/User";
import PrimaryRequest from "../dto/PrimaryRequest";
import {CredentialsAuthRequest} from "../dto/types/CredentialsAuthRequest";
import {TokenAuthRequest} from "../dto/types/TokenAuthRequest";

export function authUser({data, requestId}: PrimaryRequest<CredentialsAuthRequest>, session: SessionModel) {
    authByLoginAndPass(data.login, data.password).then(setSessionAndSendResponse(session, requestId))
}

export function tokenAuthUser({data, requestId}: PrimaryRequest<TokenAuthRequest>, session: SessionModel) {
    authByToken(data.token).then(setSessionAndSendResponse(session, requestId));
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