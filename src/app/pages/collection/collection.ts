import { ChangeDetectorRef, Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectRouterParam } from '../../store/router/router.selectors';
import { submitCollection, resetCollectionStatus } from './state/collection.actions';
import {
  selectCollectionLoading,
  selectCollectionError,
  selectCollectionSuccess,
} from './state/collection.selectors';
import { AsyncPipe } from '@angular/common';
import { NgToastComponent, NgToastService, TOAST_POSITIONS } from 'ng-angular-popup';

@Component({
  selector: 'app-collection',
  imports: [ReactiveFormsModule, RouterLink, AsyncPipe, NgToastComponent],
  templateUrl: './collection.html',
  styleUrl: './collection.css',
})
export class Collection implements OnInit, OnDestroy {
  TOAST_POSITIONS = TOAST_POSITIONS;
  private store = inject(Store);
  private cdr = inject(ChangeDetectorRef);

  private subscription = new Subscription();
  private toast = inject(NgToastService);

  customerId: string = '';
  journeryId: string = '';

  loading$ = this.store.select(selectCollectionLoading);
  error$ = this.store.select(selectCollectionError);

  collectionForm = new FormGroup({
    amount: new FormControl('', [Validators.required, Validators.min(1)]),
    receiptNo: new FormControl('', Validators.required),
    followUpDate: new FormControl(''),
    comment: new FormControl('', Validators.required),
    photo: new FormControl<File | null>(null),
  });

  photoPreview: string | null = null;

  onPhotoSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      this.collectionForm.patchValue({ photo: file });
      const reader = new FileReader();
      reader.onload = () => {
        this.photoPreview = reader.result as string;
        this.cdr.detectChanges(); // Force change detection for async FileReader callback
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    if (this.collectionForm.invalid) {
      this.collectionForm.markAllAsTouched();
      return;
    }

    this.store.dispatch(
      submitCollection({
        customerId: this.customerId,
        journeryId: this.journeryId,
        amount: Number(this.collectionForm.value.amount),
        receiptNo: this.collectionForm.value.receiptNo ?? '',
        followUpDate: this.collectionForm.value.followUpDate ?? '',
        comment: this.collectionForm.value.comment ?? '',
        photo: this.collectionForm.value.photo ?? null,
      }),
    );
  }

  ngOnInit() {
    // Get route parameters
    const subRoute = this.store.select(selectRouterParam).subscribe((params) => {
      this.customerId = params['id'] ?? '';
      this.journeryId = params?.['journery'] ?? '';
    });
    this.subscription.add(subRoute);

    // Reset store status on init
    this.store.dispatch(resetCollectionStatus());

    // Listen for submission success
    const subSuccess = this.store.select(selectCollectionSuccess).subscribe((success) => {
      if (success) {
        this.toast.success('Collection Added Successfully', 'Success');
        this.collectionForm.reset();
        this.photoPreview = null;
        this.cdr.detectChanges();
      }
    });
    this.subscription.add(subSuccess);

    const subError = this.store.select(selectCollectionError).subscribe((error) => {
      if (error) {
        this.toast.danger(error, 'Error');
      }
    });

    this.subscription.add(subError);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.store.dispatch(resetCollectionStatus());
  }
}
