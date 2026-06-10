import { EmployeeModel } from '../../../models/employee.model';

export interface EmployeeState {
  employee: EmployeeModel | null;
  loading: boolean;
  error: string | null;
}

export const initialEmployeeState: EmployeeState = {
  employee: null,
  loading: false,
  error: null,
};
