export interface Department {
    id: number;
    creationDate: Date;
    lastUpdated: Date;
    departmentName: string;
    departmentCode: string;
    description: string;
    entityType: string;
    associatedUsers: number[];
    requisitionApprovers: number[];
    relationshipUrls: {
        requisitionApprovers: string;
        associatedUsers: string;
    }
}
