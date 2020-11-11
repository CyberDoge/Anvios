import {IThemeSchema} from "../../../model/Theme";
import {IChatRoom} from "../../../model/ChatRoom/ChatRoom";

export interface ThemeReadyResponse {
    themeTitle: IThemeSchema["title"]
}