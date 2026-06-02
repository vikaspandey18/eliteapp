import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CustomerState } from './customer.state';

export const selectCustomerState = createFeatureSelector<CustomerState>('customer');

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

export const selectPlannerResponse = createSelector(
  selectCustomerState,
  (state) => state.plannerResponse,
);

export const selectPlannerMessage = createSelector(
  selectCustomerState,
  (state) => state.plannerResponse?.message ?? '',
);

export const selectPlannerStatus = createSelector(
  selectCustomerState,
  (state) => state.plannerResponse?.status ?? '',
);
