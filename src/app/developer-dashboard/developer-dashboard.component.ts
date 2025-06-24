import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LucideIconComponent } from '../component/lucide-icon.component'; // Ajusta si tu path es distinto

@Component({
  selector: 'app-developer-dashboard',
  standalone: true,
  templateUrl: './developer-dashboard.component.html',
  imports: [
    CommonModule,         // ⬅️ Importante para *ngIf, *ngFor, ngClass, etc.
    RouterModule,
    LucideIconComponent,
  ]
})
export class DeveloperDashboardComponent {
  activeTab: string = 'overview';

  developerGames = [
    {
      id: '1',
      title: 'Pixel Adventure',
      status: 'published',
      date: '12/04/2023',
      downloads: 1243,
      revenue: '$2,486',
      rating: 4.7,
    },
    {
      id: '2',
      title: 'Cyber Drift',
      status: 'in-review',
      date: '28/04/2023',
      downloads: 0,
      revenue: '$0',
      rating: 0,
    },
    {
      id: '3',
      title: 'Galaxy Defender',
      status: 'draft',
      date: '05/05/2023',
      downloads: 0,
      revenue: '$0',
      rating: 0,
    },
  ];

  getStatusColor(status: string): string {
    switch (status) {
      case 'published': return 'bg-green-500 text-white';
      case 'in-review': return 'bg-yellow-500 text-black';
      case 'draft': return 'bg-slate-500 text-white';
      default: return 'bg-slate-500 text-white';
    }
  }

  getStatusText(status: string): string {
    switch (status) {
      case 'published': return 'Publicado';
      case 'in-review': return 'En Revisión';
      case 'draft': return 'Borrador';
      default: return status;
    }
  }

  get totalRevenue(): number {
    return this.developerGames.reduce((acc, g) => {
      const cleaned = g.revenue.replace('$', '').replace(',', '');
      return acc + parseFloat(cleaned);
    }, 0);
  }

  get totalDownloads(): number {
    return this.developerGames.reduce((acc, g) => acc + g.downloads, 0);
  }
}
