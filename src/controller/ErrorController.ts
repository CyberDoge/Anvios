import SessionModel from "../session/SessionModel";
import PrimaryResponse from "../dto/PrimaryResponse";

export function sendErrorMessage(message: string, session: SessionModel) {
    session.sendResponse(new PrimaryResponse(null, false, message));
}

export function sendError(error: Error, session: SessionModel) {
    session.sendError(error);
}