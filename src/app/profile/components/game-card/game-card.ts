import {Component, Input} from '@angular/core';
import {LucideAngularModule} from "lucide-angular";
import {DatePipe, NgForOf, NgIf} from "@angular/common";
import {Game} from '../../../shared/models/game.model';

@Component({
  selector: 'app-game-card',
  imports: [
    LucideAngularModule,
    NgForOf,
    DatePipe,
  ],
  templateUrl: './game-card.html',
  styleUrl: './game-card.css'
})
export class GameCard {
@Input() game!: any
}
