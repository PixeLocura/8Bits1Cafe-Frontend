import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ResenaComponent } from '../resena/resena.component';
import { RouterModule } from '@angular/router';

import { Game } from '../shared/models/game.model';
import { MOCK_GAMES } from '../shared/mock/mock-games';


@Component({
  selector: 'app-buscar-juegos',
  standalone: true,
  imports: [CommonModule, FormsModule, ResenaComponent, RouterModule],
  templateUrl: './buscar-juegos.component.html',
})
export class BuscarJuegosComponent {
  games: Game[] = MOCK_GAMES;

  // Filtros
  minPrice: number = 0;
  maxPrice: number = 100;
  sortOption: string = 'relevancia';
  searchTerm: string = '';

  // Filtros seleccionados (estado)
  selectedGenres: { [key: string]: boolean } = {};
  selectedPlatforms: { [key: string]: boolean } = {};
  selectedLanguages: { [key: string]: boolean } = {};
  selectedRatings: { [key: number]: boolean } = {};

  // Opciones disponibles (para usar en *ngFor)
  availableGenres: string[] = [
    'Acción', 'Arcade', 'Aventura', 'Puzzle', 'Carreras', 'RPG',
    'Shooter', 'Tower Defense', 'Estrategia', 'Simulación', 'Gestión'
  ];
  availablePlatforms: string[] = [
    'Windows', 'Mac', 'Linux', 'Web Browser', 'Android', 'iOS'
  ];
  availableLanguages: string[] = [
    'Español', 'Inglés', 'Chino', 'Árabe', 'Ruso'
  ];

  // Modal reseña
  mostrarModal: boolean = false;
  juegoSeleccionado: Game | null = null;

  abrirModal(game: Game) {
    if (!this.isLoggedIn()) {
      alert('Debes iniciar sesión para dejar una reseña');
      return;
    }
    this.juegoSeleccionado = game;
    this.mostrarModal = true;
  }

  cerrarModal() {
    this.mostrarModal = false;
    this.juegoSeleccionado = null;
  }

  guardarResena(data: { comentario: string, rating: number }) {
    console.log('reseña guardada:', data);
    this.cerrarModal();
  }

  isLoggedIn(): boolean {
    return true; // Simulación
  }

  get filteredGames(): Game[] {
    let filtered = [...this.games];

    // Filtro por precio
    filtered = filtered.filter(
      game => game.price >= this.minPrice && game.price <= this.maxPrice
    );

    if (this.minPrice > this.maxPrice) {
      const temp = this.minPrice;
      this.minPrice = this.maxPrice;
      this.maxPrice = temp;
    }

    // Género
    const activeGenres = Object.keys(this.selectedGenres).filter(g => this.selectedGenres[g]);
    if (activeGenres.length > 0) {
      filtered = filtered.filter(game =>
        game.genres.some(genre => activeGenres.includes(genre))
      );
    }

    // Plataforma
    const activePlatforms = Object.keys(this.selectedPlatforms).filter(p => this.selectedPlatforms[p]);
    if (activePlatforms.length > 0) {
      filtered = filtered.filter(game =>
        game.platforms.some(platform => activePlatforms.includes(platform))
      );
    }

    // Idioma
    const activeLanguages = Object.keys(this.selectedLanguages).filter(l => this.selectedLanguages[l]);
    if (activeLanguages.length > 0) {
      filtered = filtered.filter(game =>
        game.languages.some(lang => activeLanguages.includes(lang))
      );
    }

    // Valoración
    const activeRatings = Object.keys(this.selectedRatings).filter(r => this.selectedRatings[+r]);
    if (activeRatings.length > 0) {
      filtered = filtered.filter(game =>
        activeRatings.includes(game.rating.toString())
      );
    }

    // Búsqueda por texto
    const term = this.searchTerm.trim().toLowerCase();
    if (term !== '') {
      filtered = filtered.filter(game =>
        game.title.toLowerCase().includes(term) ||
        game.developer.toLowerCase().includes(term)
      );
    }

    // Ordenar
    switch (this.sortOption) {
      case 'titulo-az':
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'precio-menor':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'precio-mayor':
        filtered.sort((a, b) => b.price - a.price);
        break;
    }

    return filtered;
  }
}
