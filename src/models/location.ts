export interface Location {
    id: number;
    locationName: string;
    locationCode: string;
    description: string;
    phone: string;
    address: string;
    city: string;
    zipCode: string;
    state: string;
    countryCode: string;
    regionId: number;
    timeZone: string;
    directions: string;
    interviewRooms: string;
    entityType: string;
    requisitionApprovers: number[];
    relationshipUrls: {
        requisitionApprovers: string;
    }
}
