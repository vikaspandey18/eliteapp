import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EmployeeService } from '../services/employee.service';
import { loadEmployee, loadEmployeeSuccess, loadEmployeeFailure } from './employee.actions';
import { catchError, map, of, switchMap } from 'rxjs';

@Injectable()
export class EmployeeEffect {
  private actions$ = inject(Actions);
  private employeeService = inject(EmployeeService);

  loadEmployee$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadEmployee),
      switchMap(() => {
        return this.employeeService.getEmployee().pipe(
          map((response) => {
            if (+response.status === 200 && response.data) {
              return loadEmployeeSuccess({ employee: response.data });
            } else {
              return loadEmployeeFailure({ error: response.message || 'Failed to fetch employee' });
            }
          }),
          catchError((err) => {
            return of(loadEmployeeFailure({ error: err?.error?.message || err?.message || 'Server error' }));
          })
        );
      })
    );
  });
}
