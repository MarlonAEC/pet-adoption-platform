import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pet, PetResponse } from '../models/pet.model';
import { API_BASE_URL } from '../constants/api';
import { AuthService } from './auth.service';
import { AdoptionApplication } from '../models/applicaiton.model';

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
}
