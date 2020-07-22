import Theme from "../model/Theme";
import SessionModel from "../session/SessionModel";
import PrimaryResponse from "../dto/PrimaryResponse";
import SomeThemesRequest from "../dto/SomeThemesRequest";
import NewThemeRequest from "../dto/NewThemeRequest";
import {validateNewTheme} from "../validator/ThemeValidator";
import PrimaryRequest from "../dto/PrimaryRequest";
import ThemeData from "../dto/ThemeData";

export function getSomeThemes(request: PrimaryRequest<SomeThemesRequest>, session: SessionModel): void {
    Theme.getSomeSortedByDateThemes(request.data.from, request.data.count).then((themes) => {
        const themesRequest: Array<ThemeData> = themes.map(themeSchema => (
            {
                id: themeSchema._id,
                title: themeSchema.title,
                description: themeSchema.description
            }
        ));
        session.sendResponse(new PrimaryResponse({themes: themesRequest}, request.requestId))
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