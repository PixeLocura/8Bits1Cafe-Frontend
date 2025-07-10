import {Component, OnInit} from '@angular/core';
import {GameCard} from '../game-card/game-card';
import {NgForOf, NgIf} from '@angular/common';
import {Game} from '../../../shared/models/game.model';
import {MOCK_GAMES} from '../../../shared/mock/mock-games';
import {HomeService} from '../../../home/services/home-service';
import {FavoriteGame, FavoritesService} from '../../../services/favorites.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {AuthService} from '../../../auth/services/auth.service';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-wishlist',
  imports: [
    NgForOf,
    NgIf,
    RouterLink
  ],
  templateUrl: './wishlist.html',
  styleUrl: './wishlist.css'
})
export class Wishlist implements OnInit{
  wishlist: FavoriteGame[] = [];

  constructor(private favoritesService: FavoritesService, private snackBar: MatSnackBar, private authService: AuthService) {

  }

  ngOnInit() {
    this.favoritesService.favourites.subscribe(u=>{
      this.wishlist = u
    })
  }

  removeFavorite(gameId: string): void {
    this.favoritesService.removeFavorite(this.authService.getUserId()??"", gameId).subscribe({
      next: () => {
        this.snackBar.open('Juego eliminado de favoritos', 'Cerrar', {
          duration: 3000,
          panelClass: 'snackbar-success',
        });
      },
      error: (err) => {
        console.error('Error removing favorite:', err);
      }
    });
  }


}
