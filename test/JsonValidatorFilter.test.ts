import {JsonValidatorFilter} from "../src/filter";
import {CREDENTIAL_AUTH} from "../src/const/RoutePathAndTypeConst";
import {expect} from "chai";

describe('test filter validation', () => {
    it('credential auth test', async () => {
            const filter = new JsonValidatorFilter();
            await expectThrowsAsync(() => filter.doFilter({routePath: CREDENTIAL_AUTH, requestId: "", data: {foo: "bar"}}));
            await expectThrowsAsync(() => filter.doFilter({routePath: CREDENTIAL_AUTH, requestId: "", data: null}));
            await expectThrowsAsync(() => filter.doFilter({routePath: CREDENTIAL_AUTH, requestId: "", data: undefined}));
            await expectThrowsAsync(() => filter.doFilter({
                routePath: CREDENTIAL_AUTH,
                requestId: "",
                data: {login: "foo"}
            }));
            await expectThrowsAsync(() => filter.doFilter({
                routePath: CREDENTIAL_AUTH,
                requestId: "",
                data: {password: "foo"}
            }));
            await expectThrowsAsync(() => filter.doFilter({
                routePath: CREDENTIAL_AUTH,
                requestId: "",
                data: {bar: "zzz", login: "foo", password: "foo"}
            }));
            await expect(filter.doFilter({
                routePath: CREDENTIAL_AUTH,
                requestId: "",
                data: {login: "bar", password: "foo"}
            })).to.be.ok;
        }
    )
});


const expectThrowsAsync = async (method: any) => {
    try {
        await method()
    } catch (error) {

        expect(error).to.be.an("Error");
        expect(error.message).to.equal("Incorrect request json type.")
    }
};