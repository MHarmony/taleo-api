export interface Region {
    id: number;
    regionName: string;
    regionCode: string;
    creationDate: Date;
    lastUpdated: Date;
    description: string;
    entityType: string;
    associatedLocations: number[];
    associatedUsers: number[];
    requisitionApprovers: number[];
    relationshipUrls: {
        associatedLocations: string;
        associatedUsers: string;
        requisitionApprovers: string;
    }
}
