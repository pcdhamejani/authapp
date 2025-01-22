import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  user = { email: '', password: '' };
  message: string | null = null;
  isSuccess: boolean = false;

  constructor(private authService: AuthService,
              private router: Router
  ) {}

  login() {
    this.authService.login(this.user).subscribe({
      next: (response) => {
        // Only set success message after successful login
        sessionStorage.setItem('token', response.token);
        this.authService.currentUser.next(response.user);
        this.message = 'Login successful!';
        this.isSuccess = true;
        this.clearForm();
        this.router.navigate(['/']);
      },
      error: (error) => {
        this.message = error.error.message || 'Error during login.'; // Handle error message from backend
        this.isSuccess = false;
        console.error('Login failed:', error);
      }
    });
  }

  clearForm() {
    this.user = { email: '', password: '' };
  }
}