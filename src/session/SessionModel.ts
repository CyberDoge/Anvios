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

    sendError = (error: Error) => {
        this.sendResponse(new PrimaryResponse(null, false, error.message))
    };

    sendMessage = (message: string) => {
        this.sendResponse(new PrimaryResponse({message}))
    }
}
