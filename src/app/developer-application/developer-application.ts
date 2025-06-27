import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { DeveloperService, DeveloperDTO } from '../services/developer.service';

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
  styleUrl: './developer-application.css'
})
export class DeveloperApplication implements OnInit {
  applicationForm: FormGroup;
  errorMessage: string = '';


  constructor(private fb: FormBuilder, private developerService: DeveloperService, private router:Router) {
    this.applicationForm = this.fb.group({
      developerName: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(50)]],
      websiteUrl: ['', [Validators.required, Validators.pattern('https?://.+')]]
    });
  }

  ngOnInit(): void { }

  onSubmit() {
    if (this.applicationForm.valid) {
      const formData: DeveloperDTO = {
        name: this.applicationForm.value.developerName,
        description: this.applicationForm.value.description,
        website: this.applicationForm.value.websiteUrl
      };

      this.developerService.createDeveloper(formData).subscribe({
        next: (response) => {
          console.log('Developer creado:', response);

          // ✅ Guardamos el id en localStorage para usarlo en el registro
          localStorage.setItem('developerId', response.id!);

          // ✅ Redirigir al formulario de registro
          this.router.navigate(['/register']);
        },

        error: (error) => {
          console.error('Error al crear developer:', error);
          this.errorMessage = 'Error al crear el perfil. Intenta nuevamente.';
        }
      });
    } else {
      this.errorMessage = 'Por favor, complete todos los campos correctamente.';
    }
  }

}
