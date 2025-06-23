import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
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

  constructor(private cartService: CartService) { }

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
}
