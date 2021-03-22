import { Location } from '../../models/location';

export interface GetAllLocationsResponse {
    response: {
        locations: {
            location: Location;
        }[];
    };
    status: {
        detail: {};
        success: boolean;
    }
}
