import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { LucideIconComponent } from '../../../component/lucide-icon.component';
import { DeveloperGamesListComponent } from '../developer-games-list/developer-games-list';
import { Developer, Country, COUNTRY_INFO_MAP } from '../../interfaces/developer.interfaces';
import { DeveloperService } from '../../services/developer.service';

@Component({
  selector: 'app-developer-profile',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    LucideIconComponent,
    DeveloperGamesListComponent,
    DatePipe
  ],
  templateUrl: './developer-profile.html',
  styleUrl: './developer-profile.css'
})
export class DeveloperProfileComponent implements OnInit {
  public COUNTRY_INFO_MAP = COUNTRY_INFO_MAP;
  developer: Developer = {
    id: '',
    name: '',
    description: '',
    website: '',
    creationDate: '',
    country: null, // Use null for no country, or e.g. Country.ES for Spain
    games: []
  };
  loading = true;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private developerService: DeveloperService
  ) { }

  ngOnInit() {
    const developerId = this.route.snapshot.paramMap.get('id');
    console.log('📌 DeveloperProfileComponent - developerId param:', developerId);
  
    if (!developerId) {
      this.error = 'No se encontró el ID del desarrollador';
      this.loading = false;
      return;
    }
  
    this.developerService.getDeveloper(developerId).subscribe({
      next: (developer) => {
        console.log('✅ DeveloperProfileComponent - getDeveloper response:', developer);
        this.developer = developer;
        this.loading = false;
      },
      error: (error) => {
        console.error('❌ DeveloperProfileComponent - Error fetching developer:', error);
        this.error = 'Error al cargar el perfil del desarrollador';
        this.loading = false;
      }
    });
  }
  
}
