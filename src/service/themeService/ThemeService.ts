import {ThemeBase, UserIdsWithThemeReadyForChat} from "./types/ThemeService.types";
import SessionStorage from "../../storage/SessionStorage";

export function changeUserVoteOnTheme(theme: ThemeBase, agree: boolean, userId: string): ThemeBase {
    const agreedUserIndex = theme.votedUpIds.indexOf(userId);
    const disagreedUserIndex = theme.votedDownIds.indexOf(userId);
    // delete from each array if already agreed or disagreed
    if (disagreedUserIndex !== -1) {
        theme.votedDownIds.splice(disagreedUserIndex, 1);
    }
    if (agreedUserIndex !== -1) {
        theme.votedUpIds.splice(agreedUserIndex, 1);
    }
    // if was not agree, but now agree when - push
    if (agreedUserIndex === -1 && agree) {
        theme.votedUpIds.push(userId)
    } else if (disagreedUserIndex === -1 && !agree) {
        // if was not disagree, but not disagree when - push
        theme.votedDownIds.push(userId)
    }
    return theme;
}

export function getUserIdsWithThemeReadyForChat(theme: ThemeBase, isUserOnline: SessionStorage["isUserOnline"]): UserIdsWithThemeReadyForChat {
    if (!theme.votedDownIds.length || !theme.votedUpIds.length) {
        return {upUserId: null, downUserId: null};
    }
    let upUserId;
    let downUserId = null;
    upUserId = theme.votedUpIds.find(upUserId => {
        if (!isUserOnline(upUserId)) {
            return false;
        }
        downUserId = theme.votedDownIds.find(isUserOnline);
        return downUserId;
    });
    return {
        upUserId, downUserId
    };
}