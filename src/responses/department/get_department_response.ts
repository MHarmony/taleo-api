import { Department } from '../../models/department';

export interface GetDepartmentResponse {
    response: {
        department: Department;
    };
    status: {
        detail: {};
        success: boolean;
    }
}
