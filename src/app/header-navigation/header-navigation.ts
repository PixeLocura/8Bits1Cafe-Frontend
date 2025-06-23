import { Component, OnInit } from '@angular/core';
import { CartIcon } from '../shared/cart-icon/cart-icon';
import { RouterModule } from '@angular/router';
import { CartService } from '../shared/services/cart';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-header-navigation',
    standalone: true,
    imports: [CartIcon, RouterModule, CommonModule],
    templateUrl: './header-navigation.html',
    styleUrl: './header-navigation.css'
})
export class HeaderNavigation implements OnInit {
    cartItemCount = 0;
    isMobileMenuOpen = false;

    constructor(private cartService: CartService) { }

    ngOnInit(): void {
        this.cartService.getCartItemCount().subscribe(
            count => this.cartItemCount = count
        );
    }

    onSearchClick(): void {
        console.log('Search clicked');
        // TODO: Implement search functionality
    }

    onFavoritesClick(): void {
        console.log('Favorites clicked');
        // TODO: Implement favorites functionality
    }

    onProfileClick(): void {
        console.log('Profile clicked');
        // TODO: Implement profile functionality
    }

    toggleMobileMenu(): void {
        this.isMobileMenuOpen = !this.isMobileMenuOpen;
    }
}
