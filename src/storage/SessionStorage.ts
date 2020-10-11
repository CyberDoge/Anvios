import SessionModel from "../session/SessionModel";
import {IUserSchema} from "../model/User";
import PrimaryResponse from "../dto/PrimaryResponse";

export default class SessionStorage {
    private sessions: Map<Number, SessionModel>;
    private lastSessionId: SessionModel["sessionId"] = 0;

    constructor() {
        this.sessions = new Map<SessionModel["sessionId"], SessionModel>();
    }

    addSession = (session: SessionModel): void => {
        this.sessions.set(session.sessionId, session)
    }

    generateSessionId = (): number => {
        return ++this.lastSessionId;
    }

    getSessionModelByUserId = (id: IUserSchema["id"]): SessionModel | undefined => {
        return [...this.sessions.values()].find((model) => id.equals(model.userId))
    }

    isUserOnline = (id: IUserSchema["id"]): boolean => {
        return !!this.getSessionModelByUserId(id)?.isAlive
    }

    sendMessageUserWithId = (id: IUserSchema["id"], response: PrimaryResponse) => {
        const session = this.getSessionModelByUserId(id);
        if (session) {
            session.sendMessage(response);
        }
    }
}