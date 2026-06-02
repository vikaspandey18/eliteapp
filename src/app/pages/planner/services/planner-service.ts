import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../../models/api.response.model';
import { PlannerModel } from '../../../models/planner.model';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PlannerService {
  private http = inject(HttpClient);

  fetchTodayPlanner(): Observable<ApiResponse<PlannerModel[]>> {
    const url = `${environment.apiUrl}/planner/todayPlanner.php`;
    return this.http.get<ApiResponse<PlannerModel[]>>(url);
  }
}
