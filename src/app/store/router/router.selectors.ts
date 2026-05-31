import { RouterReducerState } from '@ngrx/router-store';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RouterStateUrl } from './custom-route-serializer';

const selectRouter = createFeatureSelector<RouterReducerState<RouterStateUrl>>('router');

export const selectRouterParam = createSelector(selectRouter, (routerState) => {
  return routerState.state.params;
});

export const selectRouterQueryParam = createSelector(selectRouter, (routerState) => {
  return routerState.state.queryParams;
});

export const selectRouterUrl = createSelector(selectRouter, (routerState) => {
  return routerState.state.url;
});
