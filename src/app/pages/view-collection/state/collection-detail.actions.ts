import { createAction, props } from '@ngrx/store';
import { CollectionDetailModel } from '../../../models/collection-detail.model';

export const loadCollectionDetail = createAction(
  '[collectiondetail] fetch start',
  props<{ id: string }>(),
);

export const loadCollectionDetailSuccess = createAction(
  '[collectiondetail] fetch success',
  props<{ collectiondetail: CollectionDetailModel }>(),
);

export const loadCollectionDetailFailed = createAction(
  '[collectiondetail] fetch failed',
  props<{ error: string }>(),
);
