import { routerReducer, RouterReducerState } from '@ngrx/router-store';
import { CustomerEffect } from '../pages/customer/state/customer.effects';
import { customerReducer } from '../pages/customer/state/customer.reducer';
import { CustomerState } from '../pages/customer/state/customer.state';
import { PlannerEffect } from '../pages/planner/state/planner.effects';
import { plannerReducer } from '../pages/planner/state/planner.reducer';
import { PlannerState } from '../pages/planner/state/planner.state';

export interface AppState {
  customer: CustomerState;
  planner: PlannerState;
  router: RouterReducerState;
}

export const AppReducer = {
  customer: customerReducer,
  planner: plannerReducer,
  router: routerReducer,
};

export const AppEffect = [CustomerEffect, PlannerEffect];
