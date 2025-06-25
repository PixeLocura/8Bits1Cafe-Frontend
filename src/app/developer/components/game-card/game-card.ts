import { Component, Input } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Game } from '../../interfaces/developer.interfaces';
import { CategoryInfo, LanguageInfo, PlatformInfo, Category, Language, Platform } from '../../../shared/interfaces/game.interfaces';

@Component({
  selector: 'app-game-card',
  standalone: true,
  imports: [CommonModule, CurrencyPipe, DatePipe, RouterModule],
  templateUrl: './game-card.html',
  styleUrl: './game-card.css'
})
export class GameCardComponent {
  @Input() game!: Game;

  categoryInfo = CategoryInfo;
  languageInfo = LanguageInfo;
  platformInfo = PlatformInfo;
  Category = Category;
  Language = Language;
  Platform = Platform;
}
