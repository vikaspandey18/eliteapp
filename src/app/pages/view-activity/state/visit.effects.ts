import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ViewVisit } from '../services/view-visit';
import { loadVisitDetail, loadVisitDetailFailed, loadVisitDetailSuccess } from './visit.actions';
import { catchError, map, of, switchMap } from 'rxjs';

@Injectable()
export class VisitDetailEffect {
  private actions$ = inject(Actions);
  private visitDetailService = inject(ViewVisit);

  loadVisitDetail$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadVisitDetail),
      switchMap((action) => {
        return this.visitDetailService.getVisitDetail(action.id).pipe(
          map((response) => {
            return loadVisitDetailSuccess({ visitdetail: response.data });
          }),
          catchError((err) => {
            return of(loadVisitDetailFailed({ error: err?.error?.message || err?.message }));
          }),
        );
      }),
    );
  });
}
