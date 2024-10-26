import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_BASE_URL } from '../constants/api';
import { AuthRequest, AuthResponse, User } from '../models/user.model';
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
            this.isLogged.next(true);
            this.jwtToken.next(data.jwtToken);
            this.username.next(data.username);
            this.roles.next(data.roles);
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
  }: User) {
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
        this.isLogged.next(true);
        this.jwtToken.next(data.jwtToken);
        this.username.next(data.username);
        this.roles.next(data.roles);
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
  }
}
