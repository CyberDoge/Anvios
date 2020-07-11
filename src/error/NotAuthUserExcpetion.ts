export default class NotAuthUserError extends Error {
    static DEFAULT_MESSAGE = "User not login. Please, authenticate first";

    constructor(message?: string) {
        super(message || NotAuthUserError.DEFAULT_MESSAGE);
    }
}