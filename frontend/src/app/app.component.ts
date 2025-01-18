import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, HttpClientModule, CommonModule],
  template: `
    <div class="container">
      <h1>Register</h1>
      <form (ngSubmit)="register()">
        <div class="form-group">
          <label for="name">Name:</label>
          <input id="name" [(ngModel)]="user.name" name="name" required>
        </div>

        <div class="form-group">
          <label for="email">Email:</label>
          <input id="email" [(ngModel)]="user.email" name="email" required type="email">
        </div>

        <div class="form-group">
          <label for="password">Password:</label>
          <input id="password" [(ngModel)]="user.password" name="password" required type="password">
        </div>

        <button type="submit" [disabled]="!user.name || !user.email || !user.password">
          Register
        </button>
      </form>
      <p *ngIf="message" class="message">{{ message }}</p>
    </div>
  `,
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  user = { name: '', email: '', password: '' };
  message: string | null = null;

  constructor(private http: HttpClient) {}

  register() {
    this.http.post('http://localhost:3000/register', this.user).subscribe({
      next: () => {
        this.message = 'Registration successful!';
        this.clearForm();
      },
      error: () => this.message = 'Error during registration.',
    });
  }

  clearForm() {
    this.user = { name: '', email: '', password: '' };
  }
}
