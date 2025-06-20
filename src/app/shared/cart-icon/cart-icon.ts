import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart-icon',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart-icon.html',
  styleUrl: './cart-icon.css'
})
export class CartIcon {
  // TODO: Implement cart functionality
  // - Connect to CartService
  // - Handle cart navigation
  // - Manage cart count updates
  // - Add animations for count changes

  @Input() itemCount: number = 0;

  onClick(): void {
    // TODO: Implement cart navigation
    console.log('Cart clicked');
  }
}
