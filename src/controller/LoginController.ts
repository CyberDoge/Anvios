import LoginData from "../dto/LoginData";
import SessionModel from "../session/SessionModel";

export function authUser(loginData: LoginData, session: SessionModel) {
    if (loginData.token) {
        session.userId = authByToken(loginData.token);
    } else if (loginData.login && loginData.password) {
        session.userId = authByLoginAndPass(loginData.login, loginData.password)
    } else {
        // todo handle invalid data type
        throw new Error("invalid auth data");
    }
    // todo normal message object
    session.socket.send("success");
}

function authByToken(token: string): string | null {
    return "userId"
}

function authByLoginAndPass(login: string, password: string): string | null {
    if (login === "login" && password === "pas")
        return "userId";
    return null;
}