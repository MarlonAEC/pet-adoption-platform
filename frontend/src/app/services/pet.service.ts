import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pet, PetResponse } from '../models/pet.model';
import { API_BASE_URL } from '../constants/api';

@Injectable({
  providedIn: 'root'
})
export class PetService {

  constructor(private readonly http: HttpClient) { }

  getAllPets(page: number = 0, size: number = 15): Observable<PetResponse> {
    return this.http.get<PetResponse>(`${API_BASE_URL}/pets?page=${page}&size=${size}`);
  }

  getPetById(id: number): Observable<Pet> {
    return this.http.get<Pet>(`${API_BASE_URL}/${id}`);
  }
}
