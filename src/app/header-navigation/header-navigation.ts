import { Component } from '@angular/core';
import { CartIcon } from '../shared/cart-icon/cart-icon';

@Component({
  selector: 'app-header-navigation',
  imports: [CartIcon],
  templateUrl: './header-navigation.html',
  styleUrl: './header-navigation.css'
})
export class HeaderNavigation {
  cartItemCount = 3; // Example cart item count
  isMobileMenuOpen = false;

  onSearchClick(): void {
    console.log('Search clicked');
    // TODO: Implement search functionality
  }

  onFavoritesClick(): void {
    console.log('Favorites clicked');
    // TODO: Implement favorites functionality
  }

  onCartClick(): void {
    console.log('Cart clicked');
    // TODO: Implement cart functionality
  }

  onProfileClick(): void {
    console.log('Profile clicked');
    // TODO: Implement profile functionality
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }
}
