import { Routes } from '@angular/router';

export const appRoutes: Routes = [
  {
    path: 'register',
    loadComponent: () =>
      import('./register/register-component').then(m => m.RegisterComponent),
  },

  {
    path: 'login',
    loadComponent: () =>
      import('./login/login.component').then(m => m.LoginComponent),
  },

  { path: '', redirectTo: '/register', pathMatch: 'full' },

  // Página 404 - ruta comodín
 
  { path: '', redirectTo: '/register', pathMatch: 'full' },
];
