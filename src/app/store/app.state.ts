import { routerReducer, RouterReducerState } from '@ngrx/router-store';
import { CustomerEffect } from '../pages/customer/state/customer.effects';
import { customerReducer } from '../pages/customer/state/customer.reducer';
import { CustomerState } from '../pages/customer/state/customer.state';
import { PlannerEffect } from '../pages/planner/state/planner.effects';
import { plannerReducer } from '../pages/planner/state/planner.reducer';
import { PlannerState } from '../pages/planner/state/planner.state';

import { VisitEffect } from '../pages/visit/state/visit.effects';
import { visitReducer } from '../pages/visit/state/visit.reducer';
import { VisitState } from '../pages/visit/state/visit.state';

import { CollectionEffect } from '../pages/collection/state/collection.effects';
import { collectionReducer } from '../pages/collection/state/collection.reducer';
import { CollectionState } from '../pages/collection/state/collection.state';
import { AttendanceState } from '../pages/attendance/state/attendance.state';
import { attendanceReducer } from '../pages/attendance/state/attendance.reducer';
import { AttendanceEffect } from '../pages/attendance/state/attendance.effects';

import { EmployeeState } from '../pages/home/state/employee.state';
import { employeeReducer } from '../pages/home/state/employee.reducer';
import { EmployeeEffect } from '../pages/home/state/employee.effects';
import { ActivityState } from '../pages/allactivity/state/activity.state';
import { activityReducer } from '../pages/allactivity/state/activity.reducer';
import { ActivityEffect } from '../pages/allactivity/state/activity.effects';
import { VisitDetailState } from '../pages/view-activity/state/visit.state';
import { visitDetailReducer } from '../pages/view-activity/state/visit.reducer';
import { VisitDetailEffect } from '../pages/view-activity/state/visit.effects';
import { CollectionDetailState } from '../pages/view-collection/state/collection-detail.state';
import { collectionDetailReducer } from '../pages/view-collection/state/collection-detail.reducer';
import { CollectionDetailEffect } from '../pages/view-collection/state/collection-detail.effects';

export interface AppState {
  customer: CustomerState;
  planner: PlannerState;
  visit: VisitState;
  collection: CollectionState;
  router: RouterReducerState;
  attendance: AttendanceState;
  employee: EmployeeState;
  activity: ActivityState;
  visitDetail: VisitDetailState;
  collectionDetail: CollectionDetailState;
}

export const AppReducer = {
  customer: customerReducer,
  planner: plannerReducer,
  visit: visitReducer,
  collection: collectionReducer,
  router: routerReducer,
  attendance: attendanceReducer,
  employee: employeeReducer,
  activity: activityReducer,
  visitDetail: visitDetailReducer,
  collectionDetail: collectionDetailReducer,
};

export const AppEffect = [
  CustomerEffect,
  PlannerEffect,
  VisitEffect,
  CollectionEffect,
  AttendanceEffect,
  EmployeeEffect,
  ActivityEffect,
  VisitDetailEffect,
  CollectionDetailEffect,
];
