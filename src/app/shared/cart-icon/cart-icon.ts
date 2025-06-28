import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
    selector: 'app-cart-icon',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './cart-icon.html',
    styleUrl: './cart-icon.css'
})
export class CartIcon {
    @Input() itemCount: number = 0;

    constructor(private router: Router) { }

    onClick(): void {
        this.router.navigate(['/cart']);
    }
}
