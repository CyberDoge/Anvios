import validator from "validator";
import {
    MAX_USER_LOGIN_LENGTH,
    MAX_USER_PASSWORD_LENGTH,
    MIN_USER_LOGIN_LENGTH,
    MIN_USER_PASSWORD_LENGTH
} from "../const/ModelConst";

export function validateLoginAndPassword(login?: string, password?: string): boolean {
    return !!login && !!password &&
        validator.isLength(login!, {
            min: MIN_USER_LOGIN_LENGTH,
            max: MAX_USER_LOGIN_LENGTH
        })
        && validator.isLength(password!, {
            max: MAX_USER_PASSWORD_LENGTH,
            min: MIN_USER_PASSWORD_LENGTH
        })
}