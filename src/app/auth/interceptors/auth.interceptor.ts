import { HttpInterceptorFn, HttpResponse, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { environment } from '../../../environments/environment';
import { catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';

export const AuthInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next) => {
  const authService = inject(AuthService);
  const token = localStorage.getItem('token');

  // ⚙️ Si es relativa, conviértela. Si ya trae api/v1, quítalo para que no se duplique.
  const isRelative = req.url.startsWith('/');
  let finalUrl = req.url;

  if (isRelative) {
    if (req.url.startsWith('/api/v1')) {
      // Elimina el primer `/api/v1` porque ya está en backendEndpoint
      finalUrl = req.url.replace('/api/v1', '');
    }
    finalUrl = `${environment.backendEndpoint}${finalUrl}`;
  }

  let modifiedReq = req.clone({ url: finalUrl });

  // Solo games son públicos
  const isPublic = modifiedReq.url.includes('/games');

  console.log('Auth Interceptor - Request URL:', modifiedReq.url);
  console.log('Auth Interceptor - Is Public:', isPublic);
  console.log('Auth Interceptor - Token present:', !!token);

  if (token && !isPublic) {
    console.log('Auth Interceptor - Adding token to request');
    modifiedReq = modifiedReq.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  return next(modifiedReq).pipe(
    tap({
      next: (event) => {
        if (event instanceof HttpResponse) {
          console.log('Auth Interceptor - Response event:', event);
        }
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
      }
      return throwError(() => error);
    })
  );
};
