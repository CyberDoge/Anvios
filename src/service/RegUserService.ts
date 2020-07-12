import LoginData from "../dto/LoginData";
import User, {IUserSchema} from "../model/User";
import {validateLoginAndPassword} from "../validator/UserCredationalsValidator";
import InvalidRegCredentialsError from "../error/InvalidRegCredentialsError";
import {v1 as uuidv1} from 'uuid';
import {hash} from "bcrypt";

const BCRYPT_SALT_ROUNDS = 12;

export async function regUser({login, password, token}: LoginData): Promise<IUserSchema | null> {
    if (!validateLoginAndPassword(login, password)) {
        throw new InvalidRegCredentialsError("Does not meet the requirements")
    }
    if (await User.exists({login})) {
        throw new InvalidRegCredentialsError("Login has been already taken")
    }
    try {
        const hashedPassword = await hash(password, BCRYPT_SALT_ROUNDS);
        if (token) {
            return await User.findOneAndUpdate({token}, {$set: {login, password: hashedPassword}}).lean()
        }
        return await User.create({login, password: hashedPassword, token: uuidv1()})
    } catch (e) {
        // todo normal log
        console.error(e)
    }
    return null;
}

export async function regUserAnonymous(): Promise<IUserSchema | null> {
    try {
        return await User.create({token: uuidv1()});
    } catch (e) {
        // todo normal log
        console.error(e)
    }
    return null
}
