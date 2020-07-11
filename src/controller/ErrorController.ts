import SessionModel from "../session/SessionModel";

export function sendErrorMessage(message: string, session: SessionModel) {
    session.socket.send(message);
}

export function sendError(error: Error, session: SessionModel) {
    session.socket.send(error.message);

}