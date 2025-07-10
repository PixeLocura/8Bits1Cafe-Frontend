// settings.component.ts
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { AuthService } from '../../../auth/services/auth.service';
import { User } from '../../../auth/interfaces/auth.interfaces';
import { take } from 'rxjs/operators';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.html',
  imports: [
    ReactiveFormsModule,
    NgIf
  ],
})
export class Settings implements OnInit {
  profileForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ) {
    this.profileForm = this.fb.group({
      name: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
    });
  }

  ngOnInit() {
    // populate form once with the current user
    this.authService.currentUser$
      .pipe(take(1))
      .subscribe(user => {
        if (user) {
          this.profileForm.patchValue({
            name: user.name,
            lastname: user.lastname,
            email: user.email,
            username: user.username,
          });
        }
      });
  }

  onSubmit() {
    if (this.profileForm.invalid) {
      this.profileForm.markAllAsTouched();
      return;
    }

    const updates = this.profileForm.value as Partial<User>;

    this.authService.updateProfile(updates)?.subscribe({
      next: updatedUser => {
        console.log('Profile updated!', updatedUser);
        // you can show a toast/snackbar here
      },
      error: err => {
        console.error('Update failed', err);
        // show error feedback
      }
    });
  }
}
