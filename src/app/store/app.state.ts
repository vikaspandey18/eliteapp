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

export interface AppState {
  customer: CustomerState;
  planner: PlannerState;
  visit: VisitState;
  collection: CollectionState;
  router: RouterReducerState;
}

export const AppReducer = {
  customer: customerReducer,
  planner: plannerReducer,
  visit: visitReducer,
  collection: collectionReducer,
  router: routerReducer,
};

export const AppEffect = [CustomerEffect, PlannerEffect, VisitEffect, CollectionEffect];
