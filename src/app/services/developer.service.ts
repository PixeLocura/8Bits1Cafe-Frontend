import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface DeveloperDTO {
  id?:string;
  name: string;
  description: string;
  website: string;
}

@Injectable({
  providedIn: 'root'
})
export class DeveloperService {
  private apiUrl = `${environment.backendEndpoint}/developers`;

  constructor(private http: HttpClient) {}

  createDeveloper(developer: DeveloperDTO): Observable<DeveloperDTO> {
    return this.http.post<DeveloperDTO>(this.apiUrl, developer);
  }
}
