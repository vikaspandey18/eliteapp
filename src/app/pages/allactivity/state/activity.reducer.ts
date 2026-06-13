import { createReducer, on } from '@ngrx/store';
import { initialState } from './activity.state';
import { loadActivity, loadActivityFailed, loadActivitySuccess } from './activity.actions';

export const activityReducer = createReducer(
  initialState,
  on(loadActivity, (state, action) => {
    return {
      ...state,
      loading: true,
    };
  }),
  on(loadActivitySuccess, (state, action) => {
    return {
      ...state,
      loading: false,
      allactivity: action.allactivity,
    };
  }),
  on(loadActivityFailed, (state, action) => {
    return {
      ...state,
      loading: false,
      error: action.error,
    };
  }),
);
