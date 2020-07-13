import CheckedErrorMarker from "./CheckedErrorMarker";

export default class InvalidRegCredentialsError extends Error implements CheckedErrorMarker {
    _checkedErrorBrand: never;

    constructor(message: string) {
        super(message);
    }
}