import { createFeatureSelector, createSelector } from '@ngrx/store';
import { VisitState } from './visit.state';

const selectVisitState = createFeatureSelector<VisitState>('visit');

export const selectVisitLoading = createSelector(
  selectVisitState,
  (state) => state.loading
);

export const selectVisitError = createSelector(
  selectVisitState,
  (state) => state.error
);

export const selectVisitSuccess = createSelector(
  selectVisitState,
  (state) => state.success
);

export const selectVisitResponse = createSelector(
  selectVisitState,
  (state) => state.response
);
