import SessionModel from "../session/SessionModel";

export default interface Filter {
    doFilter(path: string, session?: SessionModel): Promise<void | never>;
}