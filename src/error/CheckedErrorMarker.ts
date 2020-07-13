export default interface CheckedErrorMarker {
    _checkedErrorBrand: never;
}

export function isCheckedError(error: Error | CheckedErrorMarker): error is CheckedErrorMarker & Error {
    return '_checkedErrorBrand' in error
}