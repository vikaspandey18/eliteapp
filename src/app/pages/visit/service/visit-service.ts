import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ApiResponse } from '../../../models/api.response.model';

@Injectable({
  providedIn: 'root',
})
export class VisitService {
  private http = inject(HttpClient);

  addVisit(formData: FormData): Observable<ApiResponse<null>> {
    const url = `${environment.apiUrl}/visit/addVisit.php`;
    return this.http.post<ApiResponse<null>>(url, formData);
  }
}
