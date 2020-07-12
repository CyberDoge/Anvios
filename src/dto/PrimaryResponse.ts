export default class PrimaryResponse {
    data: any;
    successfully: boolean;
    reason?: string;

    constructor(data: any, successfully: boolean = true, reason?: string) {
        this.data = data;
        this.successfully = successfully;
        this.reason = reason;
    }
}