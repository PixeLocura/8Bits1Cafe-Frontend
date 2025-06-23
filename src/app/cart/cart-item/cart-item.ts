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
    @Input() quantity!: number;
    @Input() imageUrl!: string;

    @Output() quantityChange = new EventEmitter<number>();
    @Output() remove = new EventEmitter<void>();

    updateQuantity(change: number): void {
        const newQuantity = this.quantity + change;
        if (newQuantity > 0) {
            this.quantityChange.emit(newQuantity);
        }
    }

    removeItem(): void {
        this.remove.emit();
    }
}
