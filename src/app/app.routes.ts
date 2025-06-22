import { Routes } from '@angular/router';
import { RegisterComponent } from './register/register-component';

export const appRoutes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: '', redirectTo: '/register', pathMatch: 'full' },

  // Página 404 - Ruta comodín
  {
    path: '**',
    loadComponent: () =>
      import('./not-found/not-found.component').then((m) => m.NotFoundComponent),
  },
];
