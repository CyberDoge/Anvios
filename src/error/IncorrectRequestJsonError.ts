import {checkedErrorMarker} from "./CheckedErrorMarker";

const DEFAULT_MESSAGE = "Incorrect request json type.";

@checkedErrorMarker
export class IncorrectRequestJsonError extends Error {
    constructor(message?: string) {
        super(message || DEFAULT_MESSAGE);
    }
}