import {Component, OnInit} from '@angular/core';
import {Hero} from '../../components/hero/hero';
import {HomeService} from '../../services/home-service';
import {Categories} from '../../components/categories/categories';
import {NewFeatures} from '../../components/new-features/new-features';
import {Cta} from '../../components/cta/cta';
import {NewArrivals} from '../../components/new-arrivals/new-arrivals';
import { Game } from '../../../shared/interfaces/game.interfaces';

@Component({
  selector: 'app-home',
  imports: [
    Hero,
    Categories,
    NewFeatures,
    Cta,
    NewArrivals
  ],
  templateUrl: './home.html',
})
export class Home implements OnInit{
  dealOfTheDay : Game | null = null
  newReleases : Game[] | null = null

  constructor(private homeService: HomeService) {
  }

  ngOnInit(){

    this.homeService.getDealGame().subscribe(games=>{
      this.dealOfTheDay = games[0]
      console.log('FIND', this.dealOfTheDay);
    })

    this.homeService.getNewReleases().subscribe(games =>{
      this.newReleases = games
    });
  }

}
