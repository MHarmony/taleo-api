import { Employee } from '../../models/employee';
import { Pagination } from '../../models/pagination';

export interface GetAllEmployeesResponse {
    response: {
        pagination: Pagination;
        searchResults: {
            employee: Employee;
        }[];
    };
    status: {
        detail: {};
        success: boolean;
    }
}
