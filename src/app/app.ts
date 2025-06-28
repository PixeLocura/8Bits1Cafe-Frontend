import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderNavigation } from './header-navigation/header-navigation';
import { Footer } from './footer/footer';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderNavigation, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class AppComponent {
  protected title = '8Bits1Cafe-frontend';
}
