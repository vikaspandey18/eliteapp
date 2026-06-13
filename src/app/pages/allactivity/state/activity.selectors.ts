import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ActivityState } from './activity.state';

const activityFeatureSelector = createFeatureSelector<ActivityState>('activity');

export const selectAllActivity = createSelector(activityFeatureSelector, (state) => {
  return state.allactivity;
});

export const selectLoadingActivity = createSelector(activityFeatureSelector, (state) => {
  return state.loading;
});

export const selectFailedActivity = createSelector(activityFeatureSelector, (state) => {
  return state.error;
});
