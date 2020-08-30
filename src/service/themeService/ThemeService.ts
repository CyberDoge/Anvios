import {ThemeBase} from "./types/ThemeService.types";

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

function isOnline(userId: any): boolean {
    return false
}

export function getThemeReadyForChat(theme: ThemeBase): boolean {
    if (!theme.votedDownIds.length || !theme.votedUpIds.length) {
        return false;
    }
    let firstPlayer;
    let secondPlayer = null;
    firstPlayer = theme.votedUpIds.find(upUserId => {
        if (!isOnline(upUserId)) {
            return false;
        }
        secondPlayer = theme.votedDownIds.find(downUserId => {
            return isOnline(downUserId);
        });
        return secondPlayer;
    });
    return firstPlayer;
}