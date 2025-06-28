import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup, ValidatorFn, AbstractControl, ValidationErrors, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../auth/services/auth.service'; // importa tu servicio
import { HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './register-component.html',
})
export class RegisterComponent {
  isSubmitting = false;
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService, // inyectamos el servicio
    private snackBar: MatSnackBar
  ) {
    this.form = this.fb.group(
      {
        name: ['', Validators.required],
        lastname: ['', Validators.required],
        username: ['', [Validators.required, Validators.minLength(3)]],
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/),
          ],
        ],
        confirmPassword: ['', Validators.required],
        countryIso: ['', Validators.required],
        agreeTerms: [false, Validators.requiredTrue],
      },
      { validators: this.passwordsMatchValidator() }
    );
  }

  private passwordsMatchValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const password = control.get('password')?.value;
      const confirm = control.get('confirmPassword')?.value;
      return password === confirm ? null : { mismatch: true };
    };
  }

  onSubmit() {
    if (this.form.invalid) {
      console.log('Formulario inválido:', this.form.value);

      this.form.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;

    const { confirmPassword, agreeTerms, ...userData } = this.form.value;

    this.authService.register(userData).subscribe({
      next: (response: { token: string }) => {

        localStorage.setItem('token', response.token);
        this.snackBar.open('Cuenta creada exitosamente', 'Cerrar', {
          duration: 3000,
          panelClass: 'snackbar-success',
        });
        this.router.navigate(['/login']); // redirige al login
      },
      error: (err: HttpErrorResponse) => {
        console.error(err);
        this.snackBar.open('Error al registrar', 'Cerrar', {
          duration: 3000
        });
        this.isSubmitting = false;
      }

    });
  }

  continueWithGoogle() {
    window.location.href = `${environment.backendEndpoint}oauth2/authorization/google`;
  }

  continueWithDiscord() {
    window.location.href = `${environment.backendEndpoint}oauth2/authorization/discord`;
  }
}
