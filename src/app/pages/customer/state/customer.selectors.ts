import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CustomerState } from './customer.state';

export const selectCustomerState = createFeatureSelector<CustomerState>('customers');

export const selectCustomersResponse = createSelector(
  selectCustomerState,
  (state) => state.customers,
);

export const selectCustomers = createSelector(
  selectCustomerState,
  (state) => state.customers?.data ?? [],
);

export const selectCustomerMessage = createSelector(
  selectCustomerState,
  (state) => state.customers?.message ?? '',
);

export const selectCustomerStatusCode = createSelector(
  selectCustomerState,
  (state) => state.customers?.status ?? null,
);

export const selectCustomerLoading = createSelector(selectCustomerState, (state) => state.loading);

export const selectCustomerError = createSelector(selectCustomerState, (state) => {
  return state.error;
});
