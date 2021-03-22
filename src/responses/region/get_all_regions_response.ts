import { Region } from '../../models/region';

export interface GetAllRegionsResponse {
    response: {
        regions: {
            region: Region;
        }[];
    };
    status: {
        detail: {};
        success: boolean;
    }
}
