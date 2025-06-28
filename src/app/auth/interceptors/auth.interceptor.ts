import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = localStorage.getItem('token'); // Direct check for debugging

  console.log('Auth Interceptor - Request URL:', req.url);
  console.log('Auth Interceptor - Request Method:', req.method);
  console.log('Auth Interceptor - Token present:', !!token);

  if (token) {
    console.log('Auth Interceptor - Adding token to request');
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  return next(req).pipe(
    tap({
      next: (event) => {
        console.log('Auth Interceptor - Response event:', event);
      },
      error: (error) => {
        console.error('Auth Interceptor - Error occurred:', {
          status: error.status,
          statusText: error.statusText,
          url: error.url,
          message: error.message,
          error: error.error
        });
      }
    }),
    catchError(error => {
      if (error.status === 401) {
        console.error('Auth Interceptor - Unauthorized request');
        // Could handle token refresh here if needed
      }
      return throwError(() => error);
    })
  );
}