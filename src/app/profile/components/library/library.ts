import {Component, OnInit} from '@angular/core';
import {GameCard} from '../game-card/game-card';
import {NgForOf} from '@angular/common';
import {HomeService} from '../../../home/services/home-service';
import {Game} from '../../../shared/interfaces/game.interfaces';
import {UserService} from '../../services/user-service';

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
  ownedGames: Game[]|null = null;
  recentlyViewed: Game[]|null = null;

  constructor(private homeService: HomeService, private userService: UserService) {
  }
  ngOnInit() {
    this.homeService.getNewReleases().subscribe(u =>{
      this.recentlyViewed = u.slice(-4, -1)
    })

    this.userService.ownedGames.subscribe(u=>{
      this.ownedGames = u;
    })
  }
}
