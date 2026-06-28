import { CollectionDetailModel } from '../../../models/collection-detail.model';

export interface CollectionDetailState {
  collectionDetail: CollectionDetailModel | null;
  loading: boolean;
  error: string | null;
}

export const initialState: CollectionDetailState = {
  collectionDetail: null,
  loading: false,
  error: null,
};
