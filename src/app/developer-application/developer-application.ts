import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { DeveloperService } from '../developer/services/developer.service';
import { AuthService } from '../auth/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface DeveloperApplicationData {
  developerName: string;
  description: string;
  websiteUrl: string;
}

@Component({
  selector: 'app-developer-application',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './developer-application.html',
  styleUrl: './developer-application.css',
})
export class DeveloperApplication implements OnInit {
  applicationForm: FormGroup;
  errorMessage: string = '';
  loading = true;

  constructor(
    private fb: FormBuilder,
    private developerService: DeveloperService,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.applicationForm = this.fb.group({
      developerName: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(50)]],
      websiteUrl: [
        '',
        [Validators.required, Validators.pattern('https?://.+')],
      ],
      profilePictureUrl: ['', [Validators.pattern('https?://.+')]],
    });
  }

  ngOnInit(): void {
    this.developerService.checkHasDeveloperProfile().subscribe({
      next: (res) => {
        console.log('🔍 checkHasDeveloperProfile response:', res);
        if (res.exists && res.developerId) {
          this.router.navigate([`/developer/${res.developerId}`]);
        } else {
          this.loading = false;
        }
      },
      error: (err) => {
        console.error('🔍 checkHasDeveloperProfile error:', err);
        this.loading = false;
      },
    });
  }
  
  
  

  onSubmit() {
    if (this.applicationForm.valid) {
      const { developerName, description, websiteUrl, profilePictureUrl } =
        this.applicationForm.value;
  
      this.developerService
        .createDeveloper({
          name: developerName,
          description,
          website: websiteUrl,
          profilePictureUrl: profilePictureUrl || undefined,
        })
        .subscribe({
          next: (dev) => {
            console.log('✅ createDeveloper response:', dev);
            this.snackBar.open(
              'Perfil de desarrollador creado con éxito',
              'Cerrar',
              { duration: 3000 }
            );
            this.router.navigate([`/developer/${dev.id}`]);
          },
          error: (err) => {
            console.error('❌ Error creando developer:', err);
            this.errorMessage = 'Error al crear el perfil de desarrollador.';
          },
        });
    } else {
      this.errorMessage = 'Por favor, complete todos los campos correctamente.';
    }
  }
}  
