import {ThemeBase} from "../src/service/themeService/types/ThemeService.types";
import {changeUserVoteOnTheme} from "../src/service/themeService/ThemeService";
import {expect} from "chai";

let themes: Array<ThemeBase> = [];
beforeEach(() => {
    for (let i = 0; i < 3; i++) {
        themes.push({
            title: `title${i}`,
            description: `description${i}`,
            votedUpIds: ["first", "second", "third"],
            votedDownIds: ["notFirst", "notSecond", "notThird"],
        })
    }
});
afterEach(() => {
    themes = [];
});

describe('voting up', function () {
    it('vote up new', () => {
        changeUserVoteOnTheme(themes[0], true, "new");
        expect(themes[0].votedUpIds).to.have.members(["first", "second", "third", "new"]);
        expect(themes[0].votedDownIds).to.have.members(["notFirst", "notSecond", "notThird"]);
    });
    it('vote up again', () => {
        changeUserVoteOnTheme(themes[1], true, "first");
        expect(themes[1].votedUpIds).to.have.members(["second", "third"]);
        expect(themes[1].votedDownIds).to.have.members(["notFirst", "notSecond", "notThird"]);
    });
    it('vote up but was down', () => {
        changeUserVoteOnTheme(themes[2], true, "notFirst");
        expect(themes[2].votedUpIds).to.have.members(["first", "second", "third", "notFirst"]);
        expect(themes[2].votedDownIds).to.have.members(["notSecond", "notThird"]);
    });
});

describe('vote theme down', function () {
    it('vote down new', () => {
        changeUserVoteOnTheme(themes[0], false, "new");
        expect(themes[0].votedDownIds).to.have.members(["notFirst", "notSecond", "notThird", "new"]);
        expect(themes[0].votedUpIds).to.have.members(["first", "second", "third"]);
    });
    it('vote down again', () => {
        changeUserVoteOnTheme(themes[1], false, "first");
        expect(themes[1].votedDownIds).to.have.members(["notFirst", "notSecond", "notThird", "first"]);
        expect(themes[1].votedUpIds).to.have.members(["second", "third"]);
    });
    it('vote down but was up', () => {
        changeUserVoteOnTheme(themes[2], false, "notFirst");
        expect(themes[2].votedDownIds).to.have.members(["notSecond", "notThird"]);
        expect(themes[2].votedUpIds).to.have.members(["first", "second", "third"]);
    });
});



