import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import { Game } from '../../shared/interfaces/game.interfaces';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {GameService} from '../../services/game.service';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  private baseUrl: string = environment.backendEndpoint

  constructor(private gameService: GameService) { }

  getDealGame(): Observable<Game[]>{
    return this.gameService.games
  }

  getNewReleases(): Observable<Game[]>{
    return this.gameService.games
  }
}
