import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ResenaComponent } from '../resena/resena.component';
import { Game } from '../shared/models/game.model';
import { MOCK_GAMES } from '../shared/mock/mock-games';

@Component({
  selector: 'app-buscar-juegos',
  standalone: true,
  imports: [CommonModule, FormsModule, ResenaComponent],
  templateUrl: './buscar-juegos.component.html',
})
export class BuscarJuegosComponent {
  games: Game[] = MOCK_GAMES;

  minPrice:number=0;
  maxPrice:number=100;
  sortOption: string ='relevancia';
  searchTerm: any;

  mostrarModal: boolean = false;
  juegoSeleccionado: Game | null = null;

  //<-------------------resena>
  //Activar Reseña del juego
    abrirModal(game: Game) {
      // Aquí puedes validar si está logueado (ejemplo con authService más adelante)
      if (!this.isLoggedIn()) {
        alert('Debes iniciar sesión para dejar una resena');
        // Redirigir si deseas: this.router.navigate(['/login']);
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
      console.log('resena guardada:', data);
    }
    //Simular que estas logeado o no
    isLoggedIn(): boolean {
      return true; // Cambia esto cuando tengas login implementado
    }
//<------------------->
//Filtrar juegos
  get filteredGames(): Game[] {
    let filtered = this.games.filter(
      game => game.price >= this.minPrice && game.price <= this.maxPrice
    );

    // Género
    const activeGenres = Object.keys(this.selectedGenres).filter(g => this.selectedGenres[g]);
    if (activeGenres.length > 0) {
      filtered = filtered.filter(game => game.genres.some(g => activeGenres.includes(g)));
    }

    // Plataforma
    const activePlatforms = Object.keys(this.selectedPlatforms).filter(p => this.selectedPlatforms[p]);
    if (activePlatforms.length > 0) {
      filtered = filtered.filter(game => game.platforms.some(p => activePlatforms.includes(p)));
    }

    // Idiomas
    const activeLanguages = Object.keys(this.selectedLanguages).filter(l => this.selectedLanguages[l]);
    if (activeLanguages.length > 0) {
      filtered = filtered.filter(game => game.languages.some(l => activeLanguages.includes(l)));
    }

    // Valoración
    const activeRatings = Object.keys(this.selectedRatings).filter(r => this.selectedRatings[+r]);
    if (activeRatings.length > 0) {
      filtered = filtered.filter(game => activeRatings.includes(game.rating.toString()));
    }


    // Ordenar
    switch (this.sortOption) {
      case 'titulo-az':
        filtered = filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'precio-menor':
        filtered = filtered.sort((a, b) => a.price - b.price);
        break;
      case 'precio-mayor':
        filtered = filtered.sort((a, b) => b.price - a.price);
        break;
    }

    //Buscardor del juego
    if (this.searchTerm.trim() !== '') {
      const term = this.searchTerm.toLowerCase();
      filtered = filtered.filter(game =>
        game.title.toLowerCase().includes(term) ||
        game.developer.toLowerCase().includes(term)
      );
    }
    return filtered;
  }


  selectedGenres: { [key: string]: boolean } = {};
  selectedPlatforms: { [key: string]: boolean } = {};
  selectedLanguages: { [key: string]: boolean } = {};
  selectedRatings: { [key: number]: boolean } = {};
  selectTerm : string =' ';


}
