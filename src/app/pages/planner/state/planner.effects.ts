import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { PlannerService } from '../services/planner-service';
import { loadPlanner, loadPlannerFailed, loadPlannerSuccess } from './planner.actions';
import { catchError, map, of, switchMap } from 'rxjs';

export class PlannerEffect {
  private actions$ = inject(Actions);
  private plannerService = inject(PlannerService);

  loadTodayPlanner$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadPlanner),
      switchMap((action) => {
        return this.plannerService.fetchTodayPlanner().pipe(
          map((response) => {
            return loadPlannerSuccess({ planner: response });
          }),
          catchError((err) => {
            return of(loadPlannerFailed({ error: err?.error?.message || err?.message }));
          }),
        );
      }),
    );
  });
}
