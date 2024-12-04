import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pet, PetResponse } from '../models/pet.model';
import { API_BASE_URL } from '../constants/api';
import { AuthService } from './auth.service';
import { AdoptionApplication } from '../models/application.model';

@Injectable({
  providedIn: 'root'
})
export class PetService {

  constructor(
    private readonly http: HttpClient,
    private readonly authService: AuthService
  ) { }

  getAllPets(page: number = 0, size: number = 15): Observable<PetResponse> {
    return this.http.get<PetResponse>(`${API_BASE_URL}/pets?page=${page}&size=${size}`);
  }

  getPetsByFilter(filter: string, page: number = 0, size: number = 15): Observable<PetResponse> {
    return this.http.get<PetResponse>(`${API_BASE_URL}/pets?filter=${filter}&page=${page}&size=${size}`);
  }

  getPetById(id: number): Observable<Pet> {
    return this.http.get<Pet>(`${API_BASE_URL}/pets/${id}`);
  }

  createPetByAdmin(pet: Pet): Observable<Pet> {
    if(!this.authService.username.getValue()){
      throw new Error('You must be logged in to create a pet');
    }
    if(!this.authService.isAdmin.getValue()){
      throw new Error('You must be an admin to create a pet');
    }
    return this.http.post<Pet>(`${API_BASE_URL}/pets`, pet, {
      headers: {
        authorization: `Bearer ${this.authService.jwtToken.getValue()}`,
        'Content-Type': 'application/json'
      }
    });
  }

  addImagesToPet(petId: number, images: FormData): Observable<Pet> {
    if(!this.authService.username.getValue()){
      throw new Error('You must be logged in to add images to a pet');
    }
    if(!this.authService.isAdminUser()){
      throw new Error('You must be an admin to add images to a pet');
    }
    return this.http.post<Pet>(`${API_BASE_URL}/pet-images/${petId}`, images, {
      headers: {
        authorization: `Bearer ${this.authService.jwtToken.getValue()}`,
      }
    });
  }

  applyToAdoptPet(petId: number): Observable<AdoptionApplication> {
    if(!this.authService.username){
      throw new Error('You must be logged in to apply to adopt a pet');
    }
    return this.http.post<AdoptionApplication>(`${API_BASE_URL}/adoption-applications`, {
      userId: this.authService.username.getValue(),
      petId: petId
    }, {
      headers: {
        authorization: `Bearer ${this.authService.jwtToken.getValue()}`,
        'Content-Type': 'application/json'
      }
    });
  }

  withdrawApplication(petId: number): Observable<AdoptionApplication> {
    if(!this.authService.username){
      throw new Error('You must be logged in to withdraw an application');
    }
    return this.http.put<AdoptionApplication>(`${API_BASE_URL}/adoption-applications/withdraw/${petId}`, {
      headers: {
        authorization: `Bearer ${this.authService.jwtToken.getValue()}`,
        'Content-Type': 'application/json'
      }
    });
  }
}
