import { createReducer, on } from '@ngrx/store';
import { initialState } from './visit.state';
import { loadVisitDetail, loadVisitDetailFailed, loadVisitDetailSuccess } from './visit.actions';

export const visitDetailReducer = createReducer(
  initialState,
  on(loadVisitDetail, (state, action) => {
    return {
      ...state,
      loading: true,
    };
  }),
  on(loadVisitDetailSuccess, (state, action) => {
    return {
      ...state,
      loading: false,
      visitdetail: action.visitdetail,
    };
  }),
  on(loadVisitDetailFailed, (state, action) => {
    return {
      ...state,
      loading: false,
      error: action.error,
    };
  }),
);
