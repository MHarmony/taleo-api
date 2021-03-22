export interface LoginResponse {
    response: {
        authToken: string;
    };
    status: {
        detail: {};
        success: boolean;
    }
}
