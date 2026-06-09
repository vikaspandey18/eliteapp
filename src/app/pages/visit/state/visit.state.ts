import { ApiResponse } from '../../../models/api.response.model';

export interface VisitState {
  loading: boolean;
  error: string | null;
  success: boolean;
  response: ApiResponse<null> | null;
}

export const initialState: VisitState = {
  loading: false,
  error: null,
  success: false,
  response: null,
};
