import mongoose, {Document, Model, Schema} from "mongoose";
import IOnMessageHandler from "../../handler/IOnMessageHandler";
import ChatEvent from "./ChatEvent";
import {IUserSchema} from "../User";

export interface IChatMessage extends Document {
    data: IOnMessageHandler["dataType"],
    event: ChatEvent,
    fromUser: IUserSchema["_id"],
    toUser: IUserSchema["_id"],
}

interface IChatMessageModel extends Model<IChatMessage> {
}

const chatMessageSchema = new mongoose.Schema({
    data: {
        type: [String, Buffer, ArrayBuffer, [Buffer]]
    },
    event: {
        type: ChatEvent
    },
    fromUser: {type: Schema.Types.ObjectId},
    toUser: {type: Schema.Types.ObjectId},
});

const ChatMessage = mongoose.model<IChatMessage, IChatMessageModel>("ChatMessage", chatMessageSchema);
export default ChatMessage;