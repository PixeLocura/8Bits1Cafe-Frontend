import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, from, forkJoin } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Game } from '../interfaces/game.interfaces';

export interface CartProduct {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private readonly STORAGE_KEY = '8bits_cart_items';
  private cartItemIds = new BehaviorSubject<string[]>([]);
  private apiUrl = environment.backendEndpoint;

  constructor(private http: HttpClient) {
    this.loadCartFromStorage();
    // // Add test item if cart is empty
    // if (this.cartItemIds.value.length === 0) {
    //   // this.clearCart();
    //   this.addToCart('db52995c-b859-4220-9e14-ad0b60183c3d');
    //   this.addToCart('b057d590-1bee-4ff2-8e9f-73a0b028dd6a');
    //   this.addToCart('e4404cc4-cbaa-4293-955c-4abbd7a56bff');
    // }
  }

  private loadCartFromStorage(): void {
    const storedIds = localStorage.getItem(this.STORAGE_KEY);
    if (storedIds) {
      this.cartItemIds.next(JSON.parse(storedIds));
    }
  }

  private saveCartToStorage(): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.cartItemIds.value));
  }

  getCartItemIds(): Observable<string[]> {
    return this.cartItemIds.asObservable();
  }

  getCartItemCount(): Observable<number> {
    return this.cartItemIds.pipe(
      map(ids => ids.length)
    );
  }

  addToCart(itemId: string): void {
    const currentIds = this.cartItemIds.value;
    if (!currentIds.includes(itemId)) {
      this.cartItemIds.next([...currentIds, itemId]);
      this.saveCartToStorage();
    }
  }

  removeFromCart(itemId: string): void {
    const currentIds = this.cartItemIds.value;
    this.cartItemIds.next(currentIds.filter(id => id !== itemId));
    this.saveCartToStorage();
  }

  clearCart(): void {
    this.cartItemIds.next([]);
    this.saveCartToStorage();
  }

  // Fetch game details from API
  private fetchProductDetails(id: string): Observable<CartProduct> {
    return this.http.get<Game>(`${this.apiUrl}/games/${id}`).pipe(
      map(game => ({
        id: game.id,
        name: game.title,
        price: game.price,
        imageUrl: game.coverUrl
      }))
    );
  }

  // Get all cart items with their details
  getCartItems(): Observable<CartProduct[]> {
    return this.cartItemIds.pipe(
      switchMap(ids => {
        if (ids.length === 0) return from([[]]);
        return forkJoin(
          ids.map(id => this.fetchProductDetails(id))
        );
      })
    );
  }

  // Initiate a transaction with the backend
  purchaseGames(gameIds: string[], authToken: string) {
    return this.http.post<any>(
      `${this.apiUrl}/transactions/games`,
      gameIds,
      {
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json'
        }
      }
    );
  }
}
