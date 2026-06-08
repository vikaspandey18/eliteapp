import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-visit',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './visit.html',
  styleUrl: './visit.css',
})
export class Visit {
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
    if (this.visitForm.valid) {
      console.log('Form submitted:', this.visitForm.value);
      alert('Visit form submitted successfully!');
    } else {
      this.visitForm.markAllAsTouched();
    }
  }
}
