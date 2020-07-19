import Theme from "../model/Theme";
import SessionModel from "../session/SessionModel";
import PrimaryResponse from "../dto/PrimaryResponse";
import SomeThemesRequest from "../dto/SomeThemesRequest";
import NewThemeRequest from "../dto/NewThemeRequest";
import {validateNewTheme} from "../validator/ThemeValidator";

export function getSomeThemes(request: SomeThemesRequest, session: SessionModel): void {
    Theme.getSomeSortedByDateThemes(request.from, request.count).then((themes) => {
        session.sendResponse(new PrimaryResponse({themes}))
    });
}

export function createTheme(theme: NewThemeRequest, session: SessionModel) {
    if (validateNewTheme(theme)) {
        session.sendError(new Error("invalid theme fields"))
    }
    Theme.createTheme(theme).then(() => {
        session.sendMessage("success")
    })
}