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

      const getPos = (highAccuracy: boolean) => {
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
            if (highAccuracy) {
              getPos(false);
            } else {
              this.ngZone.run(() => {
                observer.error(error.message);
              });
            }
          },
          {
            enableHighAccuracy: highAccuracy,
            timeout: highAccuracy ? 8000 : 15000,
            maximumAge: 60000,
          }
        );
      };

      getPos(true);
    });
  }
}
