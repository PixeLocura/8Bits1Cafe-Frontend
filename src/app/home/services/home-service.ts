import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Game} from '../../shared/models/game.model';
import { map } from 'rxjs/operators';
import {BehaviorSubject, catchError, Observable, of, tap} from 'rxjs';
import {MOCK_GAMES} from '../../shared/mock/mock-games';
import {User} from '../../auth/interfaces/auth.interfaces';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  private baseUrl: string = environment.backendEndpoint

  constructor(private http: HttpClient) { }

  private newReleases = new BehaviorSubject<Game[] | null>(null);
  newReleases$ = this.newReleases.asObservable()
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
      }),
      tap({
        next : (response) => {
          this.newReleases.next(response)
          console.log("Founed", response)
        }
      })
    );
  }
}
