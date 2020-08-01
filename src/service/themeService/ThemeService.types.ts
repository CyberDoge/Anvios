import {IUserSchema} from "../../model/User";
import {Schema} from "mongoose";

export type ThemeBase = {
    title: string;
    description?: string;
    date: Date,
    votedUpIds: Array<IUserSchema["_id"]>,
    votedDownIds: Array<IUserSchema["_id"]>,
    winnerId?: Schema.Types.ObjectId
}