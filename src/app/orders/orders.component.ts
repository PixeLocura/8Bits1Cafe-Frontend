import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface OrderItem { name: string; price: string; image: string; }
interface Order { id: string; date: string; status: string; items: OrderItem[]; total: string; paymentMethod: string; }

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './orders.component.html',
})
export class OrdersComponent {
  selectedTab = 'all';
  currentPage = 1;
  itemsPerPage = 5;
  orders: Order[] = [ /* ...data copiado... */ ];

  get filtered() {
    if (this.selectedTab==='all') return this.orders;
    if (this.selectedTab==='completed') return this.orders.filter(o => ['Entregado','Completado'].includes(o.status));
    if (this.selectedTab==='pending') return this.orders.filter(o => ['En proceso','Enviado'].includes(o.status));
    if (this.selectedTab==='cancelled') return this.orders.filter(o => ['Cancelado','Reembolsado'].includes(o.status));
    return this.orders;
  }

  formatDate(dateStr: string): string {
    return new Date(dateStr).toLocaleDateString('es-ES');
  }
  
  get paginated() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.filtered.slice(start, start + this.itemsPerPage);
  }

  get totalPages() { return Math.ceil(this.filtered.length / this.itemsPerPage); }

  goBack() { this.selectedTab='all'; this.currentPage=1; }

  getStatusIcon(status: string) {
    const icons: any = {
      'Entregado': '✅', 'Completado': '✅', 'En proceso': '⏳',
      'Enviado': '🚚', 'Cancelado': '❌', 'Reembolsado': '🔄'
    };
    return icons[status] || '📦';
  }

  getStatusColor(status: string) {
    const colors: any = {
      'Entregado': 'bg-green-500', 'Completado': 'bg-green-500',
      'En proceso': 'bg-yellow-500', 'Enviado': 'bg-blue-500',
      'Cancelado': 'bg-red-500', 'Reembolsado': 'bg-purple-500',
    };
    return colors[status] || 'bg-gray-500';
  }
}
