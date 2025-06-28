import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FavoritesService } from '../services/favorites.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth/services/auth.service';
// Interfaz coherente con tu DTO real
export interface FavoriteGame {
  userId: string;
  gameId: string;
  title: string;
  developerName: string;
  coverUrl: string;
  price: number;
}

@Component({
  selector: 'app-favorites',
  standalone: true, // ✅ Si es standalone, debe importar CommonModule
  imports: [CommonModule], // ✅ Aquí debe estar
  templateUrl: './favorites.component.html',
})
export class FavoritesComponent implements OnInit {
  favorites: FavoriteGame[] = [];
  userId: string | null = null;

  constructor(
    private favoritesService: FavoritesService,
    private snackBar: MatSnackBar,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.userId = this.authService.getUserId();
    if (!this.userId) {
      console.error('No userId found');
      return;
    }
    this.loadFavorites(this.userId); 
  }
  
  loadFavorites(userId: string): void {
    this.favoritesService.getFavorites(userId).subscribe({
      next: (data) => {
        this.favorites = data;
      },
      error: (err) => {
        console.error('Error fetching favorites:', err);
      }
    });
  }
  

  removeFavorite(userId: string, gameId: string): void {
    this.favoritesService.removeFavorite(userId, gameId).subscribe({
      next: () => {
        this.snackBar.open('Juego eliminado de favoritos', 'Cerrar', {
          duration: 3000,
          panelClass: 'snackbar-success',
        });
        this.loadFavorites(userId); // Recarga la lista después de borrar
      },
      error: (err) => {
        console.error('Error removing favorite:', err);
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
