import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AttendanceService } from '../services/attendance.service';
import {
  loadAttendanceFailed,
  loadAttendanceStart,
  loadAttendanceSuccess,
} from './attendance.actions';
import { catchError, map, of, switchMap } from 'rxjs';

@Injectable()
export class AttendanceEffect {
  private actions$ = inject(Actions);
  private attendanceService = inject(AttendanceService);

  loadAttendance$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadAttendanceStart),
      switchMap((action) => {
        return this.attendanceService.getAttendanceReport(action.fromDate, action.toDate).pipe(
          map((response) => {
            return loadAttendanceSuccess({ attendance: response.data });
          }),
          catchError((err) => {
            return of(loadAttendanceFailed({ error: err?.error?.message || err?.message }));
          }),
        );
      }),
    );
  });

  
}
