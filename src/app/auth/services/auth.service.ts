import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, BehaviorSubject, catchError, throwError, of } from 'rxjs';
import { LoginRequest, LoginResponse, User } from '../interfaces/auth.interfaces';
import { environment } from '../../../environments/environment';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.backendEndpoint}/auth`;
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {
    console.log('AuthService initialized');
    console.log('API URL:', this.apiUrl);
    console.log('Environment:', environment);

    // Check for existing token on startup
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    if (token && user) {
      console.log('Found existing token and user');
      this.currentUserSubject.next(JSON.parse(user));
    }


  }

  login(credentials: LoginRequest): Observable<LoginResponse> {
    console.log('Login attempt with:', { email: credentials.email, attempt: true });
    console.log('API URL:', this.apiUrl);

    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, credentials)
      .pipe(
        tap({
          next: (response) => {
            console.log('Login successful. Full response:', response);
            console.log('Token received:', response.token ? 'Yes' : 'No');

            // Store token
            localStorage.setItem('token', response.token);
            console.log('Token stored in localStorage');
          },
          error: (error) => {
            console.error('Login error details:', {
              status: error.status,
              statusText: error.statusText,
              error: error.error,
              message: error.message
            });
            throw error;
          }
        }),

        switchMap(response => this.getProfile(credentials.email).pipe(
          map(() => response)
        ))
      );
  }

  getProfile(email: string): Observable<User> {
    const token = this.getToken();
    if (!token) {
      return of(null as any);
    }
    return this.http
      .get<User>(`${environment.backendEndpoint}/users/by-email/${email}`)
      .pipe(
        tap(user => {
          console.log('Fetched profile:', user);
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUserSubject.next(user);
        }),
        catchError(err => {
          console.error('Failed to fetch profile', err);
          return throwError(() => err);
        })
      );
  }

  logout(): void {
    // Clear stored data
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.currentUserSubject.next(null);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  register(userData: {
    name: string;
    lastname: string;
    username: string;
    email: string;
    password: string;
    countryIso: string;
  }): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${this.apiUrl}/register/admin`, userData);
  }


  getUserId(): string | null {
    const token = localStorage.getItem('token');
    if (!token) {
      console.warn('No token found in localStorage');
      return null;
    }

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      console.log('Decoded JWT payload:', payload);
      return payload.userId;
    } catch (err) {
      console.error('Error decoding JWT:', err);
      return null;
    }
  }


  updateProfile(updates: Partial<User>) {
    updates.id = this.currentUserSubject.value?.id
    updates.role = this.currentUserSubject.value?.role;

    const curUser = this.currentUserSubject.value;
    if (curUser == null) return;
    curUser.name = updates.name ?? "";
    curUser.lastname = updates.lastname ?? "";
    curUser.username = updates.username ?? "";
    curUser.email = updates.email ?? "";

    return this.http.put<User>(`${environment.backendEndpoint}/users/${updates.id}`, curUser).pipe(
      tap(user => {
        console.log('Updated profile:', user);
        localStorage.setItem('user', JSON.stringify(user));
        this.currentUserSubject.next(user);
      })
    )
  }
}
