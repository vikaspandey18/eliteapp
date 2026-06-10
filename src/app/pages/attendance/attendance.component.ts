import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AttendanceService } from './services/attendance.service';
import { AttendanceRecord } from '../../models/attendance.model';

@Component({
  selector: 'app-attendance',
  imports: [FormsModule, DatePipe, RouterLink],
  templateUrl: './attendance.component.html',
})
export class AttendanceComponent implements OnInit {
  private attendanceService = inject(AttendanceService);

  fromDate: string;
  toDate: string;

  records: AttendanceRecord[] = [];
  loading = false;
  error: string | null = null;

  constructor() {
    const now = new Date();
    this.toDate = this.toDateString(now);
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(now.getDate() - 6);

    this.fromDate = this.toDateString(sevenDaysAgo);
  }

  ngOnInit() {
    this.fetchAttendance();
  }

  fetchAttendance() {
    this.loading = true;
    this.error = null;
    this.attendanceService.getAttendanceReport(this.fromDate, this.toDate).subscribe({
      next: (res) => {
        if (+res.status === 200) {
          this.records = res.data || [];
        } else {
          this.error = res.message || 'Failed to fetch attendance report';
        }
        this.loading = false;
      },
      error: (err) => {
        this.error = err?.error?.message || err?.message || 'Error loading attendance report';
        this.loading = false;
      },
    });
  }

  get totalPresent(): number {
    return this.records.filter((r) => r.status === 'present').length;
  }

  get totalAbsent(): number {
    return this.records.filter((r) => r.status === 'absent').length;
  }

  get totalHalfDay(): number {
    return this.records.filter((r) => r.status === 'half-day').length;
  }

  private toDateString(d: Date): string {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
  }
}
