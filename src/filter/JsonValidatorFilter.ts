import SessionModel from "../session/SessionModel";
import {Filter} from "./Filter";

export class JsonValidatorFilter implements Filter {
    doFilter(path: string, session?: SessionModel): Promise<void> {
        throw new Error()
    }
}