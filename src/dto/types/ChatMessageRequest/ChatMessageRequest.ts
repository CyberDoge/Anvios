import {IUserSchema} from "../../../model/User";
import IOnMessageHandler from "../../../handler/IOnMessageHandler";
import ChatEvent from "../../../model/ChatRoom/ChatEvent";

export interface ChatMessageRequest {
    data: IOnMessageHandler["dataType"],
    event?: ChatEvent,
    fromUser?: IUserSchema["_id"],
    toUser?: IUserSchema["_id"],
}