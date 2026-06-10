import { Component, inject, OnDestroy, OnInit, ChangeDetectorRef } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectRouterParam } from '../../store/router/router.selectors';
import { submitVisit, resetVisitStatus } from './state/visit.actions';
import { selectVisitLoading, selectVisitError, selectVisitSuccess } from './state/visit.selectors';
import { AsyncPipe } from '@angular/common';
import { NgToastComponent, NgToastService, TOAST_POSITIONS } from 'ng-angular-popup';

@Component({
  selector: 'app-visit',
  imports: [ReactiveFormsModule, RouterLink, AsyncPipe, NgToastComponent],
  templateUrl: './visit.html',
  styleUrl: './visit.css',
})
export class Visit implements OnInit, OnDestroy {
  TOAST_POSITIONS = TOAST_POSITIONS;
  private store = inject(Store);
  private cdr = inject(ChangeDetectorRef);

  private subscription = new Subscription();
  private toast = inject(NgToastService);

  loading$ = this.store.select(selectVisitLoading);
  error$ = this.store.select(selectVisitError);

  customerId: string = '';

  visitForm = new FormGroup({
    followUpDate: new FormControl(''),
    comment: new FormControl('', Validators.required),
    purpose: new FormControl('', Validators.required),
    photo: new FormControl<File | null>(null),
  });

  photoPreview: string | null = null;

  onPhotoSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      this.visitForm.patchValue({ photo: file });
      const reader = new FileReader();
      reader.onload = () => {
        this.photoPreview = reader.result as string;
        this.cdr.detectChanges(); // Force change detection for async FileReader callback
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    if (this.visitForm.invalid) {
      this.visitForm.markAllAsTouched();
      return;
    }

    this.store.dispatch(
      submitVisit({
        customerId: this.customerId,
        followUpDate: this.visitForm.value.followUpDate ?? '',
        comment: this.visitForm.value.comment ?? '',
        purpose: this.visitForm.value.purpose ?? '',
        photo: this.visitForm.value.photo ?? null,
      }),
    );
  }

  ngOnInit() {
    // Get route parameters
    const subRoute = this.store.select(selectRouterParam).subscribe((params) => {
      this.customerId = params['id'] ?? '';
    });
    this.subscription.add(subRoute);

    // Reset store status on init
    this.store.dispatch(resetVisitStatus());

    // Listen for submission success
    const subSuccess = this.store.select(selectVisitSuccess).subscribe((success) => {
      if (success) {
        this.toast.success('Visit Added Successfully', 'Success');
        this.visitForm.reset();
        this.photoPreview = null;
        this.cdr.detectChanges();
      }
    });
    this.subscription.add(subSuccess);

    const subError = this.store.select(selectVisitError).subscribe((error) => {
      if (error) {
        this.toast.danger(error, 'Error');
      }
    });

    this.subscription.add(subError);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.store.dispatch(resetVisitStatus());
  }
}
