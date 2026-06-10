import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';

export const checkInGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const toast = inject(NgToastService);

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

  toast.danger('Please check in first to access this page!', 'Access Denied');
  router.navigate(['/']);
  return false;
};
