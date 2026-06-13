import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../../models/api.response.model';
import { ActivityModel } from '../../../models/activity.model';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ActivityService {
  private http = inject(HttpClient);

  getAllActivity(): Observable<ApiResponse<ActivityModel[]>> {
    const url = `${environment.apiUrl}/activity/allactivity.php`;
    return this.http.get<ApiResponse<ActivityModel[]>>(url);
  }
}
