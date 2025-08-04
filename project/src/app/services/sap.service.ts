import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

export interface DashboardTile {
  title: string;
  icon: string;
  count: number;
  status: 'success' | 'warning' | 'danger';
  color: string;
}

export interface FinancialData {
  invoices: Invoice[];
  payments: Payment[];
  creditDebitMemos: CreditDebitMemo[];
  salesSummary: SalesSummary;
}

export interface Invoice {
  id: string;
  date: string;
  amount: number;
  status: string;
  dueDate: string;
}

export interface Payment {
  id: string;
  billingDate: string;
  dueDate: string;
  amount: number;
  status: string;
  aging: number;
}

export interface CreditDebitMemo {
  id: string;
  type: 'Credit' | 'Debit';
  date: string;
  amount: number;
  description: string;
}

export interface SalesSummary {
  totalSales: number;
  monthlyGrowth: number;
  topProducts: Array<{ name: string; sales: number }>;
}

@Injectable({
  providedIn: 'root'
})
export class SapService {

  getDashboardData(): Observable<DashboardTile[]> {
    const mockData: DashboardTile[] = [
      {
        title: 'Inquiry Data',
        icon: '📋',
        count: 25,
        status: 'success',
        color: '#22C55E'
      },
      {
        title: 'Sales Order Data',
        icon: '🛒',
        count: 18,
        status: 'warning',
        color: '#F59E0B'
      },
      {
        title: 'Delivery List',
        icon: '🚚',
        count: 12,
        status: 'danger',
        color: '#EF4444'
      }
    ];

    return of(mockData).pipe(delay(800));
  }

  getFinancialData(): Observable<FinancialData> {
    const mockData: FinancialData = {
      invoices: [
        { id: 'INV-001', date: '2024-01-15', amount: 50000, status: 'Paid', dueDate: '2024-02-15' },
        { id: 'INV-002', date: '2024-01-20', amount: 75000, status: 'Pending', dueDate: '2024-02-20' },
        { id: 'INV-003', date: '2024-01-25', amount: 30000, status: 'Overdue', dueDate: '2024-02-25' }
      ],
      payments: [
        { id: 'PAY-001', billingDate: '2024-01-15', dueDate: '2024-02-15', amount: 50000, status: 'Paid', aging: 0 },
        { id: 'PAY-002', billingDate: '2024-01-20', dueDate: '2024-02-20', amount: 75000, status: 'Pending', aging: 15 },
        { id: 'PAY-003', billingDate: '2024-01-25', dueDate: '2024-02-25', amount: 30000, status: 'Overdue', aging: 30 }
      ],
      creditDebitMemos: [
        { id: 'CDM-001', type: 'Credit', date: '2024-01-10', amount: 5000, description: 'Return adjustment' },
        { id: 'CDM-002', type: 'Debit', date: '2024-01-12', amount: 2000, description: 'Late payment fee' }
      ],
      salesSummary: {
        totalSales: 155000,
        monthlyGrowth: 12.5,
        topProducts: [
          { name: 'Product A', sales: 85000 },
          { name: 'Product B', sales: 45000 },
          { name: 'Product C', sales: 25000 }
        ]
      }
    };

    return of(mockData).pipe(delay(1000));
  }
}