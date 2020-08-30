import {IThemeSchema} from "../../../model/Theme";

export default interface NewThemeRequest {
    title: IThemeSchema["title"];
    description?: IThemeSchema["description"];
}