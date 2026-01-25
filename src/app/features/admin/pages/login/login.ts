import { Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="min-h-screen flex items-center justify-center bg-gray-950 px-4">
      <div class="max-w-md w-full bg-gray-900 rounded-lg shadow-xl border border-gray-800 p-8">
        <h2 class="text-3xl font-bold text-center text-white mb-6">JSL Admin</h2>

        <form (ngSubmit)="login()" class="space-y-6">
          <div>
            <label for="password" class="block text-sm font-medium text-gray-400 mb-2">Password</label>
            <input
              type="password"
              id="password"
              [(ngModel)]="password"
              name="password"
              class="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              placeholder="Enter admin password"
              required
            >
          </div>

          <div *ngIf="error" class="p-3 bg-red-900/50 border border-red-800 rounded text-red-200 text-sm">
            {{ error }}
          </div>

          <button
            type="submit"
            [disabled]="loading"
            class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center"
          >
            <span *ngIf="loading">Logging in...</span>
            <span *ngIf="!loading">Login</span>
          </button>
        </form>
      </div>
    </div>
  `
})
export class Login {
  private http = inject(HttpClient);
  private router = inject(Router);

  password = '';
  loading = false;
  error = '';

  login() {
    if (!this.password) return;

    this.loading = true;
    this.error = '';

    this.http.post<{token: string}>('/api/auth/login', { password: this.password })
      .subscribe({
        next: (res) => {
          localStorage.setItem('jsl_admin_token', res.token);
          this.router.navigate(['/admin/dashboard']);
        },
        error: (err) => {
          this.loading = false;
          this.error = err.error?.error || 'Login failed. Please check your password.';
        }
      });
  }
}
