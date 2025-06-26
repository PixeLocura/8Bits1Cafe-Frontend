import {Component, Input} from '@angular/core';
import {Game} from '../../../shared/models/game.model';
import {RouterLink} from '@angular/router';
import {LucideAngularModule} from "lucide-angular"
import {MOCK_GAMES} from '../../../shared/mock/mock-games';

@Component({
  selector: 'app-hero',
  imports: [
    RouterLink,
    LucideAngularModule,
  ],
  templateUrl: './hero.html',
})
export class Hero {
  @Input({transform: (value: Game | null): Game =>
    {
      if(value == null) return MOCK_GAMES[0];
     return value;
    }}) deal!: Game
}
