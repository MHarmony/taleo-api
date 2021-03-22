export interface UserActionResponse {
    response: {
        userId: number;
        object: string;
    };
    status: {
        detail: {};
        success: boolean;
    }
}
