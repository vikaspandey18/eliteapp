import { createAction, props } from '@ngrx/store';
import { ApiResponse } from '../../../models/api.response.model';

export const submitCollection = createAction(
  '[collection] submit start',
  props<{
    customerId: string;
    journeryId: string;
    amount: number;
    receiptNo: string;
    followUpDate: string;
    comment: string;
    photo: File | null;
  }>(),
);

export const submitCollectionSuccess = createAction(
  '[collection] submit success',
  props<{ response: ApiResponse<null> }>(),
);

export const submitCollectionFailure = createAction(
  '[collection] submit failure',
  props<{ error: string }>(),
);

export const resetCollectionStatus = createAction('[collection] reset status');
