import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PlannerState } from './planner.state';

const plannerFeatureSelector = createFeatureSelector<PlannerState>('planner');

export const selectPlannerResponse = createSelector(plannerFeatureSelector, (state) => {
  return state.planner;
});

export const selectPlanner = createSelector(plannerFeatureSelector, (state) => {
  return state.planner?.data ?? [];
});

export const selectPlannerMessage = createSelector(
  plannerFeatureSelector,
  (state) => state.planner?.message ?? '',
);

export const selectPlannerStatusCode = createSelector(
  plannerFeatureSelector,
  (state) => state.planner?.status ?? null,
);

export const selectPlannerLoading = createSelector(
  plannerFeatureSelector,
  (state) => state.loading,
);

export const selectPlannerError = createSelector(plannerFeatureSelector, (state) => {
  return state.error;
});
