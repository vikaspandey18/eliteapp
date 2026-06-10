import { inject, Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GeolocationService {
  private ngZone = inject(NgZone);

  getCurrentPosition(): Observable<{ latitude: number; longitude: number }> {
    return new Observable((observer) => {
      if (!navigator.geolocation) {
        this.ngZone.run(() => {
          observer.error('Geolocation is not supported by your browser');
        });
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.ngZone.run(() => {
            observer.next({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            });
            observer.complete();
          });
        },
        (error) => {
          this.ngZone.run(() => {
            observer.error(error.message);
          });
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        }
      );
    });
  }
}
