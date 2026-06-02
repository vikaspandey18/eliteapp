import { ApiResponse } from '../../../models/api.response.model';
import { PlannerModel } from '../../../models/planner.model';

export interface PlannerState {
  planner: ApiResponse<PlannerModel[]> | null;
  loading: boolean;
  error: string | null;
}

export const initialState: PlannerState = {
  planner: null,
  loading: false,
  error: null,
};
