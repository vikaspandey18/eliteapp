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
