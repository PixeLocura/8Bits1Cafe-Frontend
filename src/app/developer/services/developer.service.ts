import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Developer } from '../interfaces/developer.interfaces';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DeveloperService {
  private apiUrl = environment.backendEndpoint;

  constructor(private http: HttpClient) { }

  getDeveloper(id: string): Observable<Developer> {
    console.log(`Fetching developer with ID: ${id}`);
    console.log(`Using API URL: ${this.apiUrl}`);

    const headers = new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    });

    return this.http.get<Developer>(`${this.apiUrl}/developers/${id}`, { headers })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error('Error fetching developer:', error);
          console.error('Response:', error.error);
          console.error('Status:', error.status);
          return throwError(() => error);
        })
      );
  }
}
