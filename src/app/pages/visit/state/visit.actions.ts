import { createAction, props } from '@ngrx/store';
import { ApiResponse } from '../../../models/api.response.model';

export const submitVisit = createAction(
  '[visit] submit start',
  props<{
    customerId: string;
    followUpDate: string;
    comment: string;
    purpose: string;
    photo: File | null;
  }>()
);

export const submitVisitSuccess = createAction(
  '[visit] submit success',
  props<{ response: ApiResponse<null> }>()
);

export const submitVisitFailure = createAction(
  '[visit] submit failure',
  props<{ error: string }>()
);

export const resetVisitStatus = createAction('[visit] reset status');
