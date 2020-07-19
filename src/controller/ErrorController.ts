import SessionModel from "../session/SessionModel";
import PrimaryResponse from "../dto/PrimaryResponse";
import {isCheckedError} from "../error/CheckedErrorMarker";
import InternalServerError from "../error/InternalServerError";

export function sendErrorMessage(message: string, session: SessionModel) {
    session.sendResponse(new PrimaryResponse(null, false, message));
}

export function sendError(error: Error, session: SessionModel) {
    session.sendError(error);
}

export function handleAndSendError(error: Error, session: SessionModel): void {
    if (isCheckedError(error)) {
        sendError(error, session);
    } else {
        // todo normal log
        console.error(error);
        sendError(new InternalServerError(), session)
    }
}