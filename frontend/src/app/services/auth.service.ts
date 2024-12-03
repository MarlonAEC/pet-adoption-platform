import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_BASE_URL } from '../constants/api';
import { AuthAuthority, AuthRequest, AuthResponse, UserInput } from '../models/user.model';
import { BehaviorSubject, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLogged = new BehaviorSubject<boolean>(false);
  jwtToken = new BehaviorSubject<string>('');
  refreshToken = new BehaviorSubject<string>('');
  username = new BehaviorSubject<string>('');
  roles = new BehaviorSubject<AuthAuthority[]>([]);
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
            this.storeCredentials(data);
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
          this.storeCredentials(data);
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
        this.error.next(error.error.message);
      }
    });
    return res;
  }

  generateNewTokens(): Observable<AuthResponse>{
    const refreshToken = this.refreshToken.getValue();

    if(!refreshToken){
      this.logout();
      return throwError(()=> new Error('No refresh token available'));
    }

    const res = this.http.post<AuthResponse>(`${API_BASE_URL}/auth/refresh-token`, { refreshToken }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    res.subscribe({
      next: (data) => {
          this.updateAuthState(data);
          this.storeCredentials(data);
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
    this.refreshToken.next('');
    this.roles.next([]);
    this.cleanLocalStorage();
  }

  storeCredentials(data: AuthResponse) {
    try {
      localStorage.setItem('jwtToken', data.jwtToken);
      localStorage.setItem('refreshToken', data.refreshToken);
      localStorage.setItem('username', data.username);
      localStorage.setItem('roles', JSON.stringify(data.roles));
    } catch (error) {
        console.error('Error storing credentials: ', error);
    }
  }

  retrieveCredentialsFromLocalStorage() {
    try {
      const jwtToken = localStorage.getItem('jwtToken');
      const username = localStorage.getItem('username');
      const roles = JSON.parse(localStorage.getItem('roles') ?? '[]');
      const refreshToken = localStorage.getItem('refreshToken');
      if (jwtToken && username && roles && refreshToken) {
          this.updateAuthState({ jwtToken, username, roles, refreshToken });
      }
    } catch (error) {
        console.error('Error retrieving credentials: ', error);
    }
  }

  isAdminUser(roles?: AuthAuthority[]): boolean {
    if(roles){
      return roles.some((role) => role.authority === 'ROLE_ADMIN');
    }
    return this.roles.value.some((role) => role.authority === 'ROLE_ADMIN');
  }

  updateAuthState(data: AuthResponse) {
    this.isLogged.next(true);
    this.jwtToken.next(data.jwtToken);
    this.username.next(data.username);
    this.refreshToken.next(data.refreshToken);
    this.roles.next(data.roles);
    console.log(data.roles);
    if(this.isAdminUser()){
      this.isAdmin.next(true);
    }
  }

  cleanLocalStorage() {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('username');
    localStorage.removeItem('roles');
  }
}
