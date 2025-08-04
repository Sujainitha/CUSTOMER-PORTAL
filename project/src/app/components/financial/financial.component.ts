import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SapService, FinancialData } from '../../services/sap.service';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-financial',
  standalone: true,
  imports: [CommonModule, NavbarComponent],
  template: `
    <app-navbar></app-navbar>
    
    <div class="financial-container">
      <div class="container">
        <div class="financial-header">
          <h1>Financial Sheet</h1>
          <div class="header-actions">
            <button class="btn-secondary" (click)="exportToPDF()">
              📄 Export PDF
            </button>
            <button class="btn-primary" (click)="refreshData()">
              🔄 Refresh Data
            </button>
          </div>
        </div>

        <div *ngIf="isLoading" class="loading-container">
          <div class="loading-spinner"></div>
          <p>Loading financial data...</p>
        </div>

        <div *ngIf="!isLoading && financialData" class="financial-content">
          <!-- Financial Tabs -->
          <div class="financial-tabs">
            <button 
              *ngFor="let tab of tabs" 
              [class.active]="activeTab === tab.id"
              (click)="setActiveTab(tab.id)"
              class="tab-button">
              <span class="tab-icon">{{ tab.icon }}</span>
              {{ tab.label }}
            </button>
          </div>

          <!-- Invoice Details Tab -->
          <div *ngIf="activeTab === 'invoices'" class="tab-content">
            <div class="section-header">
              <h2>🧾 Invoice Details</h2>
              <span class="record-count">{{ financialData.invoices.length }} records</span>
            </div>
            <div class="table-container">
              <table class="financial-table">
                <thead>
                  <tr>
                    <th>Invoice ID</th>
                    <th>Date</th>
                    <th>Amount</th>
                    <th>Due Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr *ngFor="let invoice of financialData.invoices">
                    <td>{{ invoice.id }}</td>
                    <td>{{ formatDate(invoice.date) }}</td>
                    <td class="amount">₹{{ formatCurrency(invoice.amount) }}</td>
                    <td>{{ formatDate(invoice.dueDate) }}</td>
                    <td>
                      <span [class]="getStatusClass(invoice.status)">
                        {{ invoice.status }}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- Payments & Aging Tab -->
          <div *ngIf="activeTab === 'payments'" class="tab-content">
            <div class="section-header">
              <h2>💰 Payments & Aging</h2>
              <span class="record-count">{{ financialData.payments.length }} records</span>
            </div>
            <div class="table-container">
              <table class="financial-table">
                <thead>
                  <tr>
                    <th>Payment ID</th>
                    <th>Billing Date</th>
                    <th>Due Date</th>
                    <th>Amount</th>
                    <th>Aging (Days)</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr *ngFor="let payment of financialData.payments">
                    <td>{{ payment.id }}</td>
                    <td>{{ formatDate(payment.billingDate) }}</td>
                    <td>{{ formatDate(payment.dueDate) }}</td>
                    <td class="amount">₹{{ formatCurrency(payment.amount) }}</td>
                    <td>
                      <span [class]="getAgingClass(payment.aging)">
                        {{ payment.aging }}
                      </span>
                    </td>
                    <td>
                      <span [class]="getStatusClass(payment.status)">
                        {{ payment.status }}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- Credit/Debit Memos Tab -->
          <div *ngIf="activeTab === 'memos'" class="tab-content">
            <div class="section-header">
              <h2>🔁 Credit/Debit Memos</h2>
              <span class="record-count">{{ financialData.creditDebitMemos.length }} records</span>
            </div>
            <div class="table-container">
              <table class="financial-table">
                <thead>
                  <tr>
                    <th>Memo ID</th>
                    <th>Type</th>
                    <th>Date</th>
                    <th>Amount</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr *ngFor="let memo of financialData.creditDebitMemos">
                    <td>{{ memo.id }}</td>
                    <td>
                      <span [class]="getMemoTypeClass(memo.type)">
                        {{ memo.type }}
                      </span>
                    </td>
                    <td>{{ formatDate(memo.date) }}</td>
                    <td class="amount">₹{{ formatCurrency(memo.amount) }}</td>
                    <td>{{ memo.description }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- Sales Summary Tab -->
          <div *ngIf="activeTab === 'summary'" class="tab-content">
            <div class="section-header">
              <h2>📈 Sales Summary</h2>
            </div>
            <div class="summary-grid grid grid-2">
              <div class="summary-card card">
                <h3>Total Sales</h3>
                <div class="summary-value">₹{{ formatCurrency(financialData.salesSummary.totalSales) }}</div>
                <div class="summary-growth positive">
                  ↗️ +{{ financialData.salesSummary.monthlyGrowth }}% this month
                </div>
              </div>
              <div class="summary-card card">
                <h3>Top Products</h3>
                <div class="product-list">
                  <div *ngFor="let product of financialData.salesSummary.topProducts" class="product-item">
                    <span class="product-name">{{ product.name }}</span>
                    <span class="product-sales">₹{{ formatCurrency(product.sales) }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .financial-container {
      min-height: calc(100vh - 80px);
      padding: 32px 0;
    }

    .financial-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 32px;
      flex-wrap: wrap;
      gap: 16px;
    }

    .financial-header h1 {
      font-size: 32px;
      font-weight: 600;
      color: var(--text-primary);
    }

    .header-actions {
      display: flex;
      gap: 12px;
    }

    .loading-container {
      text-align: center;
      padding: 60px 0;
    }

    .loading-container p {
      margin-top: 16px;
      color: var(--text-secondary);
    }

    .financial-tabs {
      display: flex;
      gap: 4px;
      margin-bottom: 32px;
      background: var(--card-bg);
      padding: 4px;
      border-radius: 12px;
      border: 1px solid var(--border-color);
      overflow-x: auto;
    }

    .tab-button {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 12px 20px;
      background: transparent;
      border: none;
      border-radius: 8px;
      color: var(--text-secondary);
      font-weight: 500;
      cursor: pointer;
      transition: all 0.3s ease;
      white-space: nowrap;
      font-family: 'Poppins', sans-serif;
    }

    .tab-button:hover {
      background: rgba(255, 255, 255, 0.05);
      color: var(--text-primary);
    }

    .tab-button.active {
      background: var(--accent-yellow);
      color: #000;
    }

    .tab-icon {
      font-size: 16px;
    }

    .tab-content {
      background: var(--card-bg);
      border-radius: 12px;
      padding: 24px;
      border: 1px solid var(--border-color);
    }

    .section-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 24px;
      flex-wrap: wrap;
    }

    .section-header h2 {
      font-size: 20px;
      font-weight: 600;
      color: var(--text-primary);
    }

    .record-count {
      background: var(--accent-red);
      color: var(--text-primary);
      padding: 4px 12px;
      border-radius: 20px;
      font-size: 12px;
      font-weight: 500;
    }

    .table-container {
      overflow-x: auto;
    }

    .financial-table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 16px;
    }

    .financial-table th,
    .financial-table td {
      padding: 16px 12px;
      text-align: left;
      border-bottom: 1px solid var(--border-color);
    }

    .financial-table th {
      background: rgba(255, 255, 255, 0.02);
      color: var(--text-secondary);
      font-weight: 600;
      font-size: 14px;
    }

    .financial-table td {
      color: var(--text-primary);
    }

    .amount {
      font-weight: 600;
      color: var(--accent-yellow);
    }

    .status-paid {
      background: rgba(34, 197, 94, 0.1);
      color: #86EFAC;
      padding: 4px 8px;
      border-radius: 12px;
      font-size: 12px;
      font-weight: 500;
    }

    .status-pending {
      background: rgba(249, 158, 11, 0.1);
      color: #FCD34D;
      padding: 4px 8px;
      border-radius: 12px;
      font-size: 12px;
      font-weight: 500;
    }

    .status-overdue {
      background: rgba(239, 68, 68, 0.1);
      color: #FCA5A5;
      padding: 4px 8px;
      border-radius: 12px;
      font-size: 12px;
      font-weight: 500;
    }

    .aging-normal {
      color: #86EFAC;
      font-weight: 600;
    }

    .aging-warning {
      color: #FCD34D;
      font-weight: 600;
    }

    .aging-danger {
      color: #FCA5A5;
      font-weight: 600;
    }

    .memo-credit {
      background: rgba(34, 197, 94, 0.1);
      color: #86EFAC;
      padding: 4px 8px;
      border-radius: 12px;
      font-size: 12px;
      font-weight: 500;
    }

    .memo-debit {
      background: rgba(239, 68, 68, 0.1);
      color: #FCA5A5;
      padding: 4px 8px;
      border-radius: 12px;
      font-size: 12px;
      font-weight: 500;
    }

    .summary-grid {
      margin-top: 16px;
    }

    .summary-card h3 {
      font-size: 16px;
      font-weight: 600;
      color: var(--text-secondary);
      margin-bottom: 16px;
    }

    .summary-value {
      font-size: 32px;
      font-weight: 700;
      color: var(--accent-yellow);
      margin-bottom: 8px;
    }

    .summary-growth {
      font-size: 14px;
      font-weight: 500;
    }

    .summary-growth.positive {
      color: #86EFAC;
    }

    .product-list {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .product-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px 0;
      border-bottom: 1px solid var(--border-color);
    }

    .product-item:last-child {
      border-bottom: none;
    }

    .product-name {
      color: var(--text-primary);
      font-weight: 500;
    }

    .product-sales {
      color: var(--accent-yellow);
      font-weight: 600;
    }

    @media (max-width: 768px) {
      .financial-header {
        flex-direction: column;
        align-items: stretch;
      }
      
      .header-actions {
        justify-content: center;
      }
      
      .financial-tabs {
        overflow-x: scroll;
      }
      
      .tab-content {
        padding: 16px;
      }
      
      .section-header {
        flex-direction: column;
        align-items: stretch;
        gap: 12px;
      }
      
      .financial-table th,
      .financial-table td {
        padding: 12px 8px;
        font-size: 14px;
      }
      
      .summary-value {
        font-size: 24px;
      }
    }
  `]
})
export class FinancialComponent implements OnInit {
  financialData: FinancialData | null = null;
  isLoading = true;
  activeTab = 'invoices';

