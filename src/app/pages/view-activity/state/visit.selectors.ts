import { createFeatureSelector, createSelector } from '@ngrx/store';
import { VisitDetailState } from './visit.state';

const visitDetailFeatureSelector = createFeatureSelector<VisitDetailState>('visitDetail');

export const selectVisitDetailLoading = createSelector(visitDetailFeatureSelector, (state) => {
  return state.loading;
});

export const selectVisitDetail = createSelector(visitDetailFeatureSelector, (state) => {
  return state.visitdetail;
});

export const selectVisitDetailError = createSelector(visitDetailFeatureSelector, (state) => {
  return state.error;
});
