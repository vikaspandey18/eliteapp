import { createAction, props } from '@ngrx/store';
import { VisitDetailModel } from '../../../models/visit-detail.model';

export const loadVisitDetail = createAction('[visitdetail] fetch start', props<{ id: string }>());

export const loadVisitDetailSuccess = createAction(
  '[visitdetail] fetch success',
  props<{ visitdetail: VisitDetailModel }>(),
);

export const loadVisitDetailFailed = createAction(
  '[visitdetail] fetch failed',
  props<{ error: string }>(),
);