  tabs = [
    { id: 'invoices', label: 'Invoice Details', icon: '🧾' },
    { id: 'payments', label: 'Payments & Aging', icon: '💰' },
    { id: 'memos', label: 'Credit/Debit Memos', icon: '🔁' },
    { id: 'summary', label: 'Sales Summary', icon: '📈' }
  ];

  constructor(private sapService: SapService) {}

  ngOnInit(): void {
    this.loadFinancialData();
  }

  loadFinancialData(): void {
    this.isLoading = true;
    this.sapService.getFinancialData().subscribe({
      next: (data) => {
        this.financialData = data;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
        // Handle error appropriately
      }
    });
  }

  setActiveTab(tabId: string): void {
    this.activeTab = tabId;
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('en-IN');
  }

  formatCurrency(amount: number): string {
    return amount.toLocaleString('en-IN');
  }

  getStatusClass(status: string): string {
    switch (status.toLowerCase()) {
      case 'paid': return 'status-paid';
      case 'pending': return 'status-pending';
      case 'overdue': return 'status-overdue';
      default: return 'status-pending';
    }
  }

  getAgingClass(aging: number): string {
    if (aging === 0) return 'aging-normal';
    if (aging <= 15) return 'aging-warning';
    return 'aging-danger';
  }

  getMemoTypeClass(type: string): string {
    return type.toLowerCase() === 'credit' ? 'memo-credit' : 'memo-debit';
  }

  refreshData(): void {
    this.loadFinancialData();
  }

  exportToPDF(): void {
    // Implement PDF export functionality
    console.log('Exporting to PDF...');
    alert('PDF export functionality would be implemented here');
  }
}