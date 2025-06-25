import { Component } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormGroup } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../auth/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  isSubmitting = false;
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit() {
    if (this.form.invalid) return;

    this.isSubmitting = true;

    this.authService.login(this.form.value).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.router.navigate(['/']); // Navigate to home after successful login
      },
      error: (error) => {
        console.error('Login error:', error);
        this.isSubmitting = false;
        alert('Error al iniciar sesión. Por favor, intente nuevamente.');
      }
    });
  }
}
