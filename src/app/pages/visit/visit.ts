import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { VisitService } from './service/visit-service';
import { finalize, Subscription } from 'rxjs';

@Component({
  selector: 'app-visit',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './visit.html',
  styleUrl: './visit.css',
})
export class Visit {
  private visitService = inject(VisitService);

  private subscription = new Subscription();

  loading = false;

  error: string | null = null;

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
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    if (this.visitForm.invalid) {
      this.visitForm.markAllAsTouched();
      return;
    }

    this.loading = true;

    this.error = null;

    const formData = new FormData();

    formData.append('followUpDate', this.visitForm.value.followUpDate ?? '');

    formData.append('comment', this.visitForm.value.comment ?? '');

    formData.append('purpose', this.visitForm.value.purpose ?? '');

    if (this.visitForm.value.photo) {
      formData.append('photo', this.visitForm.value.photo);
    }

    const sub = this.visitService
      .addVisit(formData)
      .pipe(
        finalize(() => {
          this.loading = false;
        }),
      )
      .subscribe({
        next: (response) => {
          console.log(response);
          alert('Saved Successfully');
          this.visitForm.reset();
          this.photoPreview = null;
        },
        error: (err) => {
          console.log(err);
          this.error = 'Failed to save visit';
        },
      });

    this.subscription.add(sub);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
