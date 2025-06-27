import { Component } from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {NgClass, NgForOf, NgSwitch} from '@angular/common';
import {LucideAngularModule} from 'lucide-angular';

@Component({
  selector: 'app-library-layout',
  imports: [
    RouterLink,
    NgClass,
    NgForOf,
    LucideAngularModule,
    RouterOutlet
  ],
  templateUrl: './library-layout.html',
})
export class LibraryLayout {

  tabs = [
    { label: 'My Library', href: '/profile/library',         iconName: 'gamepad2' },
    { label: 'My Orders',  href: '/profile/library/orders',  iconName: 'ShoppingCart'   },
    { label: 'Wishlist',   href: '/profile/library/wishlist', iconName: 'Heart'          },
  ];

  isActive(href: string) {
    return location.pathname === href;
  }

}
