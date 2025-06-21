import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderNavigation } from './header-navigation/header-navigation';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderNavigation],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class AppComponent {
  protected title = '8Bits1Cafe-frontend';
}
