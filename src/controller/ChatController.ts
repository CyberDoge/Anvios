import {IUserSchema} from "../model/User";
import ChatRoom from "../model/ChatRoom";
import {IThemeSchema} from "../model/Theme";
import {chatRoomStorage} from "../storage";

export async function createChatRoom(downUserId: IUserSchema["_id"], upUserId: IUserSchema["_id"], themeId: IThemeSchema["_id"]): Promise<void> {
    const chatRoom = await ChatRoom.create({
        downUserId,
        upUserId,
        themeId,
        downUserMessages: [],
        upUserMessages: []
    });
    chatRoomStorage.addChat(chatRoom);
    return;
}
