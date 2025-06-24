import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { icons } from 'lucide';

@Component({
  selector: 'app-lucide-icon',
  standalone: true,
  imports: [CommonModule],
  template: `<span [innerHTML]="svgIcon" class="inline-block" [ngClass]="customClass"></span>`,
})
export class LucideIconComponent {
  @Input() name: string = '';
  @Input() size: number = 24;
  @Input() customClass: string = '';

  get svgIcon(): string {
    const icon = (icons as Record<string, any>)[this.name];
    return icon ? icon.toSvg({ width: this.size, height: this.size }) : '';
  }
}
