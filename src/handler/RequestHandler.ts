import SessionModel from "../session/SessionModel";
import ws from "ws";
import PrimaryRequest from "../dto/PrimaryRequest";
import {handleAndSendError, sendErrorMessage} from "../controller/ErrorController";
import {
    CREATE_THEME,
    CREDENTIAL_AUTH,
    GET_SOME_THEMES,
    REG_ACCOUNT,
    REG_ANON,
    TOKEN_AUTH,
    USER,
    VOTE_TO_THEME
} from "../const/RoutePathAndTypeConst";
import {authUser, tokenAuthUser} from "../controller/LoginController";
import {regAccount, regAnonymous} from "../controller/RegController";
import {sendCurrentUserInfo} from "../controller/UserController";
import {createTheme, getSomeThemes, voteToTheme} from "../controller/ThemeController";
import standerFilterChain from "../filter";

export default class RequestHandler {
    public handleUserRequest = (session: SessionModel, socket: ws) => async (data: string) => {
        try {
            const request: PrimaryRequest<any> = JSON.parse(data);
            try {
                for (let filter of standerFilterChain) {
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

    private route = async (request: PrimaryRequest<any>, session: SessionModel)
        : Promise<void> => {
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
}