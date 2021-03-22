export interface EmployeeActionResponse {
    response: {
        employeeId: number;
        object: string;
    };
    status: {
        detail: {};
        success: boolean;
    }
}
