import { createFeatureSelector, createSelector } from '@ngrx/store';
import { EmployeeState } from './employee.state';

export const selectEmployeeState = createFeatureSelector<EmployeeState>('employee');

export const selectEmployee = createSelector(
  selectEmployeeState,
  (state) => state.employee
);

export const selectEmployeeLoading = createSelector(
  selectEmployeeState,
  (state) => state.loading
);

export const selectEmployeeError = createSelector(
  selectEmployeeState,
  (state) => state.error
);
