import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Game } from '../shared/interfaces/game.interfaces';
import {BehaviorSubject, Observable} from 'rxjs';
import { environment } from '../../environments/environment';
import { Developer } from '../shared/interfaces/developer.interfaces';


@Injectable({
  providedIn: 'root'
})
export class GameService {
  private apiUrl = `${environment.backendEndpoint}/games`;

  private gamesSubject = new BehaviorSubject<Game[]>([])
  games = this.gamesSubject.asObservable();
  private developersSubject = new BehaviorSubject<Developer[]>([])
  developes = this.developersSubject.asObservable()

  constructor(private http: HttpClient) {
    this.http.get<Game[]>(this.apiUrl).subscribe(games=>{
      this.gamesSubject.next(games);
      console.log("GAMES FOUND", games)
    });

    this.http.get<Developer[]>(`${environment.backendEndpoint}/developers`).subscribe(developers=>{
      this.developersSubject.next(developers)
    });

  }

  getAllGames(): Observable<Game[]> {
    return this.games
  }

  getGames(){
    return this.gamesSubject.value;
  }
  getGameById(id: string): Observable<Game> {
    return this.http.get<Game>(`${this.apiUrl}/${id}`);
  }


  getAllDevelopers(): Observable<Developer[]> {
    return this.developes
  }
}
