import {Component, OnInit} from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {AuthService} from '../../../auth/services/auth.service';
import {User} from '../../../auth/interfaces/auth.interfaces';
import {LucideAngularModule} from 'lucide-angular';
import {DatePipe} from '@angular/common';
import {UserService} from '../../services/user-service';
import {FavoritesService} from '../../../services/favorites.service';

@Component({
  selector: 'app-profile-layout',
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    LucideAngularModule,
    DatePipe

  ],
  templateUrl: './profile-layout.html',
})
export class ProfileLayout implements OnInit{
  user: User|null = null
  avatar = 'https://i.pravatar.cc/300'
  numberOfGames : number|null = null
  numberOfFavourites: number | null = null

  constructor(protected authService: AuthService, private userService: UserService, private favoritesService: FavoritesService) {
  }

  ngOnInit() {
    this.authService.currentUser$.subscribe(u=> this.user = u);
    this.userService.transaction.subscribe(val=>{
      console.log("transactioj found", val)
      this.numberOfGames = (val??[]).length
    })
    this.favoritesService.favourites.subscribe(u=>{
      this.numberOfFavourites = u.length
    })
  }

  logout(){
    this.authService.logout()
    window.location.reload()
  }
}
