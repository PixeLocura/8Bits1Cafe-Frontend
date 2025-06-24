import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-resena',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './resena.component.html',
})
export class ResenaComponent {
  @Input() gameTitle: string = '';
  @Input() show: boolean = false;
  @Output() close = new EventEmitter<void>();
  @Output() submitReview = new EventEmitter<{ comentario: string, rating: number }>();

  comentario: string = '';
  rating: number = 0;

  enviarResena(event: Event) {
    event.preventDefault(); // previene el comportamiento del formulario
    this.submitReview.emit({ comentario: this.comentario, rating: this.rating });
    this.cerrarModal();
  }


  cerrarModal() {
    this.comentario = '';
    this.rating = 0;
    this.close.emit();
  }
}
