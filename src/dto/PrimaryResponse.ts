export default class PrimaryResponse {
    data: any;
    error?: string | object;
    requestId: string;

    constructor(data: any, requestId: string, error?: string | object) {
        this.data = data;
        this.requestId = requestId;
        this.error = error;
    }
}