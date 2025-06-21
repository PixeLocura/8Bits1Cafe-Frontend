import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderNavigation } from './header-navigation/header-navigation';
import { Footer } from './footer/footer';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderNavigation, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = '8Bits1Cafe-frontend';
}
