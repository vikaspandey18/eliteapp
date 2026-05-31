import { inject, Injectable } from '@angular/core';
import { Actions } from '@ngrx/effects';

@Injectable()
export class CustomerEffect {
  private actions$ = inject(Actions);
}
