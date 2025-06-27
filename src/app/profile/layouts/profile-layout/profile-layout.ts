import {Component, OnInit} from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {AuthService} from '../../../auth/services/auth.service';
import {User} from '../../../auth/interfaces/auth.interfaces';
import {LucideAngularModule} from 'lucide-angular';

@Component({
  selector: 'app-profile-layout',
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    LucideAngularModule

  ],
  templateUrl: './profile-layout.html',
})
export class ProfileLayout implements OnInit{
  user: User|null = null
  coverImage : string = "https://images.unsplash.com/photo-1551103782-8ab07afd45c1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=8"
  avatar = 'https://i.pravatar.cc/300'
  subtitle = "Member desde Enero 2023"
  tabs = [
    { label: 'Overview', href: '/profile', iconName: "user" },
    { label: 'Favorites', href: '/profile/favorites', iconName: "heart" },
    { label: 'Settings', href: '/profile/settings', iconName: "settings" },
  ]
  constructor(protected authService: AuthService) {
  }

  ngOnInit() {
    this.authService.currentUser$.subscribe(u=> this.user = u);
  }
}
