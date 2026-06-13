import { AsyncPipe, DatePipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { NgToastComponent, NgToastService, TOAST_POSITIONS } from 'ng-angular-popup';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { addCustomerPlanner, loadCustomers } from '../customer/state/customer.actions';
import {
  selectCustomerError,
  selectCustomerLoading,
  selectCustomerMessage,
  selectCustomers,
} from '../customer/state/customer.selectors';
import { ActivityModel } from '../../models/activity.model';
import { loadActivity } from './state/activity.actions';
import {
  selectAllActivity,
  selectFailedActivity,
  selectLoadingActivity,
} from './state/activity.selectors';

@Component({
  selector: 'app-allactivity',
  imports: [FormsModule, RouterLink, AsyncPipe, NgToastComponent, DatePipe],
  templateUrl: './allactivity.html',
  styleUrl: './allactivity.css',
})
export class Allactivity {
  TOAST_POSITIONS = TOAST_POSITIONS;

  private store = inject(Store);

  private toast = inject(NgToastService);

  customer$!: Observable<ActivityModel[]>;
  filteredCustomers$!: Observable<ActivityModel[]>;

  loading$!: Observable<boolean>;
  error$!: Observable<string | null>;

  searchQuery = '';

  private searchSubject = new BehaviorSubject<string>('');

  ngOnInit(): void {
    this.store.dispatch(loadActivity());

    this.customer$ = this.store.select(selectAllActivity);
    this.loading$ = this.store.select(selectLoadingActivity);
    this.error$ = this.store.select(selectFailedActivity);

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
            customer.purpose?.toLowerCase().includes(q),
        );
      }),
    );
  }

  onSearch(value: string): void {
    this.searchSubject.next(value);
  }
}
