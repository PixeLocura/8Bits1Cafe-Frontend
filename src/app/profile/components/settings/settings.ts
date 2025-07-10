import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../auth/services/auth.service';
import { User } from '../../../auth/interfaces/auth.interfaces';
import { take } from 'rxjs/operators';
import { NgIf } from '@angular/common';

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
  user: User | null = null; // 👈 Ahora la propiedad user sí existe

  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ) {
    this.profileForm = this.fb.group({
      name: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
      profilePictureUrl: ['']
    });
  }

  ngOnInit() {
    this.authService.currentUser$
      .pipe(take(1))
      .subscribe((user: User | null) => {
        if (user) {
          this.user = user;
          this.profileForm.patchValue({
            name: user.name,
            lastname: user.lastname,
            email: user.email,
            username: user.username,
            profilePictureUrl: user.profilePictureUrl
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
      next: (updatedUser: User) => {
        console.log('Profile updated!', updatedUser);
      },
      error: (err: any) => {
        console.error('Update failed', err);
      }
    });
  }

  onUpdatePicture() {
    const newUrl = this.profileForm.value.profilePictureUrl;
    if (!newUrl) return;

    this.authService.updateProfilePicture(newUrl)?.subscribe({
      next: () => {
        console.log('Profile picture updated!');
        if (this.user) {
          this.user.profilePictureUrl = newUrl; // 👈 Actualiza local para forzar <img> nuevo
        }
      },
      error: (err: any) => {
        console.error('Failed to update picture', err);
      }
    });
  }
}
