import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Game {
  id: string;
  title: string;
  developer: string;
  coverImage: string;
  rating: number;
  category: string[];
  platforms: string[];
  price: string;
}

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  private apiUrl = environment.backendEndpoint + '/favorites';

  constructor(private http: HttpClient) {}

  getFavorites(): Observable<Game[]> {
    return this.http.get<Game[]>(this.apiUrl);
  }

  addFavorite(game: Game): Observable<any> {
    return this.http.post(this.apiUrl, game);
  }

  removeFavorite(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
