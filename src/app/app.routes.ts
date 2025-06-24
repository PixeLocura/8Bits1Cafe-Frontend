import { Routes } from '@angular/router';
import { Login } from './auth/login/login';
import { BecomeDeveloper } from './become-developer/become-developer';
import { DeveloperApplication } from './developer-application/developer-application';
import { GamePageComponent } from './game-page/game-page.component';


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
    path: 'buscar-juegos',
    loadComponent: () =>
      import('./buscar-juegos/buscar-juegos.component').then(m => m.BuscarJuegosComponent),
  },

  {
    path: 'categories',
    loadComponent: () =>
      import('./categories/categories.component').then(m => m.CategoriesComponent),
  },


  {
    path: 'juego/:id',
    loadComponent: () => import('./game-page/game-page.component').then(m => m.GamePageComponent),
  },

  { path: '', redirectTo: '/register', pathMatch: 'full' },


  // Página 404 - ruta comodín
  {
    path: '**',
    loadComponent: () =>
      import('./not-found/not-found.component').then((m) => m.NotFoundComponent),
  },
];
