import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { loadCollectionDetail, loadCollectionDetailFailed, loadCollectionDetailSuccess } from './collection-detail.actions';
import { ViewCollectionService } from '../services/view-collection';

@Injectable()
export class CollectionDetailEffect {
  private actions$ = inject(Actions);
  private collectionDetailService = inject(ViewCollectionService);

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
}
