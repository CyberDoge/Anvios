import SessionModel from "../session/SessionModel";
import NotAuthUserError from "../error/NotAuthUserError";
import PrimaryRequest from "../dto/PrimaryRequest";

export function sendCurrentUserInfo(request: PrimaryRequest<void>, session: SessionModel): void {
    if (session.userId) {
        session.sendStringMessage(session.userId, request.requestId);
    } else {
        session.sendError(new NotAuthUserError(), request.requestId);
    }
}