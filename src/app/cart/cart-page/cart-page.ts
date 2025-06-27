import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { CartItem } from '../cart-item/cart-item';
import { CartService, CartProduct } from '../../shared/services/cart';

@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [CommonModule, RouterModule, CartItem],
  templateUrl: './cart-page.html',
  styleUrls: ['./cart-page.css']
})
export class CartPage implements OnInit {
  cartItems: CartProduct[] = [];
  loading: boolean = true;
  error: string | null = null;

  constructor(
    private cartService: CartService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadCartItems();
  }

  private loadCartItems(): void {
    this.loading = true;
    this.cartService.getCartItems().subscribe({
      next: (items) => {
        this.cartItems = items;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error loading cart items';
        this.loading = false;
        console.error('Error loading cart items:', err);
      }
    });
  }

  get subtotal(): number {
    return this.cartItems.reduce((sum, item) => sum + item.price, 0);
  }

  get tax(): number {
    return this.subtotal * 0.10; // 10% tax
  }

  get total(): number {
    return this.subtotal + this.tax;
  }

  removeItem(itemId: string): void {
    this.cartService.removeFromCart(itemId);
    this.cartItems = this.cartItems.filter(item => item.id !== itemId);
  }

  async comprar(): Promise<void> {
    try {
      // Try both possible token keys for compatibility
      let authToken = localStorage.getItem('auth_token') || localStorage.getItem('token');
      if (!authToken) {
        this.error = 'No autenticado. Por favor inicia sesión.';
        return;
      }
      const gameIds = this.cartItems.map(item => item.id);
      this.loading = true;
      this.cartService.purchaseGames(gameIds, authToken).subscribe({
        next: (result) => {
          this.loading = false;
          // Optionally clear cart and redirect
          this.cartService.clearCart();
          this.router.navigate(['/successful-purchase'], { state: { transaction: result } });
        },
        error: (err) => {
          this.loading = false;
          this.error = 'Error al procesar la compra. Por favor intente nuevamente.';
          console.error('Error during purchase:', err);
        }
      });
    } catch (error) {
      this.loading = false;
      console.error('Error during purchase:', error);
      this.error = 'Error al procesar la compra. Por favor intente nuevamente.';
    }
  }
}
