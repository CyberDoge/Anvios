import ws from 'ws'
import RequestData from "./dto/RequestData";
import Filter from "./filter/Filter";
import AuthFilter from "./filter/AuthFilter";
import SessionModel from "./session/SessionModel";
import {AUTH, NONE, REG_ACCOUNT, REG_ANON, USER} from "./const/RoutePathConst";
import {sendError, sendErrorMessage} from "./controller/ErrorController";
import {authUser} from "./controller/LoginController";
import {sendCurrentUserInfo} from "./controller/UserController";
import {regAccount, regAnonymous} from "./controller/RegController";

const PORT = +(process.env.port || 8080);

export default class SocketServer {
    private server: ws.Server;

    private readonly filtersChain: Filter[];

    constructor() {
        this.server = new ws.Server({port: PORT});
        this.filtersChain = [new AuthFilter()]
    }

    start = () => {
        this.server.on("connection", (socket) => {
            const session: SessionModel = new SessionModel(socket);
            socket.on("message", (data: string) => {
                const request: RequestData = JSON.parse(data);
                try {
                    for (let filter of this.filtersChain) {
                        filter.doFilter(request.routePath, session)
                    }
                    this.route(request, session)
                } catch (e) {
                    sendError(e, session);
                }
            })
        })
    };

    private route = (request: RequestData, session: SessionModel): void => {
        switch (request.routePath) {
            case AUTH: {
                authUser(request.data, session);
                break;
            }
            case REG_ANON: {
                regAnonymous(session);
                break;
            }
            case REG_ACCOUNT: {
                regAccount(request.data, session);
                break;
            }
            case USER: {
                sendCurrentUserInfo(session);
                break;
            }
            case NONE: {
                sendErrorMessage("no such path", session);
                break;
            }
            default: {
                sendErrorMessage("no such path", session);
                break;
            }
        }
    }
}