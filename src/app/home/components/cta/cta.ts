import { Component } from '@angular/core';
import {RouterLink} from '@angular/router';
import {LucideAngularModule} from 'lucide-angular';

@Component({
  selector: 'app-cta',
  imports: [
    RouterLink,
    LucideAngularModule
  ],
  templateUrl: './cta.html',
})
export class Cta {

}
