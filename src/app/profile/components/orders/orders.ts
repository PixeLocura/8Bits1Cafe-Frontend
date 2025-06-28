import { Component } from '@angular/core';
import {NgClass, NgForOf} from '@angular/common';

@Component({
  selector: 'app-orders',
  imports: [
    NgClass,
    NgForOf
  ],
  templateUrl: './orders.html',
  styleUrl: './orders.css'
})
export class Orders {
  orders = [
    { id: 'ORD-001', date: '2023-05-15', status: 'Delivered', total: 24.98, items: 2 },
    { id: 'ORD-002', date: '2023-04-22', status: 'Completed', total: 9.99, items: 1 },
  ];
}
