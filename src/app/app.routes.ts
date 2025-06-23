import { Routes } from '@angular/router';
import { Login } from './auth/login/login';
import { BecomeDeveloper } from './become-developer/become-developer';
import { DeveloperApplication } from './developer-application/developer-application';

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
    path: 'register',
    loadComponent: () =>
      import('./register/register-component').then(m => m.RegisterComponent),
  },

  {
    path: 'login',
    component: Login
  },

  { path: '', redirectTo: '/register', pathMatch: 'full' },


  // Página 404 - ruta comodín
  {
    path: '**',
    loadComponent: () =>
      import('./not-found/not-found.component').then((m) => m.NotFoundComponent),
  },
];
