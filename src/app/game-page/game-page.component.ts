import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { LucideIconComponent } from '../component/lucide-icon.component';
import { ResenaComponent } from '../resena/resena.component';

import { Game } from '../shared/interfaces/game.interfaces';
import { Review } from '../shared/interfaces/review.interface';
import { ReviewService } from '../services/review.service';
import { GameService } from '../services/game.service';
import { Developer } from '../shared/interfaces/developer.interfaces';
import { FavoritesService } from '../services/favorites.service';


@Component({
  selector: 'app-game-page',
  standalone: true,
  templateUrl: './game-page.component.html',
  imports: [CommonModule, RouterModule, LucideIconComponent, ResenaComponent],
})
export class GamePageComponent implements OnInit {
  juego: Game | null = null;
  mostrarModal: boolean = false;
  tabSeleccionado: 'descripcion' | 'requisitos' | 'resenas' = 'descripcion';
  resenas: Review[] = [];
  juegosDelMismoDev: Game[] = [];
  developers: Developer[] = [];
  promedioEstrellas: number = 0;

  constructor(
    private favoritesService: FavoritesService,
    private route: ActivatedRoute,
    private router: Router,
    private reviewService: ReviewService,
    private gameService: GameService
  ) {}

  ngOnInit() {
    // Escucha cambios en el parámetro 'id'
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (!id) {
        alert('ID inválido');
        this.router.navigate(['/buscar-juegos']);
        return;
      }

      this.cargarJuego(id);
    });

    // Cargar developers (solo una vez)
    this.gameService.getAllDevelopers().subscribe({
      next: (data) => this.developers = data,
      error: (err) => {
        console.error('Error al cargar developers:', err);
        this.developers = [];
      }
    });
  }

  // 🔁 Esta función carga todo lo necesario para el juego con el ID dado
  private cargarJuego(id: string) {
    this.gameService.getGameById(id).subscribe({
      next: (game) => {
        this.juego = game;
        this.cargarResenas();
        this.cargarOtrosJuegosDelMismoDesarrollador(game.developer_id, game.id);
        window.scrollTo(0, 0); // Opcional: volver arriba cuando se cambia de juego
      },
      error: () => {
        alert('Juego no encontrado');
        this.router.navigate(['/buscar-juegos']);
      }
    });
  }

  volverABusqueda() {
    this.router.navigate(['/buscar-juegos']);
  }

  seleccionarTab(tab: 'descripcion' | 'requisitos' | 'resenas') {
    this.tabSeleccionado = tab;
  }

  cargarResenas() {
    if (!this.juego) return;

    this.reviewService.obtenerResenasPorJuego(this.juego.id).subscribe({
      next: (data) => {
        this.resenas = data;
        this.calcularPromedioEstrellas();
      },
      error: (err) => {
        console.error('Error al obtener reseñas:', err);
        this.resenas = [];
      }
    });
  }

  calcularPromedioEstrellas(): void {
    if (this.resenas.length === 0) {
      this.promedioEstrellas = 0;
      return;
    }
    const suma = this.resenas.reduce((acc, r) => acc + r.rating, 0);
    this.promedioEstrellas = +(suma / this.resenas.length).toFixed(1);
  }

  cargarOtrosJuegosDelMismoDesarrollador(developerId: string, juegoActualId: string) {
    this.gameService.getAllGames().subscribe({
      next: (allGames) => {
        this.juegosDelMismoDev = allGames.filter(g =>
          g.developer_id === developerId && g.id !== juegoActualId
        );
      },
      error: (err) => {
        console.error('Error al cargar juegos del mismo desarrollador:', err);
      }
    });
  }

  abrirModal() {
    if (!this.isLoggedIn()) {
      alert('Debes iniciar sesión para dejar una reseña');
      return;
    }
    this.mostrarModal = true;
  }

  cerrarModal() {
    this.mostrarModal = false;
  }

  guardarResena(data: { comentario: string; rating: number }) {
    const token = localStorage.getItem('token');
    const gameId = this.juego?.id;

    if (!token || !gameId) {
      alert('Falta información para enviar la reseña.');
      return;
    }

    const email = this.getEmailFromToken(token);
    if (!email) {
      alert('No se pudo identificar al usuario.');
      return;
    }

    if (!data.comentario.trim() || data.rating < 1) {
      alert('Debes escribir un comentario y dar una valoración.');
      return;
    }

    this.reviewService.getUserIdByEmail(email).subscribe({
      next: (response) => {
        const userId = response.id;

        const review = {
          userId,
          gameId,
          comment: data.comentario,
          rating: data.rating
        };

        this.reviewService.crearResena(review).subscribe({
          next: () => {
            alert('¡Reseña publicada con éxito!');
            this.cerrarModal();
            this.cargarResenas();
          },
          error: (err) => {
            console.error('Error al publicar reseña:', err);
            alert('Error al guardar la reseña.');
          }
        });
      },
      error: (err) => {
        console.error('Error al obtener userId por email:', err);
        alert('No se pudo identificar al usuario.');
      }
    });
  }

  getDeveloperNameById(id: string): string {
    const dev = this.developers.find(d => d.id === id);
    return dev ? dev.name : 'Desconocido';
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  tieneMasDeUnaImagen(juego: Game | null): boolean {
    return !!juego?.images && juego.images.length > 1;
  }

  createStars(rating: number): number[] {
    const safeRating = Number(rating);
    return Array.from({ length: isNaN(safeRating) || safeRating < 0 ? 0 : safeRating });
  }

  getEmailFromToken(token: string): string | null {
    try {
      const payload = token.split('.')[1];
      const decoded = atob(payload);
      const parsed = JSON.parse(decoded);
      return parsed.sub || null;
    } catch (error) {
      console.error('Error al decodificar token:', error);
      return null;
    }
  }

  copiarLinkDelJuego(): void {
    const linkActual = window.location.href;
    navigator.clipboard.writeText(linkActual)
      .then(() => alert('✅ Link copiado al portapapeles'))
      .catch(() => alert('❌ No se pudo copiar el link'));
  }


  agregarAFavoritos() {
    if (!this.isLoggedIn()) {
      alert('Debes iniciar sesión para añadir a favoritos');
      return;
    }

    const token = localStorage.getItem('token');
    const userEmail = this.getEmailFromToken(token!);
    const gameId = this.juego?.id;

    if (!userEmail || !gameId) {
      alert('No se pudo añadir a favoritos. Inténtalo de nuevo.');
      return;
    }

    this.reviewService.getUserIdByEmail(userEmail).subscribe({
      next: (res) => {
        const userId = res.id;
        this.favoritesService.addFavorite(userId, { gameId }).subscribe({
          next: () => alert('💖 Juego agregado a favoritos'),
          error: (err) => {
            console.error('Error al agregar a favoritos:', err);
            alert('❌ No se pudo agregar a favoritos');
          }
        });
      },
      error: () => alert('Error al identificar usuario')
    });
  }

  compartir() {
    this.copiarLinkDelJuego();
  }

  comprar() {
    alert('Juego añadido al carrito de compras');
  }

  jugarDemo() {
    alert('🎮 Juego demo descargado. ¡Empieza a jugar!');
  }

  descargarJuego() {
    alert('🔒 Esta función estará disponible cuando compres el juego.');
  }

  irAGamePage(id: string): void {
    this.router.navigate(['/juego', id]);
  }
}
