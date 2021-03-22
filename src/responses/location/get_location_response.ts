import { Location } from '../../models/location';

export interface GetLocationResponse {
    response: {
        location: Location;
    };
    status: {
        detail: {};
        success: boolean;
    }
}
