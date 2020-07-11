import WebSocket from "ws";

export default class SessionModel {
    userId: string | null = null;
    socket: WebSocket;

    constructor(socket: WebSocket) {
        this.socket = socket;
    }

    invalidate = () => {
        this.socket.close();
    }
}