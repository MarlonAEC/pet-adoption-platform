import { Pet } from "./pet.model";
import { UserResponse } from "./user.model";

export interface AdoptionApplication {
    id: string;
    user: UserResponse;
    pet: Pet;
    status: string;
    createdAt: string;
    updatedAt: string;
    [key: string]: unknown;
}