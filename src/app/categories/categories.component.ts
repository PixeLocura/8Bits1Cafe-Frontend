import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { GameService } from '../services/game.service';
import { Game, GameConUsername } from '../shared/interfaces/game.interfaces';
import { Developer } from '../shared/interfaces/developer.interfaces';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './categories.component.html',
})
export class CategoriesComponent implements OnInit {
  gamesPorCategoria: Record<string, GameConUsername[]> = {};
  developers: Developer[] = [];

  constructor(private gameService: GameService) {}

  ngOnInit(): void {
    this.cargarJuegosDesdeBackend();
  }

  cargarJuegosDesdeBackend(): void {
    this.gameService.getAllDevelopers().subscribe({
      next: (devs) => {
        this.developers = devs;

        this.gameService.getAllGames().subscribe({
          next: (games: Game[]) => {
            for (const game of games) {
              const developer = this.developers.find(d => d.id === game.developer_id);
              const gameConUsername: GameConUsername = {
                ...game,
                developerUsername: developer?.name || 'Desconocido',
              };

              for (const genero of game.categories ?? []) {
                if (!this.gamesPorCategoria[genero]) {
                  this.gamesPorCategoria[genero] = [];
                }
                this.gamesPorCategoria[genero].push(gameConUsername);
              }
            }
          },
          error: (err) => console.error('Error al obtener juegos:', err)
        });
      },
      error: (err) => console.error('Error al obtener developers:', err)
    });
  }

  getCategorias(): string[] {
    return Object.keys(this.gamesPorCategoria);
  }
}
