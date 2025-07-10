import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { Game } from '../shared/interfaces/game.interfaces';
import { GameService } from '../services/game.service';
//SERA USADO PARA CONECTAR USER_ID con GAME_ID y -------------------------
//extraer el username para mostrarlo en la infor de un juego--------------
import { Developer } from '../shared/interfaces/developer.interfaces';
import { GameConUsername } from '../shared/interfaces/game.interfaces';
import { CartService } from '../shared/services/cart';
import {UserService} from '../profile/services/user-service';
//------------------------------------------------------------------------
@Component({
  selector: 'app-buscar-juegos',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './buscar-juegos.component.html',
})
export class BuscarJuegosComponent {
  games: GameConUsername[] = [];
  developers: Developer[] = [];

  // Filtros
  minPrice: number = 0;
  maxPrice: number = 100;
  sortOption: string = 'relevancia';
  searchTerm: string = '';

  // Estado de filtros seleccionados
  selectedGenres: { [key: string]: boolean } = {};
  selectedPlatforms: { [key: string]: boolean } = {};
  selectedLanguages: { [key: string]: boolean } = {};
  selectedRatings: { [key: number]: boolean } = {};

  // Opciones de filtros
  availableGenres = [
    { value: 'ACTION', display: 'Acción' },
    { value: 'ADVENTURE', display: 'Aventura' },
    { value: 'RPG', display: 'RPG' },
    { value: 'STRATEGY', display: 'Estrategia' },
    { value: 'SIMULATION', display: 'Simulación' },
    { value: 'SPORTS', display: 'Deportes' },
    { value: 'RACING', display: 'Carreras' },
    { value: 'PUZZLE', display: 'Puzzle' },
    { value: 'PLATFORMER', display: 'Plataformas' },
    { value: 'SHOOTER', display: 'Shooter' },
    { value: 'HORROR', display: 'Horror' },
    { value: 'CASUAL', display: 'Casual' },
    { value: 'FANTASY', display: 'Fantasía' },
    { value: 'ARCADE', display: 'Arcade' },
    { value: 'ROGUELIKE', display: 'Roguelike' }
  ];

  availablePlatforms = [
    { value: 'WINDOWS', display: 'Windows' },
    { value: 'MAC_OS', display: 'MacOS' },
    { value: 'LINUX', display: 'Linux' },
    { value: 'ANDROID', display: 'Android' },
    { value: 'IOS', display: 'iOS' }
  ];

  availableLanguages = [
    { value: 'EN', display: 'Inglés' },
    { value: 'ES', display: 'Español' },
    { value: 'FR', display: 'Francés' },
    { value: 'DE', display: 'Alemán' },
    { value: 'IT', display: 'Italiano' },
    { value: 'PT', display: 'Portugués' },
    { value: 'RU', display: 'Ruso' },
    { value: 'JA', display: 'Japonés' },
    { value: 'ZH', display: 'Chino' },
    { value: 'KO', display: 'Coreano' }
  ];


  mostrarModal: boolean = false;
  juegoSeleccionado: Game | null = null;
  ownedGames : Game[] = []

  constructor(private gameService: GameService, private cartService: CartService, private userService : UserService) {
    this.cargarDatos();
    this.userService.ownedGames.subscribe(v=>{
      if(!v) return
      this.ownedGames = v
    })
  }

  cargarDatos() {
    this.gameService.getAllDevelopers().subscribe({
      next: (developers) => {
        this.developers = developers;

        this.gameService.getAllGames().subscribe({
          next: (games) => {
            this.games = games.map(game => {
              const dev = this.developers.find(d => d.id === game.developer_id);
              return {
                ...game,
                developerUsername: dev?.name ?? 'Desconocido',
                coverUrl: game.coverUrl || game.images?.[0] || 'assets/default-cover.png',
                rating: Math.floor(Math.random() * 5) + 1
              };
            });
          },
          error: (err) => {
            console.error('Error al obtener juegos:', err);
          }
        });
      },
      error: (err) => {
        console.error('Error al obtener developers:', err);
      }
    });
  }




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

  guardarResena(data: { comentario: string; rating: number }) {
    console.log('reseña guardada:', data);
    this.cerrarModal();
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  get filteredGames(): GameConUsername[] {
    let filtered = [...this.games];

    // Arreglo de rango invertido
    if (this.minPrice > this.maxPrice) {
      [this.minPrice, this.maxPrice] = [this.maxPrice, this.minPrice];
    }

    filtered = filtered.filter(game =>
      game.price >= this.minPrice && game.price <= this.maxPrice
    );

    const activeGenres = Object.keys(this.selectedGenres).filter(g => this.selectedGenres[g]);
    const activePlatforms = Object.keys(this.selectedPlatforms).filter(p => this.selectedPlatforms[p]);
    const activeLanguages = Object.keys(this.selectedLanguages).filter(l => this.selectedLanguages[l]);
    const activeRatings = Object.keys(this.selectedRatings).filter(r => this.selectedRatings[+r]);

    if (activeGenres.length > 0) {
      filtered = filtered.filter(game =>
        (game.categories || []).some(genre => activeGenres.includes(genre))
      );
    }

    if (activePlatforms.length > 0) {
      filtered = filtered.filter(game =>
        (game.platforms || []).some(platform => activePlatforms.includes(platform))
      );
    }

    if (activeLanguages.length > 0) {
      filtered = filtered.filter(game =>
        (game.languages || []).some(lang => activeLanguages.includes(lang))
      );
    }

    if (activeRatings.length > 0) {
      filtered = filtered.filter(game =>
        activeRatings.includes((game.rating ?? 0).toString())
      );
    }

    const term = this.searchTerm.trim().toLowerCase();
    if (term !== '') {
      filtered = filtered.filter(game =>
        game.title.toLowerCase().includes(term) ||
        (game.developerUsername?.toLowerCase()?.includes(term) ?? false)
      );
    }

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

  addToCart(gameId: string) {
    this.cartService.addToCart(gameId);
  }

  isPurchased(id: string){
    return !!this.ownedGames.find(v=>v.id == id)
  }

}
