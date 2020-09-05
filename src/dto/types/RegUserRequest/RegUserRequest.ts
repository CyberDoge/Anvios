import {IUserSchema} from "../../../model/User";

export interface RegUserRequest {
    login: NonNullable<IUserSchema["login"]>;
    password: NonNullable<IUserSchema["password"]>;
    token: IUserSchema["token"];
}