export default interface PrimaryRequest<T> {
    routePath: string;
    requestId: string;
    data: T;
}