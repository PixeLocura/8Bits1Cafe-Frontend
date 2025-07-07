import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, firstValueFrom, tap} from 'rxjs';
import {AuthService} from '../../auth/services/auth.service';
import {GameService} from '../../services/game.service';
import { Game } from '../../shared/interfaces/game.interfaces';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl : string= `${environment.backendEndpoint}`
  private ownedGamesSubject  = new BehaviorSubject<Game[] | null>(null);
  ownedGames = this.ownedGamesSubject.asObservable()
  private transactionSubject = new BehaviorSubject<any[] | null>(null);
  transaction = this.transactionSubject.asObservable()

  constructor(private http: HttpClient, authService: AuthService, gameService: GameService)
  {
    authService.currentUser$.subscribe(user=>{
      if(!user)return;

      this.getTransaction(user.id).subscribe(async (val)=> {
        if(val==null){
          console.log("NO transactions found");
          return
        }
        this.transactionSubject.next(val)
        const gamePromises = val.map(tx =>
          firstValueFrom(gameService.getGameById(tx.details.gameId))
        );
        const games: Game[] = await Promise.all(gamePromises);
        this.ownedGamesSubject.next(games)
      })
    })
  }
  getTransaction(id:string){
    return this.http.get<any[]|null>(`${this.baseUrl}/transactions/user/${id}`)
  }

  getTransations(){
    return this.transactionSubject;
  }
  getOwnedGames(){
      return this.ownedGamesSubject.value??[]
  }

  getNumberOfOwnedGames(){
    return this.ownedGamesSubject.value?.length
  }


}
