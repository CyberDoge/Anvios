import Theme from "../model/Theme";
import SessionModel from "../session/SessionModel";
import PrimaryResponse from "../dto/PrimaryResponse";
import SomeThemesRequest from "../dto/SomeThemesRequest";
import NewThemeRequest from "../dto/NewThemeRequest";
import {validateNewTheme} from "../validator/ThemeValidator";
import PrimaryRequest from "../dto/PrimaryRequest";
import ThemeData from "../dto/ThemeData";
import VoteToThemeRequest from "../dto/VoteToThemeRequest";

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
    if (!validateNewTheme(request.data)) {
        session.sendError(new Error("invalid theme fields"), request.requestId);
        return;
    }
    Theme.createTheme(request.data).then(() => {
        session.sendMessage("success", request.requestId)
    })
}

export function voteToTheme(request: PrimaryRequest<VoteToThemeRequest>, session: SessionModel) {
    Theme.voteToTheme(request.data.themeId, session.userId!, request.data.agree).then((theme) => {
        if (theme) {
            session.sendResponse(new PrimaryResponse({themeId: theme._id}, request.requestId))
        } else {
            session.sendResponse(new PrimaryResponse({}, request.requestId, "no such theme"))
        }
    })
}