import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, BehaviorSubject, catchError } from 'rxjs';
import { LoginRequest, LoginResponse, User } from '../interfaces/auth.interfaces';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `https://eightbits.onrender.com/api/v1/auth`;
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

            // Store user info
            const user: User = {
              name: response.name,
              role: response.role
            };
            console.log('User info to store:', user);
            localStorage.setItem('user', JSON.stringify(user));
            console.log('User info stored in localStorage');

            this.currentUserSubject.next(user);
            console.log('User subject updated');
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

}