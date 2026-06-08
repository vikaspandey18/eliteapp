import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { CustomerModel } from '../../../models/customer.model';
import { Store } from '@ngrx/store';
import { selectCustomerFromRoute } from '../../customer/state/customer.selectors';
import { AsyncPipe, CommonModule } from '@angular/common';

@Component({
  selector: 'app-planner-menu',
  imports: [RouterLink, AsyncPipe, CommonModule],
  templateUrl: './planner-menu.html',
  styleUrl: './planner-menu.css',
})
export class PlannerMenu implements OnInit {
  private store = inject(Store);

  customer$!: Observable<CustomerModel | undefined>;

  ngOnInit(): void {
    this.customer$ = this.store.select(selectCustomerFromRoute);
  }
}
