import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ResenaComponent } from '../resena/resena.component';

interface Game {
  id: string;
  title: string;
  developer: string;
  coverImage: string;
  price: number;
  genres: string[];
  platforms: string[];
  languages: string[];
  rating: number;
}

@Component({
  selector: 'app-buscar-juegos',
  standalone: true,
  imports: [CommonModule, FormsModule, ResenaComponent],
  templateUrl: './buscar-juegos.component.html',
})
export class BuscarJuegosComponent {
  games: Game[] = [
    {
      id: '1',
      title: 'Pixel Dungeon',
      developer: 'RetroWare Studios',
      coverImage: 'https://images.unsplash.com/photo-1585620385456-4759f9b5c7d9?auto=format&fit=crop&w=400&q=60',
      price: 14.99,
      genres: ['Aventura', 'Puzzle'],
      platforms: ['Windows', 'Mac'],
      languages: ['Español', 'Inglés'],
      rating: 4,
    },
    {
      id: '2',
      title: 'Coffee Shop Tycoon',
      developer: 'Cozy Games Inc.',
      coverImage: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=400&q=60',
      price: 9.99,
      genres: ['Simulación', 'Gestión'],
      platforms: ['Windows', 'Linux'],
      languages: ['Inglés'],
      rating: 5,
    },
    {
      id: '3',
      title: 'Bit Racer',
      developer: '8Bit Gaming',
      coverImage: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=400&q=60',
      price: 4.99,
      genres: ['Carreras', 'Arcade'],
      platforms: ['Windows'],
      languages: ['Español'],
      rating: 3,
    },
    {
      id: '4',
      title: 'Cyber Tower',
      developer: 'Digital Pulse',
      coverImage: 'https://images.unsplash.com/photo-1508779018996-601f3d6b9d56?auto=format&fit=crop&w=400&q=60',
      price: 12.49,
      genres: ['Shooter', 'Tower Defense'],
      platforms: ['Mac', 'Linux'],
      languages: ['Inglés', 'Chino'],
      rating: 4,
    },
    {
      id: '5',
      title: 'SimFarm',
      developer: 'VintageSoft',
      coverImage: 'https://images.unsplash.com/photo-1614109387374-2d3a74ec87b9?auto=format&fit=crop&w=400&q=60',
      price: 6.99,
      genres: ['Simulación', 'Estrategia'],
      platforms: ['Web Browser', 'Android'],
      languages: ['Español', 'Ruso'],
      rating: 5,
    },
    {
      id: '6',
      title: 'Puzzle World',
      developer: 'Smart Pixel',
      coverImage: 'https://images.unsplash.com/photo-1618498082410-92a88a0a4fdb?auto=format&fit=crop&w=400&q=60',
      price: 3.49,
      genres: ['Puzzle'],
      platforms: ['iOS'],
      languages: ['Español', 'Árabe'],
      rating: 2,
    }
  ];

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
