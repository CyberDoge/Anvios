import SessionModel from "../session/SessionModel";

export function sendCurrentUserInfo(session: SessionModel): void {
    session.socket.send(session.userId);
}