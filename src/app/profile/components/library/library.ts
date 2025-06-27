import { Component } from '@angular/core';
import {MOCK_GAMES} from '../../../shared/mock/mock-games';
import {GameCard} from '../game-card/game-card';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-library',
  imports: [
    GameCard,
    NgForOf
  ],
  templateUrl: './library.html',
  styleUrl: './library.css'
})
export class Library {
  ownedGames = MOCK_GAMES.slice(0, 3);
  recentlyViewed = MOCK_GAMES.slice(-4, -1);
}
