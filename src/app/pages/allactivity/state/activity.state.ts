import { ActivityModel } from '../../../models/activity.model';

export interface ActivityState {
  allactivity: ActivityModel[] | [];
  loading: boolean;
  error: string | null;
}

export const initialState: ActivityState = {
  allactivity: [],
  loading: false,
  error: null,
};


