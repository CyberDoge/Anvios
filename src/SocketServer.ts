import ws from 'ws'
import SessionModel from "./session/SessionModel";
import {sessionStorage} from "./storage";
import RequestHandler from "./handler/RequestHandler";

const PORT = +(process.env.port || 8080);

export default class SocketServer {
    private server: ws.Server;
    private requestHandler: RequestHandler;

    constructor() {
        this.server = new ws.Server({port: PORT});
        this.requestHandler = new RequestHandler();
    }

    start = () => {
        this.server.on("connection", (socket) => {
            const session: SessionModel = new SessionModel(socket, sessionStorage.generateSessionId());
            sessionStorage.addSession(session);
            socket.on("message", this.requestHandler.handleUserRequest(session, socket));
        });
    };
};