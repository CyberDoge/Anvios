import validator from "validator";

export function validateLoginAndPassword(login?: string, password?: string) {
    return login && password &&
        validator.isLength(login, {max: 20, min: 3}) && validator.isLength(password, {max: 45, min: 4})
}