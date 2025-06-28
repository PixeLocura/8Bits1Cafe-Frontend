import { Component } from '@angular/core';
import {GameCard} from '../game-card/game-card';
import {NgForOf, NgIf} from '@angular/common';
import {Game} from '../../../shared/models/game.model';
import {MOCK_GAMES} from '../../../shared/mock/mock-games';

@Component({
  selector: 'app-wishlist',
  imports: [
    GameCard,
    NgForOf,
    NgIf
  ],
  templateUrl: './wishlist.html',
  styleUrl: './wishlist.css'
})
export class Wishlist {
  wishlist: Game[] = MOCK_GAMES.slice(-2, -1);
}
