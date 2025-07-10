import {Component, Input, OnInit} from '@angular/core';
import {LucideAngularModule} from "lucide-angular";
import {DatePipe, NgForOf, NgIf} from "@angular/common";
import {Game} from '../../../shared/models/game.model';
import {UserService} from '../../services/user-service';
import {CartService} from '../../../shared/services/cart';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-game-card',
  imports: [
    LucideAngularModule,
    NgForOf,
    DatePipe,
    RouterLink,
  ],
  templateUrl: './game-card.html',
  styleUrl: './game-card.css'
})
export class GameCard implements OnInit{
@Input() game!: any
  isPurchased: boolean = false


  constructor(private userService: UserService, private cartService: CartService) {
  }
  ngOnInit() {
    this.userService.ownedGames.subscribe(()=>{
      this.isPurchased = this.userService.isPurchased(this.game.id)
    })
  }

  addToCart(){
    this.cartService.addToCart(this.game.id)
  }
}
