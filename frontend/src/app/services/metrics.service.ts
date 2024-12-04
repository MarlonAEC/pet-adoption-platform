import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_BASE_URL } from '../constants/api';
import { AuthService } from './auth.service';
import { PetMetrics } from '../models/pet.model';
import { ApplicationsMetrics } from '../models/application.model';
import { UserMetrics } from '../models/user.model';
import { BreedsAndSpeciesInfo } from '../models/ui.model';

@Injectable({
  providedIn: 'root'
})
export class MetricsService {
  constructor(
    private readonly http: HttpClient,
    private readonly authService: AuthService
  ) { }

  fetchPetMetrics() {
    return this.http.get<PetMetrics>(`${API_BASE_URL}/metrics/pets`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.authService.jwtToken.getValue()}`
      }
    });
  }

  fetchApplicationMetrics() {
    return this.http.get<ApplicationsMetrics>(`${API_BASE_URL}/metrics/applications`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.authService.jwtToken.getValue()}`
      }
    });
  }

  fetchUserMetrics() {
    return this.http.get<UserMetrics>(`${API_BASE_URL}/metrics/users`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.authService.jwtToken.getValue()}`
      }
    });
  }

  fetchBreedsAndSpeciesMetrics() {
    return this.http.get<BreedsAndSpeciesInfo>(`${API_BASE_URL}/metrics/breeds-and-species`, {
      headers: {
        'Content-Type': 'application/json',
      }
    });
  }
}
