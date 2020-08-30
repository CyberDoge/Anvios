import {IUserSchema} from "../../../model/User";

export interface CredentialsAuthRequest {
    login: Exclude<IUserSchema["login"], undefined>;
    password: Exclude<IUserSchema["password"], undefined>;
}