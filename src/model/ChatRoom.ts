import * as mongoose from "mongoose";
import {Document, Model} from "mongoose";
import {IUserSchema} from "./User";
import {IThemeSchema} from "./Theme";
import {IChatMessage} from "./ChatMessage";

export interface IChatRoom extends Document {
    downUserId: IUserSchema["_id"],
    upUserId: IUserSchema["_id"],
    themeId: IThemeSchema["_id"],
    downUserMessages: Array<IChatMessage["_id"]>,
    upUserMessages: Array<IChatMessage["_id"]>,
}

export const ChatRoomSchema = new mongoose.Schema({
    downUserId: {type: String},
    upUserId: {type: String},
    themeId: {type: String},
    downUserMessages: {type: [mongoose.Types.ObjectId]},
    upUserMessages: {type: [mongoose.Types.ObjectId]},
})

interface IChatRoomModel extends Model<IChatRoom> {

}

export default mongoose.model<IChatRoom, IChatRoomModel>("ChatRoom", ChatRoomSchema);