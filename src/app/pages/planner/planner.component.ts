import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { BehaviorSubject, combineLatest, map, Observable, startWith } from 'rxjs';
import { PlannerModel } from '../../models/planner.model';
import { loadPlanner } from './state/planner.actions';
import {
  selectPlanner,
  selectPlannerError,
  selectPlannerLoading,
  selectPlannerMessage,
} from './state/planner.selectors';
import { AsyncPipe, NgClass } from '@angular/common';

@Component({
  selector: 'app-planner',
  imports: [FormsModule, RouterLink, AsyncPipe, NgClass],
  templateUrl: './planner.component.html',
})
export class PlannerComponent {
  private store = inject(Store);

  customer$!: Observable<PlannerModel[]>;
  filteredCustomers$!: Observable<PlannerModel[]>;

  loading$!: Observable<boolean>;
  error$!: Observable<string | null>;
  message$!: Observable<string | null>;

  searchQuery = '';

  private searchSubject = new BehaviorSubject<string>('');

  ngOnInit(): void {
    this.store.dispatch(loadPlanner());

    this.customer$ = this.store.select(selectPlanner);

    this.loading$ = this.store.select(selectPlannerLoading);
    this.error$ = this.store.select(selectPlannerError);
    this.message$ = this.store.select(selectPlannerMessage);

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
            customer.journery_date?.toLowerCase().includes(q) ||
            customer.visit_type?.toLowerCase().includes(q) ||
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
}
