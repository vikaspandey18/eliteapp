import { ApiResponse } from '../../../models/api.response.model';

export interface CollectionState {
  loading: boolean;
  error: string | null;
  success: boolean;
  response: ApiResponse<null> | null;
}

export const initialState: CollectionState = {
  loading: false,
  error: null,
  success: false,
  response: null,
};
