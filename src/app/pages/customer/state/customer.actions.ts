import { createAction, props } from '@ngrx/store';
import { ApiResponse } from '../../../models/api.response.model';
import { CustomerModel } from '../../../models/customer.model';

export const loadCustomers = createAction('[customer] fetch start');

export const loadCustomersSuccess = createAction(
  '[customer] fetch success',
  props<{ customers: ApiResponse<CustomerModel[]> }>(),
);

export const loadCustomersFailure = createAction(
  '[Customer] Load Customers Failure',
  props<{ error: string }>(),
);

// Add Planner
export const addCustomerPlanner = createAction(
  '[Customer] Add Planner',
  props<{ customerId: string }>(),
);

export const addCustomerPlannerSuccess = createAction(
  '[Customer] Add Planner Success',
  props<{ response: ApiResponse<null> }>(),
);

export const addCustomerPlannerFailure = createAction(
  '[Customer] Add Planner Failure',
  props<{ error: string }>(),
);
