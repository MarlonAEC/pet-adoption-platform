import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { catchError, Observable, switchMap, throwError } from 'rxjs';
import { AuthResponse } from '../models/user.model';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      const authReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${this.authService.jwtToken.getValue()}`
        }
      });

      return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401 && error.error.message === 'Token has expired') {
          return this.authService.generateNewTokens().pipe(
            switchMap((authResponse: AuthResponse) => {
              const clonedRequest = req.clone({
                setHeaders: {
                  Authorization: `Bearer ${authResponse.jwtToken}`
                }
              });
              return next.handle(clonedRequest);
            })
          );
        } else {
          return throwError(() => new Error(JSON.stringify(error)));
        }
      })
    );
  }
}