import {IThemeSchema} from "../../../model/Theme";

export interface ThemeData {
    id: IThemeSchema["_id"];
    title: IThemeSchema["title"];
    description: IThemeSchema["description"];
}