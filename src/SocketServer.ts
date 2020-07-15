import ws from 'ws'
import RequestData from "./dto/RequestData";
import Filter from "./filter/Filter";
import AuthFilter from "./filter/AuthFilter";
import SessionModel from "./session/SessionModel";
import {AUTH, NONE, REG_ACCOUNT, REG_ANON, THEMES, USER} from "./const/RoutePathConst";
import {sendError, sendErrorMessage} from "./controller/ErrorController";
import {authUser} from "./controller/LoginController";
import {sendCurrentUserInfo} from "./controller/UserController";
import {regAccount, regAnonymous} from "./controller/RegController";
import {isCheckedError} from "./error/CheckedErrorMarker";
import InternalServerError from "./error/InternalServerError";
import {getSomeThemes} from "./controller/ThemeController";

const PORT = +(process.env.port || 8080);

export default class SocketServer {
    private server: ws.Server;

    private readonly filtersChain: Filter[];

    constructor() {
        this.server = new ws.Server({port: PORT});
        this.filtersChain = [new AuthFilter()]
    }

    private static handleError(error: Error, session: SessionModel): void {
        if (isCheckedError(error)) {
            sendError(error, session);
        } else {
            // todo normal log
            console.error(error);
            sendError(new InternalServerError(), session)
        }
    }

    start = () => {
        this.server.on("connection", (socket) => {
            const session: SessionModel = new SessionModel(socket);
            socket.on("message", (data: string) => {
                try {
                    const request: RequestData = JSON.parse(data);
                    for (let filter of this.filtersChain) {
                        filter.doFilter(request.routePath, session)
                    }
                    this.route(request, session)
                } catch (e) {
                    SocketServer.handleError(e, session)
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
            case THEMES: {
                getSomeThemes(request.data, session);
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
    };
}