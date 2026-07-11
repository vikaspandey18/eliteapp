import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { VisitService } from '../service/visit-service';
import { GeolocationService } from '../../../core/services/geolocation.service';
import { submitVisit, submitVisitFailure, submitVisitSuccess } from './visit.actions';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { NgToastService } from 'ng-angular-popup';

@Injectable()
export class VisitEffect {
  private actions$ = inject(Actions);
  private visitService = inject(VisitService);
  private geoService = inject(GeolocationService);
  private toast = inject(NgToastService);

  submitVisit$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(submitVisit),
      switchMap((action) => {
        return this.geoService.getCurrentPosition().pipe(
          catchError((geoErr) => {
            // console.warn('GPS coordinates not fetched, using fallback (0,0):', geoErr);
            return of({ latitude: 0, longitude: 0 });
          }),
          switchMap((coords) => {
            const formData = new FormData();
            formData.append('customerId', action.customerId);
            formData.append('followUpDate', action.followUpDate);
            formData.append('comment', action.comment);
            formData.append('purpose', action.purpose);
            formData.append('latitude', coords.latitude === 0 ? '000' : coords.latitude.toString());
            formData.append('longitude', coords.longitude === 0 ? '000' : coords.longitude.toString());
            
            if (action.photo) {
              formData.append('photo', action.photo);
            }

            return this.visitService.addVisit(formData).pipe(
              map((response) => {
                if (+response.status === 200) {
                  return submitVisitSuccess({ response });
                } else {
                  return submitVisitFailure({ error: response.message || 'Failed to submit visit' });
                }
              }),
              catchError((err) => {
                return of(submitVisitFailure({ error: err?.error?.message || err?.message || 'Server error' }));
              })
            );
          }),
          catchError((err) => {
            return of(submitVisitFailure({ error: 'Submission failed: ' + (err?.message || err || 'unknown error') }));
          })
        );
      })
    );
  });

  submitVisitSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(submitVisitSuccess),
        tap(({ response }) => {
          this.toast.success(response.message || 'Visit saved successfully', 'Success');
        })
      ),
    { dispatch: false }
  );

  submitVisitFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(submitVisitFailure),
        tap(({ error }) => {
          this.toast.danger(error || 'Failed to save visit', 'Error');
        })
      ),
    { dispatch: false }
  );
}
