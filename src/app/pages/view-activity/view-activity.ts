import { AsyncPipe, CommonModule, DatePipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { VisitDetailModel } from '../../models/visit-detail.model';
import { selectVisitDetail, selectVisitDetailError, selectVisitDetailLoading } from './state/visit.selectors';

@Component({
  selector: 'app-view-activity',
  imports: [RouterLink, AsyncPipe, DatePipe, CommonModule],
  templateUrl: './view-activity.html',
  styleUrl: './view-activity.css',
})
export class ViewActivity implements OnInit {
  private store = inject(Store);

  visitDetail$!: Observable<VisitDetailModel | null>;
  loading$!: Observable<boolean>;
  error$!: Observable<string | null>;

  ngOnInit(): void {
    this.visitDetail$ = this.store.select(selectVisitDetail);
    this.loading$ = this.store.select(selectVisitDetailLoading);
    this.error$ = this.store.select(selectVisitDetailError);
  }
}

