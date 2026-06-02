import { createAction, props } from '@ngrx/store';
import { ApiResponse } from '../../../models/api.response.model';
import { PlannerModel } from '../../../models/planner.model';

export const loadPlanner = createAction('[planner] fetch start');

export const loadPlannerSuccess = createAction(
  '[planner] fetch success',
  props<{ planner: ApiResponse<PlannerModel[]> }>(),
);

export const loadPlannerFailed = createAction('[planner] fetch failed', props<{ error: string }>());
