import { ApiResponse } from '../../../models/api.response.model';
import { CustomerModel } from '../../../models/customer.model';

export interface CustomerState {
  customers: ApiResponse<CustomerModel[]> | null;
  loading: boolean;
  error: string | null;
}

export const initialState: CustomerState = {
  customers: null,
  loading: false,
  error: null,
};
