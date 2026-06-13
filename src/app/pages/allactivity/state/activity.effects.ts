import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ActivityService } from '../services/activity-service';
import { loadActivity, loadActivityFailed, loadActivitySuccess } from './activity.actions';
import { catchError, map, of, switchMap } from 'rxjs';

@Injectable()
export class ActivityEffect {
  private actions$ = inject(Actions);
  private activityService = inject(ActivityService);

  getAllActivity$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadActivity),
      switchMap((action) => {
        return this.activityService.getAllActivity().pipe(
          map((response) => {
            return loadActivitySuccess({ allactivity: response.data });
          }),
          catchError((err) => {
            return of(loadActivityFailed({ error: err?.error?.message || err?.message }));
          }),
        );
      }),
    );
  });
}
