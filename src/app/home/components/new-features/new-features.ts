import { Component, Input } from '@angular/core';
import {MOCK_GAMES} from '../../../shared/mock/mock-games';
import {RouterLink} from '@angular/router';
import {LucideAngularModule} from 'lucide-angular';
import {DatePipe, NgForOf, NgIf} from '@angular/common';

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
}
