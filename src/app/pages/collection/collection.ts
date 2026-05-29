import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-collection',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './collection.html',
  styleUrl: './collection.css',
})
export class Collection {
  collectionForm = new FormGroup({
    amount: new FormControl('', [Validators.required, Validators.min(1)]),
    receiptNo: new FormControl('', Validators.required),
    followUpDate: new FormControl('', Validators.required),
    comment: new FormControl('', Validators.required),
  });

  onSubmit() {
    if (this.collectionForm.valid) {
      console.log('Form submitted:', this.collectionForm.value);
      alert('Collection form submitted successfully!');
    } else {
      this.collectionForm.markAllAsTouched();
    }
  }
}
