import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';
import { User } from '../../../auth/interfaces/auth.interfaces';
import { LucideAngularModule } from 'lucide-angular';
import { CommonModule, DatePipe } from '@angular/common';
import { UserService } from '../../services/user-service';
import { FavoritesService } from '../../../services/favorites.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-profile-layout',
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    LucideAngularModule,
    DatePipe
  ],
  templateUrl: './profile-layout.html',
})
export class ProfileLayout implements OnInit {
  user: User | null = null;
  avatar = 'https://i.pravatar.cc/300';
  numberOfGames: number | null = null;
  numberOfFavourites: number | null = null;

  hasDeveloperProfile = false;

  constructor(
    protected authService: AuthService,
    private userService: UserService,
    private favoritesService: FavoritesService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.authService.currentUser$.subscribe(u=> this.user = u);
    this.userService.ownedGames.subscribe(val=>{
      console.log("transactioj found", val)
      this.numberOfGames = (val??[]).length
    })
    this.favoritesService.favourites.subscribe(u=>{
      this.numberOfFavourites = u.length
    })
    this.authService.currentUser$.subscribe(u => {
      this.user = u
      if(!u)return
      this.hasDeveloperProfile = !!u.developerProfileId
    });

    this.userService.transaction.subscribe(val => {
      this.numberOfGames = (val ?? []).length;
    });

    this.favoritesService.favourites.subscribe(u => {
      this.numberOfFavourites = u.length;
    });

  }

  checkDeveloperProfile() {
    this.http.get<{ exists: boolean, developerId: string | null }>('/api/v1/developers/me/exists')
      .subscribe({
        next: (res) => {
          this.hasDeveloperProfile = res.exists;
        },
        error: (err) => {
          if (err.status === 404) {
            this.hasDeveloperProfile = false;
          } else {
            console.error('Error comprobando perfil de developer', err);
          }
        }
      });
  }


  logout() {
    this.authService.logout();
    window.location.reload();
  }
}
