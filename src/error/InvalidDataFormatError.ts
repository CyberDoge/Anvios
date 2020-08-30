import {checkedErrorMarker} from "./CheckedErrorMarker";

const DEFAULT_MESSAGE = "Invalid sent data format.";

@checkedErrorMarker
export default class InvalidDataFormatError extends Error {
    constructor(message?: string) {
        super(message || DEFAULT_MESSAGE);
    }
}