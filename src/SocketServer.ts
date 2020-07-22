import ws from 'ws'
import PrimaryRequest from "./dto/PrimaryRequest";
import Filter from "./filter/Filter";
import AuthFilter from "./filter/AuthFilter";
import SessionModel from "./session/SessionModel";
import {AUTH, CREATE_THEME, GET_SOME_THEMES, NONE, REG_ACCOUNT, REG_ANON, USER} from "./const/RoutePathConst";
import {handleAndSendError, sendErrorMessage} from "./controller/ErrorController";
import {authUser} from "./controller/LoginController";
import {sendCurrentUserInfo} from "./controller/UserController";
import {regAccount, regAnonymous} from "./controller/RegController";
import {createTheme, getSomeThemes} from "./controller/ThemeController";

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
            socket.on("message", async (data: string) => {
                try {
                    const request: PrimaryRequest = JSON.parse(data);
                    for (let filter of this.filtersChain) {
                        await filter.doFilter(request.routePath, session)
                    }
                    await this.route(request, session)
                } catch (e) {
                    handleAndSendError(e, session)
                }
            })
        })
    };

    private route = async (request: PrimaryRequest, session: SessionModel): Promise<void> => {
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
                await regAccount(request.data, session);
                break;
            }
            case USER: {
                sendCurrentUserInfo(session);
                break;
            }
            case GET_SOME_THEMES: {
                getSomeThemes(request.data, session);
                break;
            }
            case CREATE_THEME: {
                createTheme(request.data, session);
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