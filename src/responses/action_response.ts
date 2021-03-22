export interface ActionResponse {
    response: {
        id: number;
        object: string;
    };
    status: {
        detail: {};
        success: boolean;
    }
}
