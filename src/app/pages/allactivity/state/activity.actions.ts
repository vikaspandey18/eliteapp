import { createAction, props } from '@ngrx/store';
import { ActivityModel } from '../../../models/activity.model';

export const loadActivity = createAction('[activity] fetch start');

export const loadActivitySuccess = createAction(
  '[activity] fetch success',
  props<{ allactivity: ActivityModel[] }>(),
);

export const loadActivityFailed = createAction(
  '[activity] fetch failed',
  props<{ error: string }>(),
);
