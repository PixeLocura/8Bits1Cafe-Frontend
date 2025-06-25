import { Component, Input } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { Game } from '../../interfaces/developer.interfaces';

@Component({
  selector: 'app-game-card',
  standalone: true,
  imports: [CommonModule, CurrencyPipe, DatePipe],
  templateUrl: './game-card.html',
  styleUrl: './game-card.css'
})
export class GameCardComponent {
  @Input() game!: Game;
}
