import { createAction, props } from '@ngrx/store';
import { AttendanceRecord } from '../../../models/attendance.model';

export const loadAttendanceStart = createAction(
  '[attendance] fetch start',
  props<{ fromDate: string; toDate: string }>(),
);

export const loadAttendanceSuccess = createAction(
  '[attendance] fetch success',
  props<{ attendance: AttendanceRecord[] }>(),
);

export const loadAttendanceFailed = createAction(
  '[attendance] fetch failed',
  props<{ error: string }>(),
);
