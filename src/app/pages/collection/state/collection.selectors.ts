import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CollectionState } from './collection.state';

const selectCollectionState = createFeatureSelector<CollectionState>('collection');

export const selectCollectionLoading = createSelector(
  selectCollectionState,
  (state) => state.loading
);

export const selectCollectionError = createSelector(
  selectCollectionState,
  (state) => state.error
);

export const selectCollectionSuccess = createSelector(
  selectCollectionState,
  (state) => state.success
);

export const selectCollectionResponse = createSelector(
  selectCollectionState,
  (state) => state.response
);
