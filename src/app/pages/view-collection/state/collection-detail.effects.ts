import { inject, Injectable } from '@angular/core';
import { Actions } from '@ngrx/effects';

@Injectable()
export class CollectionDetailEffect {
  private actions$ = inject(Actions);
}
