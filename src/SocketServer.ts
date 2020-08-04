import ws from 'ws'
import PrimaryRequest from "./dto/PrimaryRequest";
import Filter from "./filter/Filter";
import AuthFilter from "./filter/AuthFilter";
import SessionModel from "./session/SessionModel";
import {AUTH, CREATE_THEME, GET_SOME_THEMES, REG_ACCOUNT, REG_ANON, USER, VOTE_TO_THEME} from "./const/RoutePathConst";
import {handleAndSendError, sendErrorMessage} from "./controller/ErrorController";
import {authUser} from "./controller/LoginController";
import {sendCurrentUserInfo} from "./controller/UserController";
import {regAccount, regAnonymous} from "./controller/RegController";
import {createTheme, getSomeThemes, voteToTheme} from "./controller/ThemeController";
import Ajv from 'ajv';
import {SomeThemeRequest} from "./dto/schema/SomeThemesRequest.schema";

const PORT = +(process.env.port || 8080);

export default class SocketServer {
    private server: ws.Server;
    private ajv: Ajv.Ajv;

    private readonly filtersChain: Filter[];

    constructor() {
        this.server = new ws.Server({port: PORT});
        this.ajv = new Ajv({allErrors: true});
        this.filtersChain = [new AuthFilter()];
    }

    start = () => {
        this.server.on("connection", (socket) => {
            const session: SessionModel = new SessionModel(socket);
            socket.on("message", this.handleUserMessage(session, socket))
        });
    };

    private handleUserMessage = (session: SessionModel, socket: ws) => async (data: string) => {
        try {
            const request: PrimaryRequest<any> = JSON.parse(data);
            try {
                // todo fix all import adding index.ts & add validate json filter
                console.log(this.ajv.validate(SomeThemeRequest, request.data));
                for (let filter of this.filtersChain) {
                    await filter.doFilter(request.routePath, session)
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
            case AUTH: {
                authUser(request, session);
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