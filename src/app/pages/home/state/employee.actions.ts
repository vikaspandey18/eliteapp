import { createAction, props } from '@ngrx/store';
import { EmployeeModel } from '../../../models/employee.model';

export const loadEmployee = createAction('[Employee] Load Employee');
export const loadEmployeeSuccess = createAction(
  '[Employee] Load Employee Success',
  props<{ employee: EmployeeModel }>()
);
export const loadEmployeeFailure = createAction(
  '[Employee] Load Employee Failure',
  props<{ error: string }>()
);
