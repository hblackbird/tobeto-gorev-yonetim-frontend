import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AuthService } from '../../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;
  authService = inject(AuthService)
  routerService = inject(Router);
  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
  onSubmit(): void {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value)
        .subscribe(response => {
          this.routerService.navigate(['/']);
          this.loginForm.reset();  // Formu temizle
        }, error => {
          console.error('Login failed', error);
        });
    } else {
      console.log('Form is invalid');
    }
  }

  
}
