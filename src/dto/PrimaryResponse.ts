export default class PrimaryResponse<DataType> {
    data: DataType;
    error?: string | object;
    requestId: string;

    constructor(data: DataType, requestId: string, error?: string | object) {
        this.data = data;
        this.requestId = requestId;
        this.error = error;
    }
}