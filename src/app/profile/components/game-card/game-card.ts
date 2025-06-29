import {Component, Input} from '@angular/core';
import {LucideAngularModule} from "lucide-angular";
import {NgForOf, NgIf} from "@angular/common";
import {Game} from '../../../shared/models/game.model';

@Component({
  selector: 'app-game-card',
    imports: [
        LucideAngularModule,
        NgForOf,
        NgIf
    ],
  templateUrl: './game-card.html',
  styleUrl: './game-card.css'
})
export class GameCard {
@Input() game!: any
}
