import { HttpInterceptorFn } from '@angular/common/http';

export const employeeInterceptor: HttpInterceptorFn = (req, next) => {
  // return next(req);

  const employeeId = localStorage.getItem('employee_id');

  if (!employeeId) {
    return next(req);
  }

  return next(
    req.clone({
      setHeaders: {
        'X-Employee-Id': employeeId,
      },
    }),
  );
};
