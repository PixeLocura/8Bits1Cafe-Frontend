import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, BehaviorSubject } from 'rxjs';
import { LoginRequest, LoginResponse, User } from '../interfaces/auth.interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://rp5.local:8080/api/v1/auth';
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {
    // Check for existing token on startup
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    if (token && user) {
      this.currentUserSubject.next(JSON.parse(user));
    }
  }

  login(credentials: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, credentials)
      .pipe(
        tap({
          next: (response) => {
            console.log('Login successful:', response);
            // Store token
            localStorage.setItem('token', response.token);
            // Store user info
            const user: User = {
              name: response.name,
              role: response.role
            };
            localStorage.setItem('user', JSON.stringify(user));
            this.currentUserSubject.next(user);
          },
          error: (error) => {
            console.error('Login error:', error);
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
}
