import SessionModel from "../session/SessionModel";
import NotAuthUserError from "../error/NotAuthUserError";

export function sendCurrentUserInfo(session: SessionModel): void {
    if (session.userId) {
        session.sendMessage(session.userId);
    } else {
        session.sendError(new NotAuthUserError());
    }
}