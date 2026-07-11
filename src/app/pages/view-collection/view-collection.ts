import { AsyncPipe, CommonModule, DatePipe, CurrencyPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CollectionDetailModel } from '../../models/collection-detail.model';
import { selectCollectionDetail, selectCollectionDetailError, selectCollectionDetailLoading } from './state/collection-detail.selectors';
import { NgToastComponent, TOAST_POSITIONS } from 'ng-angular-popup';

@Component({
  selector: 'app-view-collection',
  imports: [RouterLink, AsyncPipe, DatePipe, CurrencyPipe, CommonModule, NgToastComponent],
  templateUrl: './view-collection.html',
  styleUrl: './view-collection.css',
})
export class ViewCollection implements OnInit {
  TOAST_POSITIONS = TOAST_POSITIONS;

  private store = inject(Store);

  collectionDetail$!: Observable<CollectionDetailModel | null>;
  loading$!: Observable<boolean>;
  error$!: Observable<string | null>;

  ngOnInit(): void {
    this.collectionDetail$ = this.store.select(selectCollectionDetail);
    this.loading$ = this.store.select(selectCollectionDetailLoading);
    this.error$ = this.store.select(selectCollectionDetailError);
  }
}


