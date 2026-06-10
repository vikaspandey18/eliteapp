import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AsyncPipe, DatePipe, JsonPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AttendanceService } from './services/attendance.service';
import { AttendanceRecord } from '../../models/attendance.model';
import { map, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { loadAttendanceStart } from './state/attendance.actions';
import {
  selectAttendance,
  selectErrorAttendance,
  selectLoadingAttendance,
} from './state/attendance.selectors';

@Component({
  selector: 'app-attendance',
  imports: [FormsModule, DatePipe, RouterLink, AsyncPipe],
  templateUrl: './attendance.component.html',
})
export class AttendanceComponent implements OnInit {
  private store = inject(Store);

  fromDate: string;
  toDate: string;

  records$!: Observable<AttendanceRecord[] | []>;
  loading$!: Observable<boolean>;
  error$!: Observable<string | null>;

  constructor() {
    const now = new Date();
    this.toDate = this.toDateString(now);
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(now.getDate() - 6);

    this.fromDate = this.toDateString(sevenDaysAgo);
  }

  ngOnInit() {
    this.store.dispatch(loadAttendanceStart({ fromDate: this.fromDate, toDate: this.toDate }));

    this.records$ = this.store.select(selectAttendance);
    this.loading$ = this.store.select(selectLoadingAttendance);
    this.error$ = this.store.select(selectErrorAttendance);
  }

  totalPresent$ = this.store
    .select(selectAttendance)
    .pipe(map((records) => records.filter((r) => r.status === 'present').length));

  totalAbsent$ = this.store
    .select(selectAttendance)
    .pipe(map((records) => records.filter((r) => r.status === 'absent').length));

  totalHalfDay$ = this.store
    .select(selectAttendance)
    .pipe(map((records) => records.filter((r) => r.status === 'half-day').length));

  totalHoliday$ = this.store
    .select(selectAttendance)
    .pipe(map((records) => records.filter((r) => r.status === 'holiday').length));

  private toDateString(d: Date): string {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
  }

  searchAttendance(): void {
    this.store.dispatch(
      loadAttendanceStart({
        fromDate: this.fromDate,
        toDate: this.toDate,
      }),
    );
  }
}
