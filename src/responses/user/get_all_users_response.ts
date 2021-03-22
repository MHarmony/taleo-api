import { User } from '../../models/user';
import { Pagination } from '../../models/pagination';

export interface GetAllUsersResponse {
    response: {
        pagination: Pagination;
        searchResults: {
            user: User;
        }[];
    };
    status: {
        detail: {};
        success: boolean;
    }
}
