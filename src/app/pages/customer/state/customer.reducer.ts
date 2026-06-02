import { createReducer, on } from '@ngrx/store';
import { initialState } from './customer.state';
import {
  addCustomerPlanner,
  addCustomerPlannerFailure,
  addCustomerPlannerSuccess,
  loadCustomers,
  loadCustomersFailure,
  loadCustomersSuccess,
} from './customer.actions';

export const customerReducer = createReducer(
  initialState,
  on(loadCustomers, (state, action) => {
    return {
      ...state,
      loading: true,
      error: null,
    };
  }),
  on(loadCustomersSuccess, (state, action) => {
    return {
      ...state,
      loading: false,
      customers: action.customers,
    };
  }),
  on(loadCustomersFailure, (state, action) => {
    return {
      ...state,
      loading: false,
      error: action.error,
    };
  }),

  // Add Planner
  on(addCustomerPlanner, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(addCustomerPlannerSuccess, (state, { response }) => ({
    ...state,
    loading: false,
    plannerResponse: response,
  })),

  on(addCustomerPlannerFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
);
