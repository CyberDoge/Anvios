import SessionModel from "../session/SessionModel";
import PrimaryRequest from "../dto/PrimaryRequest";

export interface Filter {
    doFilter(request: PrimaryRequest<any>, session?: SessionModel): Promise<void | never>;
}