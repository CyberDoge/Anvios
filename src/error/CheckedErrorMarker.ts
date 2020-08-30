export function checkedErrorMarker<T extends { new(message?: string): {} }>(constructor: T) {
    constructor.prototype._isCheckedErrorBrand = true
}

export function isCheckedError(error: Error): boolean {
    return '_isCheckedErrorBrand' in error && error['_isCheckedErrorBrand']
}
