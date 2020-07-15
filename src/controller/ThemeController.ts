import Theme from "../model/Theme";
import SessionModel from "../session/SessionModel";
import PrimaryResponse from "../dto/PrimaryResponse";

export function getSomeThemes(from: number, count = 10, session: SessionModel): void {
    Theme.getSomeSortedByDateThemes(from, count).then((themes) => {
        session.sendResponse(new PrimaryResponse({themes}))
    });
}