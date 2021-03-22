import { Employee } from '../../models/employee';

export interface GetEmployeeResponse {
    response: {
        employee: Employee;
    };
    status: {
        detail: {};
        success: boolean;
    }
}
