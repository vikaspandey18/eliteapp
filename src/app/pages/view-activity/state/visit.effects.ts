import { inject, Injectable } from '@angular/core';
import { Actions } from '@ngrx/effects';

@Injectable()
export class VisitDetailEffect {
  private actions$ = inject(Actions);
}
