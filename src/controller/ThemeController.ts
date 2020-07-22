import Theme from "../model/Theme";
import SessionModel from "../session/SessionModel";
import PrimaryResponse from "../dto/PrimaryResponse";
import SomeThemesRequest from "../dto/SomeThemesRequest";
import NewThemeRequest from "../dto/NewThemeRequest";
import {validateNewTheme} from "../validator/ThemeValidator";
import PrimaryRequest from "../dto/PrimaryRequest";

export function getSomeThemes(request: PrimaryRequest<SomeThemesRequest>, session: SessionModel): void {
    Theme.getSomeSortedByDateThemes(request.data.from, request.data.count).then((themes) => {
        session.sendResponse(new PrimaryResponse({themes}, request.requestId))
    });
}

export function createTheme(request: PrimaryRequest<NewThemeRequest>, session: SessionModel) {
    if (validateNewTheme(request.data)) {
        session.sendError(new Error("invalid theme fields"), request.requestId)
    }
    Theme.createTheme(request.data).then(() => {
        session.sendMessage("success", request.requestId)
    })
}