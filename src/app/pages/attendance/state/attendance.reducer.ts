import { createReducer, on } from '@ngrx/store';
import { initialState } from './attendance.state';
import {
  loadAttendanceFailed,
  loadAttendanceStart,
  loadAttendanceSuccess,
} from './attendance.actions';

export const attendanceReducer = createReducer(
  initialState,
  on(loadAttendanceStart, (state, action) => {
    return {
      ...state,
      loading: true,
      error: null,
    };
  }),
  on(loadAttendanceSuccess, (state, action) => {
    return {
      ...state,
      loading: false,
      attendance: action.attendance,
    };
  }),
  on(loadAttendanceFailed, (state, action) => {
    return {
      ...state,
      loading: false,
      error: action.error,
    };
  }),
);
