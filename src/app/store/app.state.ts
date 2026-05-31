import { CustomerEffect } from '../pages/customer/state/customer.effects';
import { customerReducer } from '../pages/customer/state/customer.reducer';
import { CustomerState } from '../pages/customer/state/customer.state';

export interface AppState {
  customer: CustomerState;
}

export const AppReducer = {
  customer: customerReducer,
};

export const AppEffect = [CustomerEffect];
