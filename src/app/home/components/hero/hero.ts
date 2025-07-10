import {Component, Input, OnInit} from '@angular/core';
import { Game } from '../../../shared/interfaces/game.interfaces';
import {RouterLink} from '@angular/router';
import {LucideAngularModule} from "lucide-angular"
import {CartService} from '../../../shared/services/cart';
import {UserService} from '../../../profile/services/user-service';

@Component({
  selector: 'app-hero',
  imports: [
    RouterLink,
    LucideAngularModule,
  ],
  templateUrl: './hero.html',
})
export class Hero implements OnInit{
  @Input() deal: Game|null = null

  isPurchased : Boolean = false

  constructor(private cartService: CartService, private userService: UserService) {

  }
  ngOnInit() {
    this.userService.ownedGames.subscribe(()=>{
      if(!this.deal)return
      this.isPurchased = this.userService.isPurchased(this.deal.id)
    })
  }

  addToCart(){
    if(!this.deal) return
    this.cartService.addToCart(this.deal.id)
  }
}
