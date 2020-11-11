import * as mongoose from "mongoose";
import {Document, Model, Types} from "mongoose";
import {IUserSchema} from "../User";
import {IThemeSchema} from "../Theme";
import {IChatMessage} from "./ChatMessage";

export interface IChatRoom extends Document {
    downUserId: IUserSchema["_id"],
    upUserId: IUserSchema["_id"],
    themeId: IThemeSchema["_id"],
    winnerId: IThemeSchema["_id"],
    downUserMessages: Array<IChatMessage["_id"]>,
    upUserMessages: Array<IChatMessage["_id"]>,
}

export const ChatRoomSchema = new mongoose.Schema({
    downUserId: {type: String},
    upUserId: {type: String},
    winnerId: {type: String},
    themeId: {type: String},
    downUserMessages: {type: [Types.ObjectId]},
    upUserMessages: {type: [Types.ObjectId]},
})

interface IChatRoomModel extends Model<IChatRoom> {

}

export default mongoose.model<IChatRoom, IChatRoomModel>("ChatRoom", ChatRoomSchema);