import { ApplicationConfig, importProvidersFrom, provideBrowserGlobalErrorListeners, provideZoneChangeDetection, LOCALE_ID } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { AuthInterceptor } from './auth/interceptors/auth.interceptor';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { appRoutes } from './app.routes';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {
  Coffee,
  Gamepad2,
  Star,
  ChevronRight,
  ArrowRight,
  Search,
  Users,
  ShoppingCart,
  Sparkles,
  Heart,
  Tag,
  Package,
  LucideAngularModule,
  TrendingUp,
  Monitor,
  Clock
} from 'lucide-angular';

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(BrowserModule, ReactiveFormsModule, MatSnackBarModule, LucideAngularModule.pick({
      Coffee,
      Gamepad2,
      Star,
      ChevronRight,
      ArrowRight,
      Search,
      Users,
      ShoppingCart,
      Sparkles,
      Heart,
      Tag,
      Package,
      TrendingUp,
      Monitor,
      Clock
    })),
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes),
    provideHttpClient(
      withInterceptors([AuthInterceptor])
    ),
    { provide: LOCALE_ID, useValue: 'es-ES' }
  ]
};
