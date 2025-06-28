import { Component } from '@angular/core';
import {RouterLink} from '@angular/router';
import {NgClass, NgForOf, NgSwitch} from '@angular/common';
import {LucideAngularModule} from 'lucide-angular';

@Component({
  selector: 'app-categories',
  imports: [
    RouterLink,
    NgClass,
    LucideAngularModule,
    NgForOf,
  ],
  templateUrl: './categories.html',
})
export class Categories {
  categories = [
    { name: 'Adventure', icon: "gamepad2", color: 'bg-yellow-500', count: 42 },
    { name: 'Puzzle', icon: "star", color: 'bg-blue-500', count: 38 },
    { name: 'Simulation', icon: "coffee", color: 'bg-green-500', count: 25 },
    { name: 'RPG', icon: "sparkles", color: 'bg-purple-500', count: 31 },
  ];
}
