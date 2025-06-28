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
  private apiUrl = 'https://eightbits.onrender.com/api/v1';

  constructor(private http: HttpClient) {}

  // ✅ Obtener favoritos del usuario
  getFavorites(userId: string): Observable<Game[]> {
    return this.http.get<Game[]>(`${this.apiUrl}/${userId}/favorites`);
  }

  // ✅ Agregar favorito
  addFavorite(userId: string, body: { gameId: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/${userId}/favorites`, body, {
      responseType: 'text' as 'json'
    });
  }

  // ✅ Eliminar favorito
  removeFavorite(userId: string, gameId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${userId}/favorites/${gameId}`);
  }
}
