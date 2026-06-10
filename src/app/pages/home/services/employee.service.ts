import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../../models/api.response.model';
import { EmployeeModel } from '../../../models/employee.model';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private http = inject(HttpClient);

  getEmployee(): Observable<ApiResponse<EmployeeModel>> {
    const url = `${environment.apiUrl}/user/getCurrentUser.php`;
    return this.http.get<ApiResponse<EmployeeModel>>(url);
  }
}
