import {Component, OnInit} from '@angular/core';
import {GameCard} from '../game-card/game-card';
import {NgForOf, NgIf} from '@angular/common';
import {Game} from '../../../shared/models/game.model';
import {MOCK_GAMES} from '../../../shared/mock/mock-games';
import {HomeService} from '../../../home/services/home-service';

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
export class Wishlist implements OnInit{
  wishlist: any  = null;

  constructor(private homeService: HomeService) {

  }

  ngOnInit() {
    this.homeService.getNewReleases().subscribe(u=>{
      this.wishlist = u.slice(-2, -1)
    })
  }


}
