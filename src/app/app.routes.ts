import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PlannerMenu } from './pages/planner/planner-menu/planner-menu';
import { PlannerComponent } from './pages/planner/planner.component';
import { AttendanceComponent } from './pages/attendance/attendance.component';
import { Customer } from './pages/customer/customer';
import { Visit } from './pages/visit/visit';
import { Collection } from './pages/collection/collection';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'planner/menu',
    component: PlannerMenu,
  },
  {
    path: 'planner',
    component: PlannerComponent,
  },
  {
    path: 'attendance',
    component: AttendanceComponent,
  },
  {
    path: 'customer',
    component: Customer,
  },
  {
    path: 'visit',
    component: Visit,
  },
  {
    path: 'collection',
    component: Collection,
  },
];
