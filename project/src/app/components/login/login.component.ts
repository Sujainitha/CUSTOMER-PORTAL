import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="login-container">
      <div class="login-card">
        <div class="login-header">
          <img src="https://images.pexels.com/photos/590016/pexels-photo-590016.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&fit=crop" 
               alt="KAAR Logo" class="login-logo">
          <h1>Customer Portal</h1>
          <p>KAAR Technologies SAP ERP System</p>
        </div>

        <form (ngSubmit)="onLogin()" class="login-form">
          <div *ngIf="errorMessage" class="error-message">
            {{ errorMessage }}
          </div>

          <div class="form-group">
            <label for="customerId">Customer ID</label>
            <input 
              type="text" 
              id="customerId" 
              [(ngModel)]="customerId" 
              name="customerId"
              class="form-control" 
              placeholder="Enter your Customer ID"
              required>
          </div>

          <div class="form-group">
            <label for="password">Password</label>
            <input 
              type="password" 
              id="password" 
              [(ngModel)]="password" 
              name="password"
              class="form-control" 
              placeholder="Enter your password"
              required>
          </div>

          <button 
            type="submit" 
            class="btn-primary login-btn" 
            [disabled]="isLoading">
            <div *ngIf="isLoading" class="loading-spinner"></div>
            <span *ngIf="!isLoading">Login</span>
            <span *ngIf="isLoading">Authenticating...</span>
          </button>
        </form>

        <div class="login-footer">
          <p class="demo-credentials">
            <strong>Demo Credentials:</strong><br>
            Customer ID: KAAR001<br>
            Password: password123
          </p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .login-container {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, var(--primary-bg) 0%, #1A1A1A 100%);
      padding: 20px;
    }

    .login-card {
      background: var(--card-bg);
      border-radius: 16px;
      padding: 40px;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
      border: 1px solid var(--border-color);
      width: 100%;
      max-width: 400px;
    }

    .login-header {
      text-align: center;
      margin-bottom: 32px;
    }

    .login-logo {
      width: 80px;
      height: 80px;
      border-radius: 12px;
      margin-bottom: 16px;
    }

    .login-header h1 {
      font-size: 28px;
      font-weight: 600;
      color: var(--text-primary);
      margin-bottom: 8px;
    }

    .login-header p {
      color: var(--text-secondary);
      font-size: 14px;
    }

    .login-form {
      margin-bottom: 24px;
    }

    .login-btn {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      font-size: 16px;
      padding: 16px;
    }

    .login-btn:disabled {
      opacity: 0.7;
      cursor: not-allowed;
    }

    .login-footer {
      text-align: center;
      padding-top: 24px;
      border-top: 1px solid var(--border-color);
    }

    .demo-credentials {
      background: rgba(250, 204, 21, 0.1);
      padding: 16px;
      border-radius: 8px;
      font-size: 12px;
      color: var(--text-secondary);
      border-left: 4px solid var(--accent-yellow);
    }

    .demo-credentials strong {
      color: var(--accent-yellow);
    }
  `]
})
export class LoginComponent {
  customerId = '';
  password = '';
  isLoading = false;
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onLogin(): void {
    if (!this.customerId || !this.password) {
      this.errorMessage = 'Please enter both Customer ID and Password';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    this.authService.login(this.customerId, this.password).subscribe({
      next: (success) => {
        this.isLoading = false;
        if (success) {
          this.router.navigate(['/dashboard']);
        } else {
          this.errorMessage = 'Invalid Customer ID or Password. Please try again.';
        }
      },
      error: () => {
        this.isLoading = false;
        this.errorMessage = 'Connection error. Please try again later.';
      }
    });
  }
}