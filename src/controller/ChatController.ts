import {IUserSchema} from "../model/User";
import {IThemeSchema} from "../model/Theme";
import {chatRoomStorage, sessionStorage} from "../storage";
import PrimaryResponse from "../dto/PrimaryResponse";
import {THEME_READY} from "../const/ServerRequestIdConst";
import {ThemeReadyResponse} from "../dto/types/ThemeReadyResponse";
import ChatRoomImpl from "../model/ChatRoom/ChatRoomImpl";
import logger from "../config/WinstonLogger";

export async function createChatWithUsers(
    downUserId: IUserSchema["_id"], upUserId: IUserSchema["_id"], themeId: IThemeSchema["_id"], themeTitle: IThemeSchema["title"]
): Promise<void> {
    sessionStorage.sendMessageUserWithId(downUserId, new PrimaryResponse<ThemeReadyResponse>({
        themeTitle
    }, THEME_READY));
    sessionStorage.sendMessageUserWithId(upUserId, new PrimaryResponse<ThemeReadyResponse>({
        themeTitle
    }, THEME_READY));
    const votedDown = sessionStorage.getSessionModelByUserId(downUserId);
    const votedUp = sessionStorage.getSessionModelByUserId(upUserId);
    if (!votedDown || !votedUp) {
        logger.error(`votedDown ${votedDown} with id ${downUserId} or votedUp ${votedUp} with id ${upUserId}  is empty`);
        return;
    }
    const chatRoomImpl = new ChatRoomImpl(votedDown, votedUp, themeId);
    chatRoomStorage.addChat(chatRoomImpl);
    chatRoomImpl.startChat();

}
