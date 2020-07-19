import {expect} from "chai";
import {validateNewTheme} from "../src/validator/ThemeValidator";
import {validateLoginAndPassword} from "../src/validator/UserCredationalsValidator";

describe('test theme validation', function () {
    it('theme', async () => {
        expect(validateNewTheme({title: "foo"})).true;
        expect(validateNewTheme({title: ""})).false;
        expect(validateNewTheme({title: "asd", description: "foo"})).true;
        expect(validateNewTheme({title: "", description: "foo"})).false;
        expect(validateNewTheme({title: "", description: ""})).false;
        expect(validateNewTheme({title: "", description: "foo".repeat(100)})).false;
    });
});
describe('test user validation', function () {
    it('user', async () => {
        expect(validateLoginAndPassword("foo", "pass")).true;
        expect(validateLoginAndPassword("foo", "pas")).false;
        expect(validateLoginAndPassword("foo", "")).false;
        expect(validateLoginAndPassword("", "")).false;
        expect(validateLoginAndPassword("aaaaaaaaaaaa", "")).false;
        expect(validateLoginAndPassword("a".repeat(20), "asssssssss")).true;
        expect(validateLoginAndPassword("a".repeat(20), "s".repeat(40))).true;
        expect(validateLoginAndPassword("a".repeat(21), "s".repeat(41))).false;
    });
});

