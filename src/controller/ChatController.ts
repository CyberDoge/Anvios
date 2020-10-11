import {IUserSchema} from "../model/User";
import ChatRoom from "../model/ChatRoom/ChatRoom";
import {IThemeSchema} from "../model/Theme";
import {chatRoomStorage, sessionStorage} from "../storage";
import PrimaryResponse from "../dto/PrimaryResponse";
import {THEME_READY} from "../const/ServerRequestIdConst";

export async function createChatWithUsers(downUserId: IUserSchema["_id"], upUserId: IUserSchema["_id"], themeId: IThemeSchema["_id"]): Promise<void> {
    const chatRoom = await ChatRoom.create({
        downUserId,
        upUserId,
        themeId,
        downUserMessages: [],
        upUserMessages: []
    });
    chatRoomStorage.addChat(chatRoom);
    sessionStorage.sendMessageUserWithId(downUserId, new PrimaryResponse<IThemeSchema["_id"]>(themeId, THEME_READY));
    sessionStorage.sendMessageUserWithId(upUserId, new PrimaryResponse<IThemeSchema["_id"]>(themeId, THEME_READY));
}

export function receiveMessageAndSendBroadCast() {
}