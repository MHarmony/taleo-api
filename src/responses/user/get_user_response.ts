import { User } from '../../models/user';

export interface GetUserResponse {
    response: {
        user: User;
    };
    status: {
        detail: {};
        success: boolean;
    }
}
