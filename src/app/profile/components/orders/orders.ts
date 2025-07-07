import {Component, Input, OnInit} from '@angular/core';
import {DatePipe, NgClass, NgForOf, NgIf} from '@angular/common';
import {UserService} from '../../services/user-service';
import {AuthService} from '../../../auth/services/auth.service';

@Component({
  selector: 'app-orders',
  imports: [
    NgForOf,
    NgIf,
    DatePipe
  ],
  templateUrl: './orders.html',
  styleUrl: './orders.css'
})
export class Orders implements OnInit{

  orders: any[] | undefined = [
    { id: 'ORD-001', date: '2023-05-15', status: 'Delivered', total: 24.98, items: 2 },
    { id: 'ORD-002', date: '2023-04-22', status: 'Completed', total: 9.99, items: 1 },
  ];

  constructor(private userService: UserService, private authService: AuthService) {
  }

  ngOnInit() {
    const id = this.authService.getCurrentUser()?.id??""

    this.userService.transaction.subscribe(res=>{
      this.orders = res??[];
      console.log(res)
    })

  }
}
