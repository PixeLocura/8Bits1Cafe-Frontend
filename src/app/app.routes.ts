import { Routes } from '@angular/router';
import { RegisterComponent } from './register/register-component';

export const appRoutes: Routes = [
  { path: 'register', component: RegisterComponent },
  {
    path: 'favorites',
    loadComponent: () =>
      import('./favorites/favorites.component').then(m => m.FavoritesComponent),
  },
  { path: '', redirectTo: '/register', pathMatch: 'full' },

  // Página 404 - ruta comodín
  {
    path: '**',
    loadComponent: () =>
      import('./not-found/not-found.component').then((m) => m.NotFoundComponent),
  },
];
