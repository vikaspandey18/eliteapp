import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CollectionDetailState } from './collection-detail.state';

const collectionDetailFeatureSelector =
  createFeatureSelector<CollectionDetailState>('collectionDetail');

export const selectCollectionDetailLoading = createSelector(
  collectionDetailFeatureSelector,
  (state) => {
    return state.loading;
  },
);

export const selectCollectionDetail = createSelector(collectionDetailFeatureSelector, (state) => {
  return state.collectionDetail;
});

export const selectCollectionDetailError = createSelector(
  collectionDetailFeatureSelector,
  (state) => {
    return state.error;
  },
);
