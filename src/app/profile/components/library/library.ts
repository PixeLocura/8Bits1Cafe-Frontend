import {Component, OnInit} from '@angular/core';
import {MOCK_GAMES} from '../../../shared/mock/mock-games';
import {GameCard} from '../game-card/game-card';
import {NgForOf} from '@angular/common';
import {HomeService} from '../../../home/services/home-service';
import {Game} from '../../../shared/models/game.model';

@Component({
  selector: 'app-library',
  imports: [
    GameCard,
    NgForOf
  ],
  templateUrl: './library.html',
  styleUrl: './library.css'
})
export class Library implements OnInit{
  ownedGames: any[]|null = null;
  recentlyViewed: any[]|null = null;

  constructor(private homeService: HomeService) {
  }
  ngOnInit() {
    this.homeService.getNewReleases().subscribe(u =>{
      this.ownedGames = u.slice(0, 3);
      this.recentlyViewed = u.slice(-4, -1)
    })
  }
}
