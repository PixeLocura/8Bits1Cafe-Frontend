import { Component } from '@angular/core';
import {RouterLink} from '@angular/router';
import {LucideAngularModule} from 'lucide-angular';

@Component({
  selector: 'app-news-updates',
  imports: [
    RouterLink,
    LucideAngularModule
  ],
  templateUrl: './news-updates.html',
})
export class NewsUpdates {

}
