import SessionModel from "../session/SessionModel";

export interface Filter {
    doFilter(path: string, session?: SessionModel): Promise<void | never>;
}