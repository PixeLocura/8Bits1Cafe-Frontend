import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';

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

  constructor(private fb: FormBuilder) {
    this.applicationForm = this.fb.group({
      developerName: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(50)]],
      websiteUrl: ['', [Validators.required, Validators.pattern('https?://.+')]]
    });
  }

  ngOnInit(): void { }

  onSubmit() {
    if (this.applicationForm.valid) {
      // TODO: Implement the API call to submit developer application
      console.log('Form submitted:', this.applicationForm.value);
    } else {
      this.errorMessage = 'Por favor, complete todos los campos correctamente.';
    }
  }
}
