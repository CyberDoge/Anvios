import {checkedErrorMarker} from "./CheckedErrorMarker";

const DEFAULT_MESSAGE = "You have been already registered";

@checkedErrorMarker
export class AlreadyRegisteredError extends Error {
    constructor(message?: string) {
        super(message || DEFAULT_MESSAGE);
    }
}