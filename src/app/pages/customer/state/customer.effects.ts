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
import { catchError, map, mergeMap, of, switchMap, tap } from 'rxjs';
import { NgToastService } from 'ng-angular-popup';

@Injectable()
export class CustomerEffect {
  private actions$ = inject(Actions);
  private customerService = inject(Customer);
  private toast = inject(NgToastService);

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

  addCustomerPlannerSuccessToast$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(addCustomerPlannerSuccess),
        tap(({ response }) => {
          if (+response.status === 200) {
            this.toast.success(response.message || 'Planner added successfully', 'Success');
          } else {
            this.toast.danger(response.message || 'Failed to add planner', 'Error');
          }
        }),
      ),
    { dispatch: false },
  );

  addCustomerPlannerFailureToast$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(addCustomerPlannerFailure),
        tap(({ error }) => {
          this.toast.danger(error || 'Failed to add planner', 'Error');
        }),
      ),
    { dispatch: false },
  );
}
