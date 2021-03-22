import { Division } from '../../models/division';

export interface GetAllDivisionsResponse {
    response: {
        divisions: {
            division: Division;
        }[];
    };
    status: {
        detail: {};
        success: boolean;
    }
}
