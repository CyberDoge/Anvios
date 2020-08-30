import User, {IUserSchema} from "../../model/User";
import {validateLoginAndPassword} from "../../validator/UserCredationalsValidator";
import InvalidRegCredentialsError from "../../error/InvalidRegCredentialsError";
import {v1 as uuidv1} from 'uuid';
import {hash} from "bcrypt";
import {RegUserRequest} from "../../dto/types/RegUserRequest";

const BCRYPT_SALT_ROUNDS = +(process.env.bcryptSaltRounds || 2);

export async function regUser({login, password, token}: RegUserRequest): Promise<IUserSchema | null> {
    if (!validateLoginAndPassword(login, password)) {
        throw new InvalidRegCredentialsError("Does not meet the requirements")
    }
    if (await User.exists({login})) {
        throw new InvalidRegCredentialsError("Login has been already taken")
    }
    const hashedPassword = await hash(password, BCRYPT_SALT_ROUNDS);
    if (token) {
        return User.findOneAndUpdate({token}, {$set: {login, password: hashedPassword}}).lean();
    }
    return (await User.create({login, password: hashedPassword, token: uuidv1()}));
}

export async function regUserAnonymous(): Promise<IUserSchema> {
    return await User.create({token: uuidv1()});
}
