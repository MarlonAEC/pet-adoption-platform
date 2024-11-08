import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { API_BASE_URL } from '../constants/api';
import { Page } from '../models/pet.model';
import { AdoptionApplication } from '../models/application.model';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  constructor(
    private readonly authService: AuthService,
    private readonly http: HttpClient
  ) { }

  fetchApplications(page: number = 0, size: number = 15) {
    if(this.authService.isAdmin.getValue()){
      return this.http.get<Page<AdoptionApplication>>(`${API_BASE_URL}/adoption-applications?page=${page}&size=${size}`, {
        headers: {
          'Authorization': `Bearer ${this.authService.jwtToken.getValue()}`,
          'Content-Type': 'application/json',
        },
      })
    } else {
      throw new Error('Unauthorized');
    }
  }

  approveApplication(application: AdoptionApplication) {
    if(this.authService.isAdmin.getValue()){
      return this.http.put<AdoptionApplication>(`${API_BASE_URL}/adoption-applications/${application.id}`, {
        status: 'APPROVED'
      }, {
        headers: {
          'Authorization': `Bearer ${this.authService.jwtToken.getValue()}`,
          'Content-Type': 'application/json',
        },
      })
    } else {
      throw new Error('Unauthorized');
    }
  }
}
