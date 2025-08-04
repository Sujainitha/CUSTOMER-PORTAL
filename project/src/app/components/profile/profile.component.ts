import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService, Customer } from '../../services/auth.service';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, NavbarComponent],
  template: `
    <app-navbar></app-navbar>
    
    <div class="profile-container">
      <div class="container">
        <div class="profile-header">
          <h1>Customer Profile</h1>
          <p>Your account information and details</p>
        </div>

        <div *ngIf="customer" class="profile-content">
          <div class="profile-card card">
            <div class="profile-avatar">
              <img src="https://images.pexels.com/photos/590016/pexels-photo-590016.jpeg?auto=compress&cs=tinysrgb&w=120&h=120&fit=crop" 
                   alt="Customer Avatar" class="avatar">
              <div class="avatar-info">
                <h2>{{ customer.name }}</h2>
                <span class="customer-id">Customer ID: {{ customer.id }}</span>
              </div>
            </div>
          </div>

          <div class="profile-details grid grid-2">
            <div class="detail-card card">
              <div class="detail-header">
                <span class="detail-icon">📧</span>
                <h3>Contact Information</h3>
              </div>
              <div class="detail-content">
                <div class="detail-item">
                  <label>Email Address</label>
                  <span>{{ customer.email }}</span>
                </div>
                <div class="detail-item">
                  <label>Phone Number</label>
                  <span>{{ customer.phone }}</span>
                </div>
              </div>
            </div>

            <div class="detail-card card">
              <div class="detail-header">
                <span class="detail-icon">📍</span>
                <h3>Address Details</h3>
              </div>
              <div class="detail-content">
                <div class="detail-item">
                  <label>Business Address</label>
                  <span>{{ customer.address }}</span>
                </div>
              </div>
            </div>

            <div class="detail-card card">
              <div class="detail-header">
                <span class="detail-icon">🏢</span>
                <h3>Business Information</h3>
              </div>
              <div class="detail-content">
                <div class="detail-item">
                  <label>GST Number</label>
                  <span>{{ customer.gstNumber }}</span>
                </div>
                <div class="detail-item">
                  <label>Account Status</label>
                  <span class="status-active">Active</span>
                </div>
              </div>
            </div>

            <div class="detail-card card">
              <div class="detail-header">
                <span class="detail-icon">⚙️</span>
                <h3>Account Settings</h3>
              </div>
              <div class="detail-content">
                <div class="detail-item">
                  <label>Last Login</label>
                  <span>{{ getLastLoginDate() }}</span>
                </div>
                <div class="detail-item">
                  <label>Account Type</label>
                  <span>Premium Customer</span>
                </div>
              </div>
            </div>
          </div>

          <div class="profile-actions">
            <button class="btn-secondary">
              📝 Update Profile
            </button>
            <button class="btn-primary">
              🔒 Change Password
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .profile-container {
      min-height: calc(100vh - 80px);
      padding: 32px 0;
    }

    .profile-header {
      text-align: center;
      margin-bottom: 48px;
    }

    .profile-header h1 {
      font-size: 32px;
      font-weight: 600;
      margin-bottom: 8px;
      color: var(--text-primary);
    }

    .profile-header p {
      color: var(--text-secondary);
      font-size: 16px;
    }

    .profile-card {
      margin-bottom: 32px;
    }

    .profile-avatar {
      display: flex;
      align-items: center;
      gap: 24px;
    }

    .avatar {
      width: 120px;
      height: 120px;
      border-radius: 16px;
      border: 3px solid var(--accent-yellow);
    }

    .avatar-info h2 {
      font-size: 24px;
      font-weight: 600;
      color: var(--text-primary);
      margin-bottom: 8px;
    }

    .customer-id {
      background: var(--accent-red);
      color: var(--text-primary);
      padding: 6px 12px;
      border-radius: 20px;
      font-size: 14px;
      font-weight: 500;
    }

    .profile-details {
      margin-bottom: 32px;
    }

    .detail-card {
      height: fit-content;
    }

    .detail-header {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 20px;
      padding-bottom: 12px;
      border-bottom: 1px solid var(--border-color);
    }

    .detail-icon {
      font-size: 20px;
    }

    .detail-header h3 {
      font-size: 18px;
      font-weight: 600;
      color: var(--text-primary);
    }

    .detail-content {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .detail-item {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .detail-item label {
      font-size: 14px;
      font-weight: 500;
      color: var(--text-secondary);
    }

    .detail-item span {
      color: var(--text-primary);
      font-weight: 400;
    }

    .status-active {
      color: #22C55E !important;
      font-weight: 600 !important;
    }

    .profile-actions {
      display: flex;
      gap: 16px;
      justify-content: center;
      flex-wrap: wrap;
    }

    .profile-actions button {
      display: flex;
      align-items: center;
      gap: 8px;
      min-width: 180px;
      justify-content: center;
    }

    @media (max-width: 768px) {
      .profile-avatar {
        flex-direction: column;
        text-align: center;
        gap: 16px;
      }
      
      .avatar {
        width: 100px;
        height: 100px;
      }
      
      .profile-actions {
        flex-direction: column;
        align-items: center;
      }
      
      .profile-actions button {
        width: 100%;
        max-width: 300px;
      }
    }
  `]
})
export class ProfileComponent implements OnInit {
  customer: Customer | null = null;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.customer = this.authService.getCurrentCustomer();
  }

  getLastLoginDate(): string {
    return new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
}