import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { API_BASE_URL } from '../constants/api';
import { Page } from '../models/pet.model';
import { AdoptionApplication } from '../models/applicaiton.model';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  constructor(
    private readonly authService: AuthService,
    private readonly http: HttpClient
  ) { }

  fetchApplications() {
    if(this.authService.isAdmin.getValue()){
      return this.http.get<Page<AdoptionApplication>>(`${API_BASE_URL}/adoption-applications`, {
        headers: {
          'Authorization': `Bearer ${this.authService.jwtToken.getValue()}`,
          'Content-Type': 'application/json',
        },
        withCredentials: false
      })
    } else {
      throw new Error('Unauthorized');
    }
  }
}