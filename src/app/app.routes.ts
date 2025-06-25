import { Routes } from '@angular/router';
import { Login } from './auth/login/login';
import { BecomeDeveloper } from './become-developer/become-developer';
import { DeveloperApplication } from './developer-application/developer-application';
import { CartPage } from './cart/cart-page/cart-page';
import { SuccessfulPurchase } from './successful-purchase/successful-purchase';

export const appRoutes: Routes = [
  {
    path: 'become-developer',
    component: BecomeDeveloper,
  },

  {
    path: 'developer-application',
    component: DeveloperApplication,
  },

  {
    path: 'successful-purchase',
    component: SuccessfulPurchase,
  },

  {
    path: 'favorites',
    loadComponent: () =>
      import('./favorites/favorites.component').then(m => m.FavoritesComponent),
  },

  {
    path: 'review',
    loadComponent: () =>
      import('./resena/resena.component').then(m => m.ResenaComponent),
  },
  {
    path: 'orders',
    loadComponent: () =>
      import('./orders/orders.component').then(m => m.OrdersComponent),
  },

  {
    path: 'developer/dashboard',
    loadComponent: () =>
      import('./developer-dashboard/developer-dashboard.component').then(m => m.DeveloperDashboardComponent),
  },

  {
    path: 'register',
    loadComponent: () =>
      import('./register/register-component').then(m => m.RegisterComponent),
  },

  {
    path: 'login',
    component: Login
  },
  {
    path: 'cart',
    component: CartPage,
  },
  {
    path: 'buscar-juegos',
    loadComponent: () =>
      import('./buscar-juegos/buscar-juegos.component').then(m => m.BuscarJuegosComponent),
  },
  { path: '', redirectTo: '/register', pathMatch: 'full' },

  {
    path: 'developer',
    loadChildren: () =>
      import('./developer/developer.routes').then(m => m.developerRoutes),
  },
  // Página 404 - ruta comodín
  {
    path: '**',
    loadComponent: () =>
      import('./not-found/not-found.component').then((m) => m.NotFoundComponent),
  },
];
