import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../../models/api.response.model';
import { CustomerModel } from '../../../models/customer.model';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class Customer {
  private http = inject(HttpClient);

  getCustomer(): Observable<ApiResponse<CustomerModel[]>> {
    const url = `${environment.apiUrl}/customer/getCustomer.php`;
    return this.http.get<ApiResponse<CustomerModel[]>>(url);
  }

  addCustomerToPlanner(id: string): Observable<ApiResponse<null>> {
    const url = `${environment.apiUrl}/planner/addPlanner.php`;
    return this.http.post<ApiResponse<null>>(url, { customerId: id });
  }
}
