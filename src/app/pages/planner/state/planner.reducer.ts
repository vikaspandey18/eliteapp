import { createReducer, on } from '@ngrx/store';
import { initialState } from './planner.state';
import { loadPlanner, loadPlannerFailed, loadPlannerSuccess } from './planner.actions';

export const plannerReducer = createReducer(
  initialState,
  on(loadPlanner, (state, action) => {
    return {
      ...state,
      loading: true,
      error: null,
    };
  }),
  on(loadPlannerSuccess, (state, action) => {
    return {
      ...state,
      planner: action.planner,
      loading: false,
      error: null,
    };
  }),
  on(loadPlannerFailed, (state, action) => {
    return {
      ...state,
      loading: false,
      error: action.error,
    };
  }),
);
