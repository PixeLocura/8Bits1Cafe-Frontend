import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LucideIconComponent } from '../component/lucide-icon.component';
import { ResenaComponent } from '../resena/resena.component';

import { MOCK_GAMES } from '../shared/mock/mock-games';
import { Game } from '../shared/models/game.model';

@Component({
  selector: 'app-game-page',
  standalone: true,
  imports: [CommonModule, LucideIconComponent, RouterModule, ResenaComponent],
  templateUrl: './game-page.component.html',
})
export class GamePageComponent {
  mostrarModal: boolean = false;
  juego : Game | null = null;
  juegosDelMismoDev: Game[] = [];
  tabSeleccionado: 'descripcion' | 'requisitos' | 'resenas' = 'descripcion';

  constructor(private route: ActivatedRoute, private router: Router) {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    const juegoEncontrado = MOCK_GAMES.find(j => j.id === id);

    if (!juegoEncontrado) {
      alert('Juego no encontrado');
      this.router.navigate(['/buscar-juegos']);
    } else {
      this.juego = juegoEncontrado;
      this.juegosDelMismoDev = MOCK_GAMES.filter(g => g.developer === this.juego?.developer && g.id !== this.juego?.id);
    }
  }

  volverABusqueda() {
    this.router.navigate(['/buscar-juegos']);
  }

  seleccionarTab(tab: 'descripcion' | 'requisitos' | 'resenas') {
    this.tabSeleccionado = tab;
  }

  agregarAFavoritos() {
    alert('Agregado a favoritos (simulado)');
  }

  compartir() {
    alert('Compartido (simulado)');
  }

  comprar() {
    alert('Gracias por tu compra (simulado)');
  }

  jugarDemo() {
    alert('Abriendo demo (simulado)');
  }

  descargarJuego() {
    alert('Descargando (simulado)');
  }

  tieneMasDeUnaImagen(juego: Game | null): boolean {
    return !!juego?.images && juego.images.length > 1;
  }

  //MODAL DE RESENA
  abrirModal(game: Game) {
    if (!this.isLoggedIn()) {
      alert('Debes iniciar sesión para dejar una reseña');
      return;
    }
    this.mostrarModal = true;
  }

  cerrarModal() {
    this.mostrarModal = false;
  }

  guardarResena(data: { comentario: string, rating: number }) {
    console.log('Reseña guardada', data);
    this.cerrarModal();
  }

  isLoggedIn(): boolean {
    return true; // Simulación
  }

}
