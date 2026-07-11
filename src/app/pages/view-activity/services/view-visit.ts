import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../../models/api.response.model';
import { VisitDetailModel } from '../../../models/visit-detail.model';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ViewVisit {
  private http = inject(HttpClient);

  getVisitDetail(id: string): Observable<ApiResponse<VisitDetailModel>> {
    const url = `${environment.apiUrl}/activity/visitDetail.php`;
    return this.http.post<ApiResponse<VisitDetailModel>>(url, { id });
  }
}
