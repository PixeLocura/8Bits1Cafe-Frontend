import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-cart-item',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './cart-item.html',
    styleUrls: ['./cart-item.css']
})
export class CartItem {
    @Input() id!: string;
    @Input() name!: string;
    @Input() price!: number;
    @Input() imageUrl!: string;

    @Output() remove = new EventEmitter<void>();

    removeItem(): void {
        this.remove.emit();
    }
}
