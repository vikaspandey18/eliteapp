import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ViewVisit } from '../services/view-visit';
import { loadVisitDetail, loadVisitDetailFailed, loadVisitDetailSuccess } from './visit.actions';
import { catchError, filter, map, of, switchMap, tap } from 'rxjs';
import { routerNavigationAction } from '@ngrx/router-store';
import { NgToastService } from 'ng-angular-popup';

@Injectable()
export class VisitDetailEffect {
  private actions$ = inject(Actions);
  private visitDetailService = inject(ViewVisit);
  private toast = inject(NgToastService);

  loadVisitDetailOnNavigation$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(routerNavigationAction),
      filter((action: any) => {
        const url = action.payload.routerState.url;
        return url.startsWith('/viewactivity/');
      }),
      map((action: any) => {
        const id = action.payload.routerState.params.id;
        return loadVisitDetail({ id });
      }),
    );
  });

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

  loadVisitDetailFailedToast$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(loadVisitDetailFailed),
        tap(({ error }) => {
          this.toast.danger(error || 'Failed to load visit details', 'Error');
        }),
      ),
    { dispatch: false },
  );
}




