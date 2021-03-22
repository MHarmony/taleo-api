import { Division } from '../../models/division';

export interface GetDivisionResponse {
    response: {
        division: Division;
    };
    status: {
        detail: {};
        success: boolean;
    }
}
