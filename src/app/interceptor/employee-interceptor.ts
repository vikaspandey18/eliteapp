import { HttpInterceptorFn } from '@angular/common/http';

export const employeeInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req);
};
