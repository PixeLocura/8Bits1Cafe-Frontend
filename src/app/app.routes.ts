import { Routes } from '@angular/router';
import { Login } from './auth/login/login';

export const appRoutes: Routes = [

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

  { path: '', redirectTo: '/register', pathMatch: 'full' },

 
  // Página 404 - ruta comodín
  {
    path: '**',
    loadComponent: () =>
      import('./not-found/not-found.component').then((m) => m.NotFoundComponent),
  },
];