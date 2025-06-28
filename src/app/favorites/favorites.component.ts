import { Component, OnInit } from '@angular/core';
import { FavoritesService, Game } from '../services/favorites.service';
import { ReviewService } from '../services/review.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-favorites',
  standalone: true,
  templateUrl: './favorites.component.html',
})
export class FavoritesComponent implements OnInit {
  favorites: Game[] = [];
  userId: string = '';

  constructor(
    private favoritesService: FavoritesService,
    private reviewService: ReviewService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Debes iniciar sesión para ver tus favoritos');
      this.router.navigate(['/login']);
      return;
    }

    const email = this.getEmailFromToken(token);
    if (!email) {
      alert('Token inválido');
      this.router.navigate(['/login']);
      return;
    }

    this.reviewService.getUserIdByEmail(email).subscribe({
      next: (res) => {
        this.userId = res.id;
        this.loadFavorites(); // ✅ Cargar favoritos una vez tengamos el ID
      },
      error: () => {
        alert('No se pudo obtener el usuario');
        this.router.navigate(['/login']);
      }
    });
  }

  loadFavorites(): void {
    this.favoritesService.getFavorites(this.userId).subscribe({
      next: (data) => this.favorites = data,
      error: (err) => {
        console.error('Error al cargar favoritos', err);
        this.favorites = [];
      }
    });
  }

  removeFavorite(gameId: string): void {
    this.favoritesService.removeFavorite(this.userId, gameId).subscribe({
      next: () => {
        this.favorites = this.favorites.filter(fav => fav.id !== gameId);
      },
      error: (err) => {
        console.error('Error al eliminar favorito', err);
        alert('No se pudo eliminar el juego de favoritos.');
      }
    });
  }

  goHome(): void {
    this.router.navigate(['/buscar-juegos']);
  }

  getEmailFromToken(token: string): string | null {
    try {
      const payload = token.split('.')[1];
      const decoded = atob(payload);
      const parsed = JSON.parse(decoded);
      return parsed.sub || null;
    } catch (error) {
      console.error('Error al decodificar token:', error);
      return null;
    }
  }
}
