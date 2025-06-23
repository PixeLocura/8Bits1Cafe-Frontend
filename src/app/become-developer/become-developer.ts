import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface FeatureBox {
  title: string;
  description: string;
}

@Component({
  selector: 'app-become-developer',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './become-developer.html',
  styleUrl: './become-developer.css'
})
export class BecomeDeveloper {
  mainTitle = 'Conviértete en Desarrollador';
  subtitle = 'De Jugador a Creador';
  description = 'Da el paso y comparte tus creaciones con miles de jugadores en nuestra plataforma';

  benefits = [
    'Comparte tus juegos con una comunidad activa de jugadores',
    'Recibe retroalimentación directa de los usuarios',
    'Genera ingresos con tus creaciones',
    'Conecta con otros desarrolladores independientes',
    'Promociona tus juegos en un mercado especializado'
  ];

  noteText = 'Al convertirte en desarrollador, podrás subir tus propios juegos a nuestra tienda, gestionar tus lanzamientos y acceder a estadísticas sobre el rendimiento de tus títulos.';
  policyNote = 'Nuestro equipo revisará tus envíos para asegurar que cumplen con nuestras políticas.';

  featureBoxes: FeatureBox[] = [
    {
      title: 'Publica Tus Juegos',
      description: 'Sube tus creaciones y compártelas con nuestra comunidad de jugadores apasionados.'
    },
    {
      title: 'Analíticas Detalladas',
      description: 'Accede a estadísticas sobre descargas, reseñas y comportamiento de los usuarios.'
    },
    {
      title: 'Gestiona Tus Ingresos',
      description: 'Configura los precios de tus juegos y haz seguimiento de tus ganancias.'
    }
  ];

  buttonText = 'Convertirse en Desarrollador';
}
