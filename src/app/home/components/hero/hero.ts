import {Component, Input} from '@angular/core';
import { Game } from '../../../shared/interfaces/game.interfaces';
import {RouterLink} from '@angular/router';
import {LucideAngularModule} from "lucide-angular"

@Component({
  selector: 'app-hero',
  imports: [
    RouterLink,
    LucideAngularModule,
  ],
  templateUrl: './hero.html',
})
export class Hero {
  @Input() deal: Game|null = null
}
