export interface ErrorResponse {
    response: {};
    status: {
        detail: {
            operation: string;
            errormessage: string;
            error: string;
            errorcode: string;
        };
        success: boolean;
    }
}
