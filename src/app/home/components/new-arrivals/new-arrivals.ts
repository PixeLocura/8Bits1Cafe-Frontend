import {Component, Input} from '@angular/core';
import {RouterLink} from '@angular/router';
import {LucideAngularModule} from 'lucide-angular';
import {Game} from '../../../shared/models/game.model';
import {MOCK_GAMES} from '../../../shared/mock/mock-games';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-new-arrivals',
  imports: [
    RouterLink,
    LucideAngularModule,
    NgForOf
  ],
  templateUrl: './new-arrivals.html',
})
export class NewArrivals {
  @Input({transform: (value: any[] | null): any[]=> {
      return value as any;
      if(value == null) return MOCK_GAMES;
    }}) arrivals!: any[];
}
