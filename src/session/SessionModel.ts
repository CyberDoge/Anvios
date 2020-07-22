import WebSocket from "ws";
import PrimaryResponse from "../dto/PrimaryResponse";

export default class SessionModel {
    userId: string | null = null;
    private socket: WebSocket;

    constructor(socket: WebSocket) {
        this.socket = socket;
    }

    invalidate = () => {
        this.socket.close();
    };

    sendResponse = (response: PrimaryResponse) => {
        this.socket.send(JSON.stringify(response))
    };

    sendError = (error: Error, requestId: string,) => {
        this.sendResponse(new PrimaryResponse(null, requestId, error.message))
    };

    sendMessage = (message: string, requestId: string) => {
        this.sendResponse(new PrimaryResponse({message}, requestId))
    }
}
