import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Customer } from '../services/customer';
import {
  addCustomerPlanner,
  addCustomerPlannerFailure,
  addCustomerPlannerSuccess,
  loadCustomers,
  loadCustomersFailure,
  loadCustomersSuccess,
} from './customer.actions';
import { catchError, map, mergeMap, of, switchMap } from 'rxjs';

@Injectable()
export class CustomerEffect {
  private actions$ = inject(Actions);
  private customerService = inject(Customer);

  loadCustomer$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadCustomers),
      switchMap((action) => {
        return this.customerService.getCustomer().pipe(
          map((response) => {
            return loadCustomersSuccess({ customers: response });
          }),
          catchError((err) => {
            return of(loadCustomersFailure({ error: err?.error?.message || err?.message }));
          }),
        );
      }),
    );
  });

  addCustomerPlanner$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(addCustomerPlanner),
      mergeMap((action) => {
        return this.customerService.addCustomerToPlanner(action.customerId).pipe(
          map((response) => {
            return addCustomerPlannerSuccess({ response });
          }),
          catchError((err) => {
            return of(addCustomerPlannerFailure({ error: err?.error?.message || err?.message }));
          }),
        );
      }),
    );
  });
}
