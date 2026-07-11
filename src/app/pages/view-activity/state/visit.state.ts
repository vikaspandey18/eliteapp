import { VisitDetailModel } from '../../../models/visit-detail.model';

export interface VisitDetailState {
  visitdetail: VisitDetailModel | null;
  loading: boolean;
  error: string | null;
}

export const initialState: VisitDetailState = {
  visitdetail: null,
  loading: false,
  error: null,
};
