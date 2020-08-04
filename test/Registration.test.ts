import User from "../src/model/User";
import {connectToDb} from "../src/db/DbConfig";
import * as mongoose from "mongoose";
import {expect} from "chai";
import {regUser, regUserAnonymous} from "../src/service/userService/RegUserService";

import dotenv from "dotenv";

dotenv.config();

async function initUserData() {

}

before(() => {
    process.env.DATABASE = "anvios_test";
    connectToDb();
    return mongoose.connections[0].dropDatabase();

});

beforeEach(() => {
    return initUserData();
});
afterEach(() => {
    return User.deleteMany({});
});
after(() => {
    return mongoose.connections[0].dropDatabase();
});
describe('#auth()', function () {
    it('auth user by credentials', async () => {
        const token = (await regUserAnonymous())?.token;
        expect(token).not.null.not.undefined;
        expect(regUser({login: "login", password: "password", token: "token"})).not.throw;
        expect(regUser({login: "login", password: "password", token: token!.toString()})).throw;
        expect(regUser({login: "loginnew", password: "password", token: token!.toString()})).not.throw;
    });
});


