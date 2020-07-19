import {MAX_THEME_DESCRIPTION_LENGTH, MAX_THEME_TITLE_LENGTH} from "../const/ModelConst";
import NewThemeRequest from "../dto/NewThemeRequest";


export function validateNewTheme(theme: NewThemeRequest): boolean {
    return !!theme.title && theme.title.length < MAX_THEME_TITLE_LENGTH
        && (!theme.description || theme.description.length < MAX_THEME_DESCRIPTION_LENGTH)
}