import { Component, inject, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { GeolocationService } from '../../core/services/geolocation.service';
import { AttendanceService } from '../attendance/services/attendance.service';
import { NgToastComponent, NgToastService, TOAST_POSITIONS } from 'ng-angular-popup';
import { Store } from '@ngrx/store';
import { AsyncPipe } from '@angular/common';
import { loadEmployee } from './state/employee.actions';
import { selectEmployee } from './state/employee.selectors';

@Component({
  selector: 'app-home',
  imports: [RouterLink, NgToastComponent, AsyncPipe],
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  TOAST_POSITIONS = TOAST_POSITIONS;

  private geoService = inject(GeolocationService);
  private attendanceService = inject(AttendanceService);
  private toast = inject(NgToastService);
  private store = inject(Store);

  private route = inject(ActivatedRoute);

  employee$ = this.store.select(selectEmployee);
  checkedIn = false;
  checkOutDone = false;

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      const employeeId = params['employee_id'];

      if (employeeId) {
        localStorage.setItem('employee_id', employeeId);
      }

      if (localStorage.getItem('employee_id')) {
        this.store.dispatch(loadEmployee());
      }
    });

    this.checkAndResetDailyStatus();
  }

  checkAndResetDailyStatus() {
    const today = new Date().toDateString();
    const savedDate = localStorage.getItem('attendanceDate');
    if (savedDate !== today) {
      localStorage.removeItem('checkedIn');
      localStorage.removeItem('checkOutDone');
      localStorage.setItem('attendanceDate', today);
      this.checkedIn = false;
      this.checkOutDone = false;
    } else {
      this.checkedIn = localStorage.getItem('checkedIn') === 'true';
      this.checkOutDone = localStorage.getItem('checkOutDone') === 'true';
    }
  }

  @HostListener('document:visibilitychange', [])
  onVisibilityChange() {
    if (document.visibilityState === 'visible') {
      this.checkAndResetDailyStatus();
    }
  }

  get greeting(): string {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return 'Good Morning';
    if (hour >= 12 && hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  }

  checkIn() {
    this.checkAndResetDailyStatus();
    this.toast.info('Loading...', 'Checking In');
    this.geoService.getCurrentPosition().subscribe({
      next: (coords) => {
        this.attendanceService.checkIn(coords.latitude, coords.longitude).subscribe({
          next: (res) => {
            if (+res.status === 200) {
              this.checkedIn = true;
              localStorage.setItem('checkedIn', 'true');
              this.toast.success(res.message || 'Checked In successfully!', 'Success');
            } else {
              this.toast.danger(res.message || 'Failed to Check In', 'Error');
            }
          },
          error: (err) => {
            this.toast.danger(
              err?.error?.message || err?.message || 'Failed to hit Check In API',
              'Error',
            );
          },
        });
      },
      error: (geoErr) => {
        this.toast.danger(geoErr || 'Could not retrieve GPS location', 'GPS Error');
      },
    });
  }

  checkOut() {
    this.checkAndResetDailyStatus();
    this.toast.info('Loading...', 'Checking Out');
    this.geoService.getCurrentPosition().subscribe({
      next: (coords) => {
        this.attendanceService.checkOut(coords.latitude, coords.longitude).subscribe({
          next: (res) => {
            if (+res.status === 200) {
              this.checkOutDone = true;
              localStorage.setItem('checkOutDone', 'true');
              this.toast.success(res.message || 'Checked Out successfully!', 'Success');
            } else {
              this.toast.danger(res.message || 'Failed to Check Out', 'Error');
            }
          },
          error: (err) => {
            this.toast.danger(
              err?.error?.message || err?.message || 'Failed to hit Check Out API',
              'Error',
            );
          },
        });
      },
      error: (geoErr) => {
        this.toast.danger(geoErr || 'Could not retrieve GPS location', 'GPS Error');
      },
    });
  }

  recentOrders = [
    {
      id: 'DEL-4810',
      from: 'Main Street Store',
      to: '123 Elite Street',
      date: 'Yesterday',
      amount: '$32.00',
    },
    {
      id: 'DEL-4805',
      from: 'City Center',
      to: '123 Elite Street',
      date: '2 days ago',
      amount: '$15.75',
    },
  ];
}
