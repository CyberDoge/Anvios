import {IUserSchema} from "../../../model/User";

export type ThemeBase = {
    title: string;
    description?: string;
    votedUpIds: Array<IUserSchema["_id"]>,
    votedDownIds: Array<IUserSchema["_id"]>,
}

export type UserIdsWithThemeReadyForChat = {
    upUserId: IUserSchema["_id"],
    downUserId: IUserSchema["_id"],
}