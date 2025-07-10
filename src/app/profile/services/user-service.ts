import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import { AuthService } from '../../auth/services/auth.service';
import { GameService } from '../../services/game.service';
import { Game } from '../../shared/interfaces/game.interfaces';

// ✅ Define tus interfaces aquí mismo
interface TransactionDetail {
  transactionId: string;
  gameId: string;
  price: number;
}

interface Transaction {
  id: string;
  userId: string;
  totalPrice: number;
  transactionDate: string;
  details: TransactionDetail[];
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl: string = `${environment.backendEndpoint}`;
  private ownedGamesSubject = new BehaviorSubject<Game[] | null>(null);
  ownedGames = this.ownedGamesSubject.asObservable();
  private transactionSubject = new BehaviorSubject<Transaction[] | null>(null);
  transaction = this.transactionSubject.asObservable();

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private gameService: GameService
  ) {
    this.authService.currentUser$.subscribe(user => {
      if (!user) return;
      this.fetchInfoUser(user.id)
    });
  }

  triggerReloadInfo(){
    return this.fetchInfoUser(this.authService.getCurrentUser()?.id??"")
  }

  private fetchInfoUser(id: string | null) {
    if(!id) return;

    this.getTransaction(id).subscribe(async (val) => {
      if (val == null) {
        console.log("NO transactions found");
        return;
      }
      this.transactionSubject.next(val);

      const gamePromises = val.flatMap(tx =>
        tx.details.map((d: TransactionDetail) =>
          firstValueFrom(this.gameService.getGameById(d.gameId))
        )
      );

      const games: Game[] = await Promise.all(gamePromises);
      this.ownedGamesSubject.next(games);
    });

  }

  private getTransaction(id: string) {
    return this.http.get<Transaction[] | null>(`${this.baseUrl}/transactions/user/${id}`);
  }



  getTransations() {
    return this.transactionSubject;
  }

  getOwnedGames() {
    return this.ownedGamesSubject.value ?? [];
  }

  getNumberOfOwnedGames() {
    return this.ownedGamesSubject.value?.length;
  }

  isPurchased(id: string): boolean {
    return !!this.ownedGamesSubject.value?.find(e => e.id === id);
  }

}
