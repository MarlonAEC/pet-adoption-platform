import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_BASE_URL } from '../constants/api';
import { AuthRequest, AuthResponse, UserInput } from '../models/user.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { Error } from '../models/error.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLogged = new BehaviorSubject<boolean>(false);
  jwtToken = new BehaviorSubject<string>('');
  username = new BehaviorSubject<string>('');
  roles = new BehaviorSubject<string[]>([]);
  error = new BehaviorSubject<string>('');
  isAdmin = new BehaviorSubject<boolean>(false);

  constructor(private readonly http: HttpClient) { }

  login({
    username = "user1", 
    password = "password1"
  }: AuthRequest): Observable<AuthResponse> {
    const res: Observable<AuthResponse> = this.http.post<AuthResponse>(`${API_BASE_URL}/auth/login`, { username, password }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    res.subscribe({
        next: (data) => {
            this.updateAuthState(data);
            this.storeCredentials(data.jwtToken, data.username, data.roles);
        },
        error: (error: Error) => this.error.next(error.message)
    });
    return res;
  }

  createAccount({
    username,
    password,
    name,
    email,
    address
  }: UserInput) {
    const res = this.http.post<AuthResponse>(`${API_BASE_URL}/auth/sign-up`, {
      username,
      password,
      name,
      email,
      address
  }, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
  res.subscribe({
    next: (data) => {
        this.updateAuthState(data);
        this.storeCredentials(data.jwtToken, data.username, data.roles);
    },
    error: (error: HttpErrorResponse) => {
      console.log(error);
      this.error.next(error.error.message);
    }
  });
  return res;
}

  logout(){
    this.isLogged.next(false);
    this.jwtToken.next('');
    this.username.next('');
    this.roles.next([]);
    this.cleanLocalStorage();
  }

  storeCredentials(jwtToken: string, username: string, roles: string[]) {
    try {
      localStorage.setItem('jwtToken', jwtToken);
      localStorage.setItem('username', username);
      localStorage.setItem('roles', JSON.stringify(roles));
    } catch (error) {
        console.error('Error storing credentials: ', error);
    }
  }

  retrieveCredentials() {
    try {
      const jwtToken = localStorage.getItem('jwtToken');
      const username = localStorage.getItem('username');
      const roles = JSON.parse(localStorage.getItem('roles') || '[]');
      if (jwtToken && username && roles) {
          this.updateAuthState({ jwtToken, username, roles });
      }
    } catch (error) {
        console.error('Error retrieving credentials: ', error);
    }
  }

  updateAuthState(data: AuthResponse) {
    this.isLogged.next(true);
    this.jwtToken.next(data.jwtToken);
    this.username.next(data.username);
    this.roles.next(data.roles);
    if(this.roles.value.includes('ROLE_ADMIN')){
      this.isAdmin.next(true);
    }
  }

  cleanLocalStorage() {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('username');
    localStorage.removeItem('roles');
  }
}
