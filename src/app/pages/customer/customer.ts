import { AsyncPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { distinctUntilChanged, filter, map, startWith, take } from 'rxjs/operators';

import { CustomerModel } from '../../models/customer.model';
import { NgToastComponent, NgToastService, TOAST_POSITIONS, ToastPosition } from 'ng-angular-popup';

import {
  selectCustomerError,
  selectCustomerLoading,
  selectCustomerMessage,
  selectCustomers,
  selectPlannerMessage,
  selectPlannerStatus,
} from './state/customer.selectors';
import { addCustomerPlanner, loadCustomers } from './state/customer.actions';

@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [FormsModule, RouterLink, AsyncPipe, NgToastComponent],
  templateUrl: './customer.html',
  styleUrl: './customer.css',
})
export class Customer implements OnInit {
  TOAST_POSITIONS = TOAST_POSITIONS;

  private store = inject(Store);

  private toast = inject(NgToastService);

  customer$!: Observable<CustomerModel[]>;
  filteredCustomers$!: Observable<CustomerModel[]>;

  loading$!: Observable<boolean>;
  error$!: Observable<string | null>;
  message$!: Observable<string | null>;
  plannerStatus$!: Observable<string>;
  plannerMessage$!: Observable<string>;

  searchQuery = '';

  private searchSubject = new BehaviorSubject<string>('');

  ngOnInit(): void {
    this.store.dispatch(loadCustomers());

    this.customer$ = this.store.select(selectCustomers);

    this.loading$ = this.store.select(selectCustomerLoading);
    this.error$ = this.store.select(selectCustomerError);
    this.message$ = this.store.select(selectCustomerMessage);

    this.plannerStatus$ = this.store.select(selectPlannerStatus);

    this.plannerMessage$ = this.store.select(selectPlannerMessage);

    this.filteredCustomers$ = combineLatest([
      this.customer$,
      this.searchSubject.pipe(startWith('')),
    ]).pipe(
      map(([customers, search]) => {
        if (!search.trim()) {
          return customers;
        }

        const q = search.toLowerCase();

        return customers.filter(
          (customer) =>
            (customer.customerName ?? '').toLowerCase().includes(q) ||
            customer.State?.toLowerCase().includes(q) ||
            customer.City?.toLowerCase().includes(q) ||
            customer.Area?.toLowerCase().includes(q) ||
            customer.Pincode?.toLowerCase().includes(q) ||
            customer.GSTNo?.toLowerCase().includes(q) ||
            customer.customerContact?.includes(q),
        );
      }),
    );
  }

  onSearch(value: string): void {
    this.searchSubject.next(value);
  }

  getInitials(name: string): string {
    return name?.substring(0, 2).toUpperCase() || 'UN';
  }

  addPlanner(id: string) {
    this.store.dispatch(
      addCustomerPlanner({
        customerId: id,
      }),
    );

    combineLatest([this.plannerStatus$, this.plannerMessage$])
      .pipe(take(1))
      .subscribe(([status, message]) => {
        if (+status === 200) {
          this.toast.success(message || 'Planner added successfully', 'Success');
        } else {
          this.toast.danger(message || 'Failed', 'Error');
        }
      });
  }
}
