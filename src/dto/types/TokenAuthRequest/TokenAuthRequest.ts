import {IUserSchema} from "../../../model/User";

export interface TokenAuthRequest {
    token: IUserSchema["token"];
}