import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Game} from '../../shared/models/game.model';
import { map } from 'rxjs/operators';
import {catchError, Observable, of} from 'rxjs';
import {MOCK_GAMES} from '../../shared/mock/mock-games';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  private baseUrl: string = environment.backendEndpoint

  constructor(private http: HttpClient) { }

  getDealGame(): Observable<Game>{
    const headers = new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    });

    return this.http.get<Game[]>(`${this.baseUrl}/games`, {headers}).pipe(
      map(games => {
        if (!games || games.length === 0) {
          throw new Error('No games available');
        }
        return games[0];
      }),
      catchError(err => {
        console.error('Error loading deal game:', err);
        // return our fixed fallback game so subscribers still get a Game
        return of(MOCK_GAMES[0]);
      })

    );
  }

  getNewReleases(): Observable<Game[]>{
    const headers = new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    });

    return this.http.get<Game[]>(`${this.baseUrl}/games`, {headers}).pipe(
      catchError(err => {
        console.error('Error loading deal game:', err);
        return of(MOCK_GAMES);
      })
    );
  }
}
