import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, filter, map, of, switchMap, tap } from 'rxjs';
import { loadCollectionDetail, loadCollectionDetailFailed, loadCollectionDetailSuccess } from './collection-detail.actions';
import { ViewCollectionService } from '../services/view-collection';
import { routerNavigationAction } from '@ngrx/router-store';
import { NgToastService } from 'ng-angular-popup';

@Injectable()
export class CollectionDetailEffect {
  private actions$ = inject(Actions);
  private collectionDetailService = inject(ViewCollectionService);
  private toast = inject(NgToastService);

  loadCollectionDetailOnNavigation$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(routerNavigationAction),
      filter((action: any) => {
        const url = action.payload.routerState.url;
        return url.startsWith('/viewcollection/');
      }),
      map((action: any) => {
        const id = action.payload.routerState.params.id;
        return loadCollectionDetail({ id });
      }),
    );
  });

  loadCollectionDetail$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadCollectionDetail),
      switchMap((action) => {
        return this.collectionDetailService.getCollectionDetail(action.id).pipe(
          map((response) => {
            return loadCollectionDetailSuccess({ collectiondetail: response.data });
          }),
          catchError((err) => {
            return of(loadCollectionDetailFailed({ error: err?.error?.message || err?.message }));
          }),
        );
      }),
    );
  });

  loadCollectionDetailFailedToast$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(loadCollectionDetailFailed),
        tap(({ error }) => {
          this.toast.danger(error || 'Failed to load collection details', 'Error');
        }),
      ),
    { dispatch: false },
  );
}

