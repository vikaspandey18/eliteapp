import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CollectionService } from '../service/collection.service';
import { GeolocationService } from '../../../core/services/geolocation.service';
import { submitCollection, submitCollectionFailure, submitCollectionSuccess } from './collection.actions';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { NgToastService } from 'ng-angular-popup';

@Injectable()
export class CollectionEffect {
  private actions$ = inject(Actions);
  private collectionService = inject(CollectionService);
  private geoService = inject(GeolocationService);
  private toast = inject(NgToastService);

  submitCollection$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(submitCollection),
      switchMap((action) => {
        return this.geoService.getCurrentPosition().pipe(
          catchError((geoErr) => {
            // console.warn('GPS coordinates not fetched, using fallback (0,0):', geoErr);
            return of({ latitude: 0, longitude: 0 });
          }),
          switchMap((coords) => {
            const formData = new FormData();
            formData.append('customerId', action.customerId);
            formData.append('journeryId', action.journeryId);
            formData.append('amount', action.amount.toString());
            formData.append('receipt_no', action.receiptNo);
            formData.append('followUpDate', action.followUpDate);
            formData.append('comment', action.comment);
            formData.append('latitude', coords.latitude === 0 ? '000' : coords.latitude.toString());
            formData.append('longitude', coords.longitude === 0 ? '000' : coords.longitude.toString());

            if (action.photo) {
              formData.append('photo', action.photo);
            }

            return this.collectionService.addCollection(formData).pipe(
              map((response) => {
                if (+response.status === 200) {
                  return submitCollectionSuccess({ response });
                } else {
                  return submitCollectionFailure({ error: response.message || 'Failed to submit collection' });
                }
              }),
              catchError((err) => {
                return of(submitCollectionFailure({ error: err?.error?.message || err?.message || 'Server error' }));
              })
            );
          }),
          catchError((err) => {
            return of(submitCollectionFailure({ error: 'Submission failed: ' + (err?.message || err || 'unknown error') }));
          })
        );
      })
    );
  });

  submitCollectionSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(submitCollectionSuccess),
        tap(({ response }) => {
          this.toast.success(response.message || 'Collection saved successfully', 'Success');
        })
      ),
    { dispatch: false }
  );

  submitCollectionFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(submitCollectionFailure),
        tap(({ error }) => {
          this.toast.danger(error || 'Failed to save collection', 'Error');
        })
      ),
    { dispatch: false }
  );
}
