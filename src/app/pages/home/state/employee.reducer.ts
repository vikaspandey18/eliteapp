import { createReducer, on } from '@ngrx/store';
import { initialEmployeeState } from './employee.state';
import { loadEmployee, loadEmployeeSuccess, loadEmployeeFailure } from './employee.actions';

export const employeeReducer = createReducer(
  initialEmployeeState,
  on(loadEmployee, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(loadEmployeeSuccess, (state, { employee }) => ({
    ...state,
    loading: false,
    employee,
    error: null,
  })),
  on(loadEmployeeFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
