import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AttendanceState } from './attendance.state';

const selectorAttendance = createFeatureSelector<AttendanceState>('attendance');

export const selectAttendance = createSelector(selectorAttendance, (state) => {
  return state.attendance;
});

export const selectLoadingAttendance = createSelector(selectorAttendance, (state) => {
  return state.loading;
});

export const selectErrorAttendance = createSelector(selectorAttendance, (state) => {
  return state.error;
});
