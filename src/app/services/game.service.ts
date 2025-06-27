import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Game } from '../shared/interfaces/game.interfaces';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Developer } from '../shared/interfaces/developer.interfaces';


@Injectable({
  providedIn: 'root'
})
export class GameService {
  private apiUrl = `${environment.backendEndpoint}/games`;

  constructor(private http: HttpClient) {}

  getAllGames(): Observable<Game[]> {
    const token = localStorage.getItem('token');

    const headers = {
      Authorization: `Bearer ${token}`
    };

    return this.http.get<Game[]>(this.apiUrl, { headers });
  }


  getGameById(id: string): Observable<Game> {
    const token = localStorage.getItem('token');

    const headers = {
      Authorization: `Bearer ${token}`
    };

    return this.http.get<Game>(`${this.apiUrl}/${id}`, { headers });
  }


  getAllDevelopers(): Observable<Developer[]> {
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.get<Developer[]>(`${environment.backendEndpoint}/developers`, { headers });
  }
}
