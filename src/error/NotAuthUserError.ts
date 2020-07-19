import checkedErrorMarker from "./CheckedErrorMarker";

const DEFAULT_MESSAGE = "User not login. Please, authenticate first";

@checkedErrorMarker
export default class NotAuthUserError extends Error {
    constructor(message?: string) {
        super(message || DEFAULT_MESSAGE);
    }
}