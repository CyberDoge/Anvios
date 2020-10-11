import WebSocket from "ws";
import PrimaryResponse from "../dto/PrimaryResponse";
import {SESSION_CHECK_TIMEOUT} from "../const/SessionConst";

export default class SessionModel {
    userId: string | null = null;
    public readonly sessionId: number;
    private socket: WebSocket;
    private readonly aliveInterval: NodeJS.Timeout;
    private alive: boolean;

    constructor(socket: WebSocket, sessionId: number) {
        this.socket = socket;
        this.sessionId = sessionId;
        this.alive = true;
        this.socket.on("pong", this.updateSessionLive);
        this.aliveInterval = setInterval(this.checkSessionLive, SESSION_CHECK_TIMEOUT)
    }


    get isAlive(): boolean {
        return this.alive;
    }

    invalidate = () => {
        this.socket.close();
    };
    updateSessionLive = () => {
        this.alive = true;
    };
    checkSessionLive = () => {
        if (!this.alive) {
            this.invalidate();
            clearInterval(this.aliveInterval);
        }
        this.alive = false;
        this.socket.ping();
    };

    sendMessage = (response: PrimaryResponse) => {
        this.socket.send(JSON.stringify(response))
    };

    sendError = (error: Error, requestId: string,) => {
        this.sendMessage(new PrimaryResponse(null, requestId, error.message))
    };

    sendStringMessage = (message: string, requestId: string) => {
        this.sendMessage(new PrimaryResponse({message}, requestId))
    };
}
