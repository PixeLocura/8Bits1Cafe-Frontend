import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface FavoriteGame {
  userId: string;
  gameId: string;
  title: string;
  developerName: string;
  coverUrl: string;
  price: number;
}

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  private apiUrl = environment.backendEndpoint;

  constructor(private http: HttpClient) {}

  getFavorites(userId: string): Observable<FavoriteGame[]> {
    return this.http.get<FavoriteGame[]>(`${this.apiUrl}/${userId}/favorites`);
  }

  removeFavorite(userId: string, gameId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${userId}/favorites/${gameId}`, {
      responseType: 'text'
    });
  }

  addFavorite(userId: string, gameId: string): Observable<any> {
    return this.http.post(
      `${environment.backendEndpoint}/${userId}/favorites`,
      { gameId },
      { responseType: 'text' }
    );
  }
  
  
  
  
}
