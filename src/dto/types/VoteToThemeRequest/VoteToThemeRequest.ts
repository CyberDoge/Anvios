import {IThemeSchema} from "../../../model/Theme";

export interface VoteToThemeRequest {
    themeId: IThemeSchema["_id"],
    agree: boolean
}