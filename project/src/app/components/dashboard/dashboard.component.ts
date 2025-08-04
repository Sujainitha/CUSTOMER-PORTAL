import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SapService, DashboardTile } from '../../services/sap.service';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, NavbarComponent],
  template: `
    <app-navbar></app-navbar>
    
    <div class="dashboard-container">
      <div class="container">
        <div class="dashboard-header">
          <h1>Customer Dashboard</h1>
          <p>Overview of your business activities</p>
        </div>

        <div *ngIf="isLoading" class="loading-container">
          <div class="loading-spinner"></div>
          <p>Loading dashboard data...</p>
        </div>

        <div *ngIf="!isLoading" class="dashboard-tiles grid grid-3">
          <div *ngFor="let tile of tiles" class="tile-card" (click)="onTileClick(tile)">
            <div class="tile-header">
              <span class="tile-icon">{{ tile.icon }}</span>
              <div class="tile-status" [style.background-color]="tile.color"></div>
            </div>
            <div class="tile-content">
              <h3>{{ tile.title }}</h3>
              <div class="tile-count">{{ tile.count }}</div>
              <p class="tile-subtitle">Active Records</p>
            </div>
            <div class="tile-footer">
              <span class="view-more">View Details →</span>
            </div>
          </div>
        </div>

        <div *ngIf="!isLoading" class="dashboard-summary">
          <div class="summary-card card">
            <h3>Quick Summary</h3>
            <div class="summary-stats">
              <div class="stat">
                <span class="stat-label">Total Inquiries</span>
                <span class="stat-value">{{ getTotalInquiries() }}</span>
              </div>
              <div class="stat">
                <span class="stat-label">Pending Orders</span>
                <span class="stat-value">{{ getPendingOrders() }}</span>
              </div>
              <div class="stat">
                <span class="stat-label">Active Deliveries</span>
                <span class="stat-value">{{ getActiveDeliveries() }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .dashboard-container {
      min-height: calc(100vh - 80px);
      padding: 32px 0;
    }

    .dashboard-header {
      text-align: center;
      margin-bottom: 48px;
    }

    .dashboard-header h1 {
      font-size: 32px;
      font-weight: 600;
      margin-bottom: 8px;
      color: var(--text-primary);
    }

    .dashboard-header p {
      color: var(--text-secondary);
      font-size: 16px;
    }

    .loading-container {
      text-align: center;
      padding: 60px 0;
    }

    .loading-container p {
      margin-top: 16px;
      color: var(--text-secondary);
    }

    .dashboard-tiles {
      margin-bottom: 48px;
    }

    .tile-card {
      background: var(--card-bg);
      border-radius: 16px;
      padding: 24px;
      border: 1px solid var(--border-color);
      transition: all 0.3s ease;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }

    .tile-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 4px;
      background: linear-gradient(90deg, var(--accent-yellow), var(--accent-red));
    }

    .tile-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 12px 24px rgba(0, 0, 0, 0.4);
    }

    .tile-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
    }

    .tile-icon {
      font-size: 32px;
      line-height: 1;
    }

    .tile-status {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      box-shadow: 0 0 8px rgba(255, 255, 255, 0.3);
    }

    .tile-content h3 {
      font-size: 18px;
      font-weight: 600;
      margin-bottom: 12px;
      color: var(--text-primary);
    }

    .tile-count {
      font-size: 36px;
      font-weight: 700;
      color: var(--accent-yellow);
      margin-bottom: 4px;
    }

    .tile-subtitle {
      color: var(--text-secondary);
      font-size: 14px;
    }

    .tile-footer {
      margin-top: 20px;
      padding-top: 16px;
      border-top: 1px solid var(--border-color);
    }

    .view-more {
      color: var(--accent-yellow);
      font-weight: 500;
      font-size: 14px;
    }

    .dashboard-summary {
      margin-top: 32px;
    }

    .summary-card h3 {
      font-size: 20px;
      font-weight: 600;
      margin-bottom: 24px;
      color: var(--text-primary);
    }

    .summary-stats {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 24px;
    }

    .stat {
      text-align: center;
      padding: 20px;
      background: rgba(255, 255, 255, 0.02);
      border-radius: 12px;
      border: 1px solid var(--border-color);
    }

    .stat-label {
      display: block;
      color: var(--text-secondary);
      font-size: 14px;
      margin-bottom: 8px;
    }

    .stat-value {
      display: block;
      font-size: 24px;
      font-weight: 700;
      color: var(--accent-yellow);
    }

    @media (max-width: 768px) {
      .dashboard-header h1 {
        font-size: 24px;
      }
      
      .tile-count {
        font-size: 28px;
      }
      
      .summary-stats {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class DashboardComponent implements OnInit {
  tiles: DashboardTile[] = [];
  isLoading = true;

  constructor(private sapService: SapService) {}

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    this.sapService.getDashboardData().subscribe({
      next: (data) => {
        this.tiles = data;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
        // Handle error appropriately
      }
    });
  }

  onTileClick(tile: DashboardTile): void {
    console.log('Tile clicked:', tile.title);
    // Implement navigation or modal logic here
  }

  getTotalInquiries(): number {
    return this.tiles.find(t => t.title === 'Inquiry Data')?.count || 0;
  }

  getPendingOrders(): number {
    return this.tiles.find(t => t.title === 'Sales Order Data')?.count || 0;
  }

  getActiveDeliveries(): number {
    return this.tiles.find(t => t.title === 'Delivery List')?.count || 0;
  }
}