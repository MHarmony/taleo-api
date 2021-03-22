export interface Division {
    id: number;
    divisionName: string;
    divisionCode: string;
    creationDate: Date;
    lastUpdated: Date;
    description: string;
    entityType: string;
    associatedUsers: number[];
    associatedDepartments: number[];
    requisitionApprovers: number[];
    relationshipUrls: {
        associatedDepartments: string;
        requisitionApprovers: string;
        associatedUsers: string;
    }
}
