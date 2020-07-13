import CheckedErrorMarker from "./CheckedErrorMarker";

const DEFAULT_MESSAGE = "User not login. Please, authenticate first";

export default class InternalServerError extends Error implements CheckedErrorMarker {
    _checkedErrorBrand: never;

    constructor(message?: string) {
        super(message || DEFAULT_MESSAGE);
    }
}