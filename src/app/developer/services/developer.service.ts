import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, catchError, throwError, map } from 'rxjs';
import { Developer } from '../interfaces/developer.interfaces';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DeveloperService {
  private apiUrl = environment.backendEndpoint; // 👉 Asegúrate que termine SIN slash: ej: http://localhost:8080/api/v1

  constructor(private http: HttpClient) {}

  getDeveloper(id: string): Observable<Developer> {
    console.log(`Fetching developer with ID: ${id}`);
    console.log(`Using API URL: ${this.apiUrl}`);

    const headers = new HttpHeaders({
      Accept: 'application/json',
      'Content-Type': 'application/json',
    });

    return this.http
      .get<Developer>(`${this.apiUrl}/developers/${id}`, { headers })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error('Error fetching developer:', error);
          return throwError(() => error);
        })
      );
  }

  createDeveloper(data: {
    name: string;
    description: string;
    website: string;
    profilePictureUrl?: string;
  }): Observable<Developer> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    });

    return this.http
      .post<Developer>(`${this.apiUrl}/developers`, data, { headers })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error('Error creating developer:', error);
          return throwError(() => error);
        })
      );
  }

  checkHasDeveloperProfile(): Observable<{ exists: boolean; developerId: string | null }> {
    return this.http.get<{ exists: boolean; developerId: string | null }>(
      `${this.apiUrl}/developers/me/exists`
    );
  }
}
