import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { AttendanceService } from '../pages/attendance/services/attendance.service';
import { map, catchError, of } from 'rxjs';

export const checkInGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const toast = inject(NgToastService);
  const attendanceService = inject(AttendanceService);

  const employeeId = localStorage.getItem('employee_id');
  if (!employeeId) {
    toast.danger('Please check in first to access this page!', 'Access Denied');
    router.navigate(['/']);
    return false;
  }

  // Check and reset daily status if date has changed
  const today = new Date().toDateString();
  const savedDate = localStorage.getItem('attendanceDate');
  
  if (savedDate !== today) {
    localStorage.removeItem('checkedIn');
    localStorage.removeItem('checkOutDone');
    localStorage.setItem('attendanceDate', today);
  }

  const isCheckedIn = localStorage.getItem('checkedIn') === 'true';

  if (isCheckedIn) {
    return true;
  }

  // If local status is not checked in, check the backend
  return attendanceService.getCurrentAttendanceStatus().pipe(
    map((res) => {
      if (+res.status === 200 && res.data) {
        const checkedIn = !!res.data.checkedIn;
        const checkOutDone = !!res.data.checkOutDone;

        localStorage.setItem('checkedIn', checkedIn ? 'true' : 'false');
        localStorage.setItem('checkOutDone', checkOutDone ? 'true' : 'false');
        localStorage.setItem('attendanceDate', today);

        if (checkedIn) {
          return true;
        }
      }

      toast.danger('Please check in first to access this page!', 'Access Denied');
      router.navigate(['/']);
      return false;
    }),
    catchError(() => {
      toast.danger('Please check in first to access this page!', 'Access Denied');
      router.navigate(['/']);
      return of(false);
    })
  );
};
