import { createReducer, on } from '@ngrx/store';
import { initialState } from './collection.state';
import { submitCollection, submitCollectionFailure, submitCollectionSuccess, resetCollectionStatus } from './collection.actions';

export const collectionReducer = createReducer(
  initialState,
  on(submitCollection, (state) => ({
    ...state,
    loading: true,
    error: null,
    success: false,
    response: null,
  })),
  on(submitCollectionSuccess, (state, { response }) => ({
    ...state,
    loading: false,
    error: null,
    success: true,
    response,
  })),
  on(submitCollectionFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
    success: false,
    response: null,
  })),
  on(resetCollectionStatus, (state) => ({
    ...state,
    loading: false,
    error: null,
    success: false,
    response: null,
  }))
);
