import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';

interface Game {
  id: string;
  title: string;
  developer: string;
  coverImage: string;
  rating: number;
  category: string[];
  platforms: string[];
  price: string;
}

@Component({
  standalone: true,
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  imports: [CommonModule],
})
export class FavoritesComponent {
  favorites: Game[] = [
    {
      id: '1',
      title: 'Pixel Dungeon',
      developer: 'RetroWare Studios',
      coverImage: 'https://images.unsplash.com/photo-1585620385456-4759f9b5c7d9?auto=format&fit=crop&w=500&q=60',
      rating: 4.8,
      category: ['Aventura', 'Puzzle'],
      platforms: ['Windows', 'Mac'],
      price: '$14.99',
    },
    {
      id: '2',
      title: 'Coffee Shop Tycoon',
      developer: 'Cozy Games Inc.',
      coverImage: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=500&q=60',
      rating: 4.5,
      category: ['Simulación', 'Gestión'],
      platforms: ['Windows', 'Mac', 'Linux'],
      price: '$9.99',
    },
    {
      id: '3',
      title: 'Bit Racer',
      developer: '8Bit Gaming',
      coverImage: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=500&q=60',
      rating: 4.2,
      category: ['Carreras', 'Arcade'],
      platforms: ['Windows'],
      price: '$4.99',
    },
  ];

  constructor(private snackBar: MatSnackBar, private router: Router) {}

  removeFavorite(id: string): void {
    this.favorites = this.favorites.filter(game => game.id !== id);
    this.snackBar.open('Juego eliminado de favoritos', 'Cerrar', {
      duration: 3000,
      panelClass: 'snackbar-success',
    });
  }

  goHome(): void {
    this.router.navigateByUrl('/');
  }
}
