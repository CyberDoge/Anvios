import {JsonValidatorFilter} from "../src/filter";
import {CREATE_THEME, CREDENTIAL_AUTH, REG_ANON} from "../src/const/RoutePathAndTypeConst";
import {assert, expect} from "chai";

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
        expect(await filter.doFilter({
            routePath: CREDENTIAL_AUTH,
            requestId: "",
            data: {login: "bar", password: "foo"}
        })).to.be.undefined;
        await expectThrowsAsync(() => filter.doFilter({
            routePath: CREDENTIAL_AUTH,
            requestId: "",
            data: {login: 123, password: "foo"}
        }));
        }
    );

    it('new theme request', async () => {
            const filter = new JsonValidatorFilter();
            await expectThrowsAsync(() => filter.doFilter({routePath: CREATE_THEME, requestId: "", data: {foo: "bar"}}));
            await expectThrowsAsync(() => filter.doFilter({routePath: CREATE_THEME, requestId: "", data: null}));
            await expectThrowsAsync(() => filter.doFilter({routePath: CREATE_THEME, requestId: "", data: undefined}));
            await expectThrowsAsync(() => filter.doFilter({
                routePath: CREATE_THEME,
                requestId: "",
                data: {bar: "zz", description: "bar"}
            }));
            await expectThrowsAsync(() => filter.doFilter({
                routePath: CREATE_THEME,
                requestId: "",
                data: {bar: "zz", title: "dddd", description: {bar: "bar"}}
            }));
            await expectThrowsAsync(() => filter.doFilter({
                routePath: CREATE_THEME,
                requestId: "",
                data: {bar: "zz", title: "foo", description: "bar"}
            }));
            expect(await filter.doFilter({
                routePath: CREATE_THEME,
                requestId: "",
                data: {title: "foo"}
            })).to.be.undefined;
            expect(await filter.doFilter({
                routePath: CREATE_THEME,
                requestId: "",
                data: {title: "foo", description: "bar"}
            })).to.be.undefined;
        }
    )

    it('void request', async () => {
            const filter = new JsonValidatorFilter();
            await expectThrowsAsync(() => filter.doFilter({routePath: REG_ANON, requestId: "", data: {foo: "bar"}}));
            await expectThrowsAsync(() => filter.doFilter({routePath: REG_ANON, requestId: "", data: 1}));
            expect(await filter.doFilter({
                routePath: REG_ANON,
                requestId: "",
                data: null
            })).to.be.undefined;
            expect(await filter.doFilter({routePath: REG_ANON, requestId: "", data: {}})).to.be.undefined;
            expect(await filter.doFilter(JSON.parse(`{
                "routePath": "${REG_ANON}",
                "requestId": "",
                "data": {}
                }`))
            ).to.be.undefined;
        }
    )
});

const expectThrowsAsync = async (method: any) => {
    try {
        await method()
    } catch (error) {
        expect(error).to.be.an("Error");
        expect(error.message).to.match(/^Incorrect request json type./);
        return;
    }
    assert.fail("no throw")

}