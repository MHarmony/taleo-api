import { Region } from '../../models/region';

export interface GetRegionResponse {
    response: {
        region: Region;
    };
    status: {
        detail: {};
        success: boolean;
    }
}
