import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

interface AttendanceRecord {
  date: string;
  day: string;
  status: 'present' | 'absent' | 'half-day';
  checkIn: string;
  checkOut: string;
}

@Component({
  selector: 'app-attendance',
  imports: [FormsModule, DatePipe, RouterLink],
  templateUrl: './attendance.component.html',
})
export class AttendanceComponent {
  fromDate: string;
  toDate: string;

  records: AttendanceRecord[] = [
    {
      date: '2026-05-27',
      day: 'Wednesday',
      status: 'present',
      checkIn: '09:15 AM',
      checkOut: '06:10 PM',
    },
    {
      date: '2026-05-26',
      day: 'Tuesday',
      status: 'present',
      checkIn: '08:55 AM',
      checkOut: '05:45 PM',
    },
    {
      date: '2026-05-25',
      day: 'Monday',
      status: 'present',
      checkIn: '09:00 AM',
      checkOut: '06:00 PM',
    },
    { date: '2026-05-24', day: 'Sunday', status: 'absent', checkIn: '-', checkOut: '-' },
    {
      date: '2026-05-23',
      day: 'Saturday',
      status: 'half-day',
      checkIn: '10:00 AM',
      checkOut: '02:00 PM',
    },
    {
      date: '2026-05-22',
      day: 'Friday',
      status: 'present',
      checkIn: '08:45 AM',
      checkOut: '05:30 PM',
    },
    {
      date: '2026-05-21',
      day: 'Thursday',
      status: 'present',
      checkIn: '09:10 AM',
      checkOut: '06:15 PM',
    },
    {
      date: '2026-05-20',
      day: 'Wednesday',
      status: 'present',
      checkIn: '08:50 AM',
      checkOut: '05:55 PM',
    },
    {
      date: '2026-05-19',
      day: 'Tuesday',
      status: 'present',
      checkIn: '09:05 AM',
      checkOut: '06:05 PM',
    },
    {
      date: '2026-05-18',
      day: 'Monday',
      status: 'present',
      checkIn: '09:00 AM',
      checkOut: '06:00 PM',
    },
    { date: '2026-05-17', day: 'Sunday', status: 'absent', checkIn: '-', checkOut: '-' },
    { date: '2026-05-16', day: 'Saturday', status: 'absent', checkIn: '-', checkOut: '-' },
    {
      date: '2026-05-15',
      day: 'Friday',
      status: 'present',
      checkIn: '08:55 AM',
      checkOut: '05:40 PM',
    },
    {
      date: '2026-05-14',
      day: 'Thursday',
      status: 'present',
      checkIn: '09:20 AM',
      checkOut: '06:20 PM',
    },
    {
      date: '2026-05-13',
      day: 'Wednesday',
      status: 'half-day',
      checkIn: '09:30 AM',
      checkOut: '01:00 PM',
    },
    {
      date: '2026-05-12',
      day: 'Tuesday',
      status: 'present',
      checkIn: '08:40 AM',
      checkOut: '06:10 PM',
    },
    {
      date: '2026-05-11',
      day: 'Monday',
      status: 'present',
      checkIn: '09:00 AM',
      checkOut: '06:00 PM',
    },
    { date: '2026-05-10', day: 'Sunday', status: 'absent', checkIn: '-', checkOut: '-' },
    { date: '2026-05-09', day: 'Saturday', status: 'absent', checkIn: '-', checkOut: '-' },
    {
      date: '2026-05-08',
      day: 'Friday',
      status: 'present',
      checkIn: '09:15 AM',
      checkOut: '05:50 PM',
    },
    {
      date: '2026-05-07',
      day: 'Thursday',
      status: 'present',
      checkIn: '08:50 AM',
      checkOut: '06:00 PM',
    },
    {
      date: '2026-05-06',
      day: 'Wednesday',
      status: 'present',
      checkIn: '09:05 AM',
      checkOut: '06:15 PM',
    },
    {
      date: '2026-05-05',
      day: 'Tuesday',
      status: 'present',
      checkIn: '09:10 AM',
      checkOut: '05:45 PM',
    },
    {
      date: '2026-05-04',
      day: 'Monday',
      status: 'present',
      checkIn: '08:55 AM',
      checkOut: '06:05 PM',
    },
    { date: '2026-05-03', day: 'Sunday', status: 'absent', checkIn: '-', checkOut: '-' },
    { date: '2026-05-02', day: 'Saturday', status: 'absent', checkIn: '-', checkOut: '-' },
    {
      date: '2026-05-01',
      day: 'Friday',
      status: 'present',
      checkIn: '09:00 AM',
      checkOut: '06:00 PM',
    },
    {
      date: '2026-04-30',
      day: 'Thursday',
      status: 'present',
      checkIn: '08:45 AM',
      checkOut: '05:55 PM',
    },
    {
      date: '2026-04-29',
      day: 'Wednesday',
      status: 'present',
      checkIn: '09:20 AM',
      checkOut: '06:10 PM',
    },
    {
      date: '2026-04-28',
      day: 'Tuesday',
      status: 'present',
      checkIn: '09:00 AM',
      checkOut: '06:00 PM',
    },
  ];

  constructor() {
    const now = new Date();
    this.toDate = this.toDateString(now);
    const oneMonthAgo = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
    this.fromDate = this.toDateString(oneMonthAgo);
  }

  get filteredRecords(): AttendanceRecord[] {
    return this.records.filter((r) => r.date >= this.fromDate && r.date <= this.toDate);
  }

  get totalPresent(): number {
    return this.filteredRecords.filter((r) => r.status === 'present').length;
  }

  get totalAbsent(): number {
    return this.filteredRecords.filter((r) => r.status === 'absent').length;
  }

  get totalHalfDay(): number {
    return this.filteredRecords.filter((r) => r.status === 'half-day').length;
  }

  private toDateString(d: Date): string {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
  }
}
