import { Component, Input } from '@angular/core';
import {MOCK_GAMES} from '../../../shared/mock/mock-games';
import {RouterLink} from '@angular/router';
import {LucideAngularModule} from 'lucide-angular';
import {DatePipe, NgForOf, NgIf} from '@angular/common';
import {UserService} from '../../../profile/services/user-service';
import {CartService} from '../../../shared/services/cart';

@Component({
  selector: 'app-new-features',
  imports: [
    RouterLink,
    LucideAngularModule,
    NgForOf,
    NgIf,
    DatePipe
  ],
  templateUrl: './new-features.html',
})
export class NewFeatures {
  @Input({transform: (value: any[] | null): any[]=> {
    return value as any;
    if(value == null) return MOCK_GAMES;
    }}) arrivals!: any[];

  ownedGames: any[] = []

  constructor(private userService: UserService, private cartService: CartService)
  {
    userService.ownedGames.subscribe(v=>{
      if(!v)return
      this.ownedGames = v
    })
  }
  isPurchased(id: string){
    return !!this.ownedGames.find(v=>v.id == id);
  }

  addToCart(id: string){
    this.cartService.addToCart(id)

  }

}
