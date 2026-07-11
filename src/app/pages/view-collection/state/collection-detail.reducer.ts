import { createReducer, on } from '@ngrx/store';
import { initialState } from './collection-detail.state';
import {
  loadCollectionDetail,
  loadCollectionDetailFailed,
  loadCollectionDetailSuccess,
} from './collection-detail.actions';

export const collectionDetailReducer = createReducer(
  initialState,
  on(loadCollectionDetail, (state, action) => {
    return {
      ...state,
      loading: true,
    };
  }),
  on(loadCollectionDetailSuccess, (state, action) => {
    return {
      ...state,
      loading: false,
      collectionDetail: action.collectiondetail,
    };
  }),
  on(loadCollectionDetailFailed, (state, action) => {
    return {
      ...state,
      loading: false,
      error: action.error,
    };
  }),
);
