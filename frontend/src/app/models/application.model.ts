import { Pet } from "./pet.model";
import { UserResponse } from "./user.model";

export interface AdoptionApplication {
    id: string;
    user: UserResponse;
    pet: Pet;
    status: ApplicationStatus;
    createdAt: string;
    updatedAt: string;
    [key: string]: unknown;
}

export enum ApplicationStatus {
    PENDING = 'PENDING',
    APPROVED = 'APPROVED',
    CANCELED = 'CANCELED',
    WITHDRAWN = 'WITHDRAWN',
    NONE = 'N/A',
}

export interface ApplicationsMetrics {
    totalApprovedApplications: number;
    totalApplications: number;
    totalCanceledApplications: number;
    totalPendingApplications: number;
}