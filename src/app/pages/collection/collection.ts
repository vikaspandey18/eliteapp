import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectRouterParam } from '../../store/router/router.selectors';
import { submitCollection, resetCollectionStatus } from './state/collection.actions';
import { selectCollectionLoading, selectCollectionError, selectCollectionSuccess } from './state/collection.selectors';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-collection',
  imports: [ReactiveFormsModule, RouterLink, AsyncPipe],
  templateUrl: './collection.html',
  styleUrl: './collection.css',
})
export class Collection implements OnInit, OnDestroy {
  private store = inject(Store);
  private subscription = new Subscription();

  customerId: string = '';

  loading$ = this.store.select(selectCollectionLoading);
  error$ = this.store.select(selectCollectionError);

  collectionForm = new FormGroup({
    amount: new FormControl('', [Validators.required, Validators.min(1)]),
    receiptNo: new FormControl('', Validators.required),
    followUpDate: new FormControl('', Validators.required),
    comment: new FormControl('', Validators.required),
  });

  ngOnInit() {
    // Get route parameters
    const subRoute = this.store
      .select(selectRouterParam)
      .subscribe((params) => {
        this.customerId = params['id'] ?? '';
      });
    this.subscription.add(subRoute);

    // Reset store status on init
    this.store.dispatch(resetCollectionStatus());

    // Listen for submission success
    const subSuccess = this.store
      .select(selectCollectionSuccess)
      .subscribe((success) => {
        if (success) {
          this.collectionForm.reset();
        }
      });
    this.subscription.add(subSuccess);
  }

  onSubmit() {
    if (this.collectionForm.invalid) {
      this.collectionForm.markAllAsTouched();
      return;
    }

    this.store.dispatch(
      submitCollection({
        customerId: this.customerId,
        amount: Number(this.collectionForm.value.amount),
        receiptNo: this.collectionForm.value.receiptNo ?? '',
        followUpDate: this.collectionForm.value.followUpDate ?? '',
        comment: this.collectionForm.value.comment ?? '',
      })
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.store.dispatch(resetCollectionStatus());
  }
}
