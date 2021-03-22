import { Department } from '../../models/department';

export interface GetAllDepartmentsResponse {
    response: {
        departments: {
            department: Department;
        }[];
    };
    status: {
        detail: {};
        success: boolean;
    }
}
