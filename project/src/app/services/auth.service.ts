import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  gstNumber: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  private currentCustomerSubject = new BehaviorSubject<Customer | null>(null);

  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();
  public currentCustomer$ = this.currentCustomerSubject.asObservable();

  constructor() {
    // Check if user is already logged in
    const savedCustomer = localStorage.getItem('currentCustomer');
    if (savedCustomer) {
      this.currentCustomerSubject.next(JSON.parse(savedCustomer));
      this.isAuthenticatedSubject.next(true);
    }
  }

  login(customerId: string, password: string): Observable<boolean> {
    // Simulate SAP RFC Webservice call
    return of(true).pipe(
      delay(1500), // Simulate network delay
      map(() => {
        if (customerId === 'KAAR001' && password === 'password123') {
          const customer: Customer = {
            id: customerId,
            name: 'KAAR Technologies Pvt Ltd',
            email: 'contact@kaartechnologies.com',
            phone: '+91 9876543210',
            address: '123 Tech Park, Bangalore, Karnataka 560001',
            gstNumber: '29ABCDE1234F1Z5'
          };
          
          localStorage.setItem('currentCustomer', JSON.stringify(customer));
          this.currentCustomerSubject.next(customer);
          this.isAuthenticatedSubject.next(true);
          return true;
        }
        return false;
      })
    );
  }

  logout(): void {
    localStorage.removeItem('currentCustomer');
    this.currentCustomerSubject.next(null);
    this.isAuthenticatedSubject.next(false);
  }

  getCurrentCustomer(): Customer | null {
    return this.currentCustomerSubject.value;
  }
}