import {checkedErrorMarker} from "./CheckedErrorMarker";

const DEFAULT_MESSAGE = "Some thing gone wrong";

@checkedErrorMarker
export default class InternalServerError extends Error {

    constructor(message?: string) {
        super(message || DEFAULT_MESSAGE);
    }
}