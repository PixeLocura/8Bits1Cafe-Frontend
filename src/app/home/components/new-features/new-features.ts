import { Component, Input } from '@angular/core';
import {Game} from '../../../shared/models/game.model';
import {MOCK_GAMES} from '../../../shared/mock/mock-games';
import {RouterLink} from '@angular/router';
import {LucideAngularModule} from 'lucide-angular';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-new-features',
  imports: [
    RouterLink,
    LucideAngularModule,
    NgForOf,
    NgIf
  ],
  templateUrl: './new-features.html',
})
export class NewFeatures {
  @Input({transform: (value: Game[] | null): Game[]=> {
    if(value == null) return MOCK_GAMES;
    return value;
    }}) arrivals!: Game[];
}
