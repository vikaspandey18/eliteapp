import { AttendanceRecord } from '../../../models/attendance.model';

export interface AttendanceState {
  attendance: AttendanceRecord[] | [];
  loading: boolean;
  error: string | null;
}

export const initialState: AttendanceState = {
  attendance: [],
  loading: false,
  error: null,
};
