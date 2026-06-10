import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { CustomerModel } from '../../../models/customer.model';
import { Store } from '@ngrx/store';
import { selectCustomerFromRoute, selectCustomers } from '../../customer/state/customer.selectors';
import { loadCustomers } from '../../customer/state/customer.actions';
import { AsyncPipe, CommonModule } from '@angular/common';
import { selectRouterParam } from '../../../store/router/router.selectors';

@Component({
  selector: 'app-planner-menu',
  imports: [RouterLink, AsyncPipe, CommonModule],
  templateUrl: './planner-menu.html',
  styleUrl: './planner-menu.css',
})
export class PlannerMenu implements OnInit {
  private store = inject(Store);

  customer$!: Observable<CustomerModel | undefined>;
  journeryId = '';

  ngOnInit(): void {
    // Check if customer list is empty in the store, and fetch from database if needed
    this.store
      .select(selectCustomers)
      .pipe(first())
      .subscribe((customers) => {
        if (!customers || customers.length === 0) {
          this.store.dispatch(loadCustomers());
        }
      });

    this.customer$ = this.store.select(selectCustomerFromRoute);

    this.store.select(selectRouterParam).subscribe((params) => {
      this.journeryId = params['journery'] ?? '';
    });
  }
}
