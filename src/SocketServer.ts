import ws from 'ws'
import PrimaryRequest from "./dto/PrimaryRequest";
import SessionModel from "./session/SessionModel";
import {
    CREATE_THEME,
    CREDENTIAL_AUTH,
    GET_SOME_THEMES,
    REG_ACCOUNT,
    REG_ANON,
    TOKEN_AUTH,
    USER,
    VOTE_TO_THEME
} from "./const/RoutePathAndTypeConst";
import {handleAndSendError, sendErrorMessage} from "./controller/ErrorController";
import {authUser, tokenAuthUser} from "./controller/LoginController";
import {sendCurrentUserInfo} from "./controller/UserController";
import {regAccount, regAnonymous} from "./controller/RegController";
import {createTheme, getSomeThemes, voteToTheme} from "./controller/ThemeController";
import Ajv from 'ajv';
import SessionStorage from "./storage/SessionStorage";
import {AuthFilter, Filter} from "./filter";

const PORT = +(process.env.port || 8080);

export default class SocketServer {
    private server: ws.Server;
    private ajv: Ajv.Ajv;
    private sessionStorage: SessionStorage;

    private readonly filtersChain: Filter[];

    constructor() {
        this.server = new ws.Server({port: PORT});
        this.sessionStorage = new SessionStorage();
        this.ajv = new Ajv({allErrors: true});
        this.filtersChain = [new AuthFilter()];
    }

    start = () => {
        this.server.on("connection", (socket) => {
            const session: SessionModel = new SessionModel(socket, this.sessionStorage.generateSessionId());
            this.sessionStorage.addSession(session);
            socket.on("message", this.handleUserMessage(session, socket))
        });
    };

    private handleUserMessage = (session: SessionModel, socket: ws) => async (data: string) => {
        try {
            const request: PrimaryRequest<any> = JSON.parse(data);
            try {
                // todo fix all import adding index.ts & add validate json filter
                for (let filter of this.filtersChain) {
                    await filter.doFilter(request, session)
                }
                await this.route(request, session)
            } catch (e) {
                handleAndSendError(e, request.requestId, session)
            }
        } catch (e) {
            socket.send("invalid JSON syntax")
        }
    };

    private route = async (request: PrimaryRequest<any>, session: SessionModel): Promise<void> => {

        switch (request.routePath) {
            case CREDENTIAL_AUTH: {
                authUser(request, session);
                break;
            }
            case TOKEN_AUTH: {
                tokenAuthUser(request, session);
                break;
            }
            case REG_ANON: {
                regAnonymous(request, session);
                break;
            }
            case REG_ACCOUNT: {
                await regAccount(request, session);
                break;
            }
            case USER: {
                sendCurrentUserInfo(request, session);
                break;
            }
            case GET_SOME_THEMES: {
                getSomeThemes(request, session);
                break;
            }
            case CREATE_THEME: {
                createTheme(request, session);
                break;
            }
            case VOTE_TO_THEME: {
                voteToTheme(request, session);
                break;
            }
            default: {
                sendErrorMessage("no such path", request.requestId, session);
                break;
            }
        }
    };
};