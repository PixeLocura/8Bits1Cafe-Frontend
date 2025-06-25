import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameCardComponent } from '../game-card/game-card';
import { Game } from '../../interfaces/developer.interfaces';

@Component({
  selector: 'app-developer-games-list',
  standalone: true,
  imports: [CommonModule, GameCardComponent],
  templateUrl: './developer-games-list.html',
  styleUrl: './developer-games-list.css'
})
export class DeveloperGamesListComponent {
  @Input() games: Game[] = [];
}
