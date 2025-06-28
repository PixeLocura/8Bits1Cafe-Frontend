// src/app/services/review.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Review } from '../shared/interfaces/review.interface';

@Injectable({ providedIn: 'root' })

export class ReviewService {
  private apiUrl = `${environment.backendEndpoint}/reviews`;

  constructor(private http: HttpClient) {}

  // POST: Crear nueva reseña
  crearResena(data: { userId: string; gameId: string; comment: string; rating: number }) {
    const url = `${this.apiUrl}/games/${data.gameId}/users/${data.userId}`;
    return this.http.post(url, {
      comment: data.comment,
      rating: data.rating
    });
  }

  // GET: Obtener reseñas por ID del juego
  obtenerResenasPorJuego(gameId: string) {
    return this.http.get<any[]>(`${this.apiUrl}/games/${gameId}`);
  }

  getUserIdByEmail(email: string): Observable<{ id: string }> {
    return this.http.get<{ id: string }>(`${environment.backendEndpoint}/users/by-email/${email}`);
  }

  postReview(gameId: string, userId: string, review: Review): Observable<any> {
    return this.http.post(`${this.apiUrl}/reviews/games/${gameId}/users/${userId}`, review);
  }

}
