import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PlannerMenu } from './pages/planner/planner-menu/planner-menu';
import { PlannerComponent } from './pages/planner/planner.component';
import { AttendanceComponent } from './pages/attendance/attendance.component';
import { Customer } from './pages/customer/customer';
import { Visit } from './pages/visit/visit';
import { Collection } from './pages/collection/collection';
import { checkInGuard } from './guards/check-in.guard';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'planner/menu/:id/:journery',
    component: PlannerMenu,
    canActivate: [checkInGuard],
  },
  {
    path: 'planner',
    component: PlannerComponent,
    canActivate: [checkInGuard],
  },
  {
    path: 'attendance',
    component: AttendanceComponent,
    canActivate: [checkInGuard],
  },
  {
    path: 'customer',
    component: Customer,
    canActivate: [checkInGuard],
  },
  {
    path: 'visit/:id/:journery',
    component: Visit,
    canActivate: [checkInGuard],
  },
  {
    path: 'collection/:id/:journery',
    component: Collection,
    canActivate: [checkInGuard],
  },
];
