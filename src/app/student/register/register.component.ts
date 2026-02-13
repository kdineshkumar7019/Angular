import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from './registerservice.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  registerData = {
    username: '',
    email: '',
    password: ''
  };

  confirmPassword = '';
  alertMessage = '';
  alertType: 'success' | 'error' | '' = '';
  isLoading = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  register() {
    this.alertMessage = '';
    this.isLoading = true;

    if (this.registerData.password !== this.confirmPassword) {
      this.alertType = 'error';
      this.alertMessage = 'Passwords do not match';
      this.isLoading = false;
      return;
    }

    this.authService.register(this.registerData).subscribe({
      next: (res: any) => {
        this.alertType = 'success';
        this.alertMessage = res || 'Registration successful';

        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 1000);
      },
      error: (err) => {
        this.alertType = 'error';
        this.alertMessage =
          err?.error?.message || 'Registration failed';
        this.isLoading = false;
      }
    });
  }
}
