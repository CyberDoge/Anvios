import SessionModel from "../session/SessionModel";

export default class SessionStorage {
    private sessions: Map<Number, SessionModel>;
    private lastSessionId: SessionModel["sessionId"] = 0;

    constructor() {
        this.sessions = new Map<SessionModel["sessionId"], SessionModel>();
    }

    addSession(session: SessionModel) {
        this.sessions.set(session.sessionId, session)
    }

    generateSessionId(): number {
        return ++this.lastSessionId;
    }
}