import {Component, OnInit} from '@angular/core';
import {Hero} from '../../components/hero/hero';
import {Observable} from 'rxjs';
import {Game} from '../../../shared/models/game.model';
import {HomeService} from '../../services/home-service';
import {AsyncPipe} from '@angular/common';
import {Categories} from '../../components/categories/categories';
import {NewFeatures} from '../../components/new-features/new-features';
import {Cta} from '../../components/cta/cta';
import {NewArrivals} from '../../components/new-arrivals/new-arrivals';

@Component({
  selector: 'app-home',
  imports: [
    Hero,
    AsyncPipe,
    Categories,
    NewFeatures,
    Cta,
    NewArrivals
  ],
  templateUrl: './home.html',
})
export class Home implements OnInit{
  dealOfTheDay !: Observable<Game>
  newReleases !: Observable<Game[]>

  constructor(private homeService: HomeService) {
  }

  ngOnInit(){
    this.dealOfTheDay = this.homeService.getDealGame();
    this.newReleases = this.homeService.getNewReleases();

    console.log('FIND', this.dealOfTheDay)

  }

}
