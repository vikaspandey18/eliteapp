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
import { AsyncPipe, NgClass, DatePipe, CommonModule } from '@angular/common';

@Component({
  selector: 'app-planner',
  imports: [FormsModule, RouterLink, AsyncPipe, NgClass, DatePipe, CommonModule],
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
  activeTab: 'previous' | 'today' | 'upcoming' = 'today';

  private searchSubject = new BehaviorSubject<string>('');
  private activeTabSubject = new BehaviorSubject<'previous' | 'today' | 'upcoming'>('today');

  ngOnInit(): void {
    this.store.dispatch(loadPlanner());

    this.customer$ = this.store.select(selectPlanner);

    this.loading$ = this.store.select(selectPlannerLoading);
    this.error$ = this.store.select(selectPlannerError);
    this.message$ = this.store.select(selectPlannerMessage);

    this.filteredCustomers$ = combineLatest([
      this.customer$,
      this.searchSubject.pipe(startWith('')),
      this.activeTabSubject,
    ]).pipe(
      map(([customers, search, tab]) => {
        let filtered = customers.filter((customer) => {
          return this.getTabForRecord(customer) === tab;
        });

        if (!search.trim()) {
          return filtered;
        }

        const q = search.toLowerCase();

        return filtered.filter(
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

  selectTab(tab: 'previous' | 'today' | 'upcoming'): void {
    this.activeTab = tab;
    this.activeTabSubject.next(tab);
  }

  private parseLocalDate(dateStr: string): Date | null {
    if (!dateStr) return null;
    const cleanStr = dateStr.split(' ')[0];
    const parts = cleanStr.split('-');
    if (parts.length !== 3) {
      const parsed = new Date(dateStr);
      return isNaN(parsed.getTime()) ? null : parsed;
    }
    const y = parseInt(parts[0], 10);
    const m = parseInt(parts[1], 10) - 1;
    const d = parseInt(parts[2], 10);
    return new Date(y, m, d, 0, 0, 0, 0);
  }

  private getTodayMidnight(): Date {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return today;
  }

  private getTomorrowMidnight(): Date {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    return tomorrow;
  }

  private getTabForRecord(record: PlannerModel): 'previous' | 'today' | 'upcoming' {
    const date = this.parseLocalDate(record.journery_date);
    if (!date) return 'today';
    const time = date.getTime();
    const todayTime = this.getTodayMidnight().getTime();
    const tomorrowTime = this.getTomorrowMidnight().getTime();

    if (time < todayTime) {
      return 'previous';
    } else if (time >= tomorrowTime) {
      return 'upcoming';
    } else {
      return 'today';
    }
  }
}

