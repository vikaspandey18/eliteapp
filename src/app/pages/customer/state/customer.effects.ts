import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Customer } from '../services/customer';
import { loadCustomers, loadCustomersFailure, loadCustomersSuccess } from './customer.actions';
import { catchError, map, of, switchMap } from 'rxjs';

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
}
