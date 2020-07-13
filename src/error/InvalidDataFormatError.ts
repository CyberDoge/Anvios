import CheckedErrorMarker from "./CheckedErrorMarker";

const DEFAULT_MESSAGE = "Invalid sent data format.";

export default class InvalidDataFormatError extends Error implements CheckedErrorMarker {
    _checkedErrorBrand: never;

    constructor(message?: string) {
        super(message || DEFAULT_MESSAGE);
    }
}