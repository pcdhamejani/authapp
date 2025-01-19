import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-signup',
  imports: [FormsModule, CommonModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  user = { name: '', email: '', password: '' };
  message: string | null = null;
  isSuccess: boolean = false;

  constructor(private http: HttpClient) { }

  register() {
  this.http.post<{ message: string }>('http://localhost:3000/register', this.user).subscribe({
    next: (response) => {
      this.message = response.message; // Assign the backend's message to this.message
      this.isSuccess = true;
      this.clearForm();
    },
    error: (error) => {
      this.message = error.error.message || 'Error during registration.'; // Handle error message from backend
      this.isSuccess = false;
    },
  });
}

  clearForm() {
    this.user = { name: '', email: '', password: '' };
  }
}
