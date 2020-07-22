import SessionModel from "../session/SessionModel";
import PrimaryResponse from "../dto/PrimaryResponse";
import {isCheckedError} from "../error/CheckedErrorMarker";
import InternalServerError from "../error/InternalServerError";

export function sendErrorMessage(message: string, requestId: string, session: SessionModel) {
    session.sendResponse(new PrimaryResponse(null, requestId, message));
}

export function sendError(error: Error, requestId: string, session: SessionModel) {
    session.sendError(error, requestId);
}

export function handleAndSendError(error: Error, requestId: string, session: SessionModel): void {
    if (isCheckedError(error)) {
        sendError(error, requestId, session);
    } else {
        // todo normal log
        console.error(error);
        sendError(new InternalServerError(), requestId, session)
    }
}