import {checkedErrorMarker} from "./CheckedErrorMarker";

const DEFAULT_MESSAGE = "Incorrect request json type.";

@checkedErrorMarker
export class IncorrectRequestJsonError extends Error {
    constructor(reasons?: string) {
        if (reasons) {
            super(`${DEFAULT_MESSAGE}\nreasons: ${reasons}`);
        } else {
            super(DEFAULT_MESSAGE);

        }
    }
}