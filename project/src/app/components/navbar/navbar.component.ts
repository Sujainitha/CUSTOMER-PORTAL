import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <nav class="navbar">
      <div class="container">
        <div class="navbar-brand">
          <img src="https://images.pexels.com/photos/590016/pexels-photo-590016.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&fit=crop" 
               alt="KAAR Logo" class="logo">
          <span class="brand-text">KAAR Technologies</span>
        </div>
        
        <ul class="navbar-nav">
          <li class="nav-item">
            <a routerLink="/dashboard" routerLinkActive="active" class="nav-link">
              <span class="nav-icon">🏠</span>
              Dashboard
            </a>
          </li>
          <li class="nav-item">
            <a routerLink="/profile" routerLinkActive="active" class="nav-link">
              <span class="nav-icon">👤</span>
              Profile
            </a>
          </li>
          <li class="nav-item">
            <a routerLink="/financial" routerLinkActive="active" class="nav-link">
              <span class="nav-icon">💰</span>
              Financial Sheet
            </a>
          </li>
          <li class="nav-item">
            <button (click)="logout()" class="nav-link logout-btn">
              <span class="nav-icon">🚪</span>
              Logout
            </button>
          </li>
        </ul>
      </div>
    </nav>
  `,
  styles: [`
    .navbar {
      background: var(--card-bg);
      border-bottom: 1px solid var(--border-color);
      padding: 16px 0;
      position: sticky;
      top: 0;
      z-index: 100;
    }

    .navbar .container {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .navbar-brand {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .logo {
      width: 40px;
      height: 40px;
      border-radius: 8px;
    }

    .brand-text {
      font-weight: 600;
      font-size: 18px;
      color: var(--accent-yellow);
    }

    .navbar-nav {
      display: flex;
      list-style: none;
      gap: 32px;
      align-items: center;
    }

    .nav-link {
      display: flex;
      align-items: center;
      gap: 8px;
      color: var(--text-secondary);
      text-decoration: none;
      font-weight: 500;
      padding: 8px 16px;
      border-radius: 8px;
      transition: all 0.3s ease;
      border: none;
      background: none;
      cursor: pointer;
      font-family: 'Poppins', sans-serif;
    }

    .nav-link:hover {
      color: var(--text-primary);
      background: rgba(255, 255, 255, 0.05);
    }

    .nav-link.active {
      color: var(--accent-yellow);
      background: rgba(250, 204, 21, 0.1);
    }

    .logout-btn {
      background: var(--accent-red);
      color: var(--text-primary);
    }

    .logout-btn:hover {
      background: var(--accent-red-light);
    }

    .nav-icon {
      font-size: 16px;
    }

    @media (max-width: 768px) {
      .navbar-nav {
        gap: 16px;
      }
      
      .nav-link {
        padding: 6px 12px;
        font-size: 14px;
      }
      
      .brand-text {
        display: none;
      }
    }
  `]
})
export class NavbarComponent {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}