import {IThemeSchema} from "../../../model/Theme";

export interface NewThemeRequest {
    title: IThemeSchema["title"];
    description?: IThemeSchema["description"];
}