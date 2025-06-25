import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';

import { Game } from '../shared/models/game.model';
import { MOCK_GAMES } from '../shared/mock/mock-games';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './categories.component.html',
})
export class CategoriesComponent {

  gamesPorCategoria: Record<string, Game[]> = {};

  constructor() {
    this.generarCategorias();
  }

  generarCategorias(): void {
    for (const game of MOCK_GAMES) {
      for (const genero of game.genres) {
        if (!this.gamesPorCategoria[genero]) {
          this.gamesPorCategoria[genero] = [];
        }
        this.gamesPorCategoria[genero].push(game);
      }
    }
  }

  getCategorias(): string[] {
    return Object.keys(this.gamesPorCategoria);
  }
}
