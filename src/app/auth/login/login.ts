import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      remember: [false]
    });
  }

  onSubmit() {
    console.log('Form submission started');
    console.log('Form validity:', this.loginForm.valid);
    console.log('Form values:', this.loginForm.value);

    if (this.loginForm.valid) {
      this.errorMessage = '';
      const { email, password } = this.loginForm.value;
      console.log('Attempting login for email:', email);

      this.authService.login({ email, password }).subscribe({
        next: (response) => {
          console.log('Login successful in component');
          console.log('Navigation starting...');
          this.router.navigate(['/']);
        },
        error: (error: HttpErrorResponse) => {
          console.error('Login error in component:', error);
          console.error('Error details:', {
            status: error.status,
            statusText: error.statusText,
            url: error.url,
            name: error.name,
            message: error.message,
            error: error.error
          });

          if (error.status === 401) {
            this.errorMessage = 'Invalid email or password';
            console.error('Authentication failed: Invalid credentials');
          } else if (error.status === 0) {
            this.errorMessage = 'Cannot connect to the server. Please check your internet connection.';
            console.error('Network error: Cannot reach the server');
          } else {
            this.errorMessage = `An error occurred (${error.status}). Please try again later.`;
            console.error(`Unexpected error: ${error.status}`);
          }
          this.loginForm.setErrors({ credentials: true });
        }
      });
    } else {
      console.log('Form validation errors:', this.loginForm.errors);
      console.log('Email field errors:', this.email?.errors);
      console.log('Password field errors:', this.password?.errors);
    }
  }

  // Helper methods for form validation
  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }
}
