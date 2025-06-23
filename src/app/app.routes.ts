import { Routes } from '@angular/router';

export const appRoutes: Routes = [
  {
    path: 'register',
    loadComponent: () =>
      import('./register/register-component').then(m => m.RegisterComponent),
  },

  {
    path: 'favorites',
    loadComponent: () =>
      import('./favorites/favorites.component').then(m => m.FavoritesComponent),
  },

  {
    path: 'orders',
    loadComponent: () =>
      import('./orders/orders.component').then(m => m.OrdersComponent),
  },

  {
    path: 'login',
    loadComponent: () =>
      import('./login/login.component').then(m => m.LoginComponent),
  },

  { path: '', redirectTo: '/register', pathMatch: 'full' },

  // Página 404 - ruta comodín
  {
    path: 'login',
    loadComponent: () =>
      import('./login/login.component').then(m => m.LoginComponent),
  },

  { path: '', redirectTo: '/register', pathMatch: 'full' },
];
