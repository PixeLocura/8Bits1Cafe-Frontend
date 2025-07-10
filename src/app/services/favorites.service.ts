import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {BehaviorSubject, Observable, tap} from 'rxjs';
import { environment } from '../../environments/environment';
import {Favourites} from '../profile/components/favourites/favourites';
import {AuthService} from '../auth/services/auth.service';

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
  private favouritesSubject = new BehaviorSubject<FavoriteGame[]>([])
  favourites = this.favouritesSubject.asObservable()

  constructor(private http: HttpClient, private authService: AuthService) {
    authService.currentUser$.subscribe(user=>{
      if(user == null) return;
      this.http.get<FavoriteGame[]>(`${this.apiUrl}/${user.id}/favorites`).subscribe(favourites=>{
        this.favouritesSubject.next(favourites);
      })
    })

  }

  triggerReload(){
    this.http.get<FavoriteGame[]>(`${this.apiUrl}/${this.authService.getCurrentUser()?.id}/favorites`).subscribe(favourites=>{
      this.favouritesSubject.next(favourites);
    })
  }

  getFavorites(userId: string): Observable<FavoriteGame[]> {
    return this.favourites;
  }

  removeFavorite(userId: string, gameId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${userId}/favorites/${gameId}`, {
      responseType: 'text'
    }).pipe(
      tap(()=> this.triggerReload())
    );
  }

  addFavorite(userId: string, gameId: string): Observable<any> {
    return this.http.post(
      `${environment.backendEndpoint}/${userId}/favorites`,
      { gameId },
      { responseType: 'text' }
    ).pipe(
      tap(()=>this.triggerReload())
    );
  }




}
