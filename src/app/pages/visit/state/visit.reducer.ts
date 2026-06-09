import { createReducer, on } from '@ngrx/store';
import { initialState } from './visit.state';
import { submitVisit, submitVisitFailure, submitVisitSuccess, resetVisitStatus } from './visit.actions';

export const visitReducer = createReducer(
  initialState,
  on(submitVisit, (state) => ({
    ...state,
    loading: true,
    error: null,
    success: false,
    response: null,
  })),
  on(submitVisitSuccess, (state, { response }) => ({
    ...state,
    loading: false,
    error: null,
    success: true,
    response,
  })),
  on(submitVisitFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
    success: false,
    response: null,
  })),
  on(resetVisitStatus, (state) => ({
    ...state,
    loading: false,
    error: null,
    success: false,
    response: null,
  }))
);
