import * as mongoose from "mongoose";
import User from "../src/model/User";
import {connectToDb} from "../src/db/DbConfig";
import {expect} from "chai";
import {hash} from "bcrypt";
import dotenv from "dotenv";

dotenv.config();
const BCRYPT_SALT_ROUNDS = +(process.env.bcryptSaltRounds || 2);

async function initUserData() {
    const users = [];
    for (let i = 0; i < 10; i++) {
        users.push({login: `pupa${i}`, password: await hash(`pass${i}`, BCRYPT_SALT_ROUNDS), token: `token${i}`})
    }
    await User.insertMany(users)
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
        expect(await User.findIdByLoginAndPassword("pupa1", "pass1")).to.not.null;
        expect(await User.findIdByLoginAndPassword("pupa1", "pass1")).to.length(24);
        expect(await User.findIdByLoginAndPassword("pupa1", "pass2")).to.null;
        expect(await User.findIdByLoginAndPassword("", "")).to.null;
        expect(await User.findIdByLoginAndPassword("Pupa1", "pass1")).to.null;
    });
    it('auth user by token', async () => {
        expect(await User.findIdByToken("token1")).to.not.null;
        expect(await User.findIdByToken("token9")).to.not.null;
        expect(await User.findIdByToken("token")).to.null;
        expect(await User.findIdByToken("token20")).to.null;
        expect(await User.findIdByToken("token2")).to.not.null;
    });
});



