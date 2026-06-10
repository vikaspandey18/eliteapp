import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ApiResponse } from '../../../models/api.response.model';

@Injectable({
  providedIn: 'root',
})
export class CollectionService {
  private http = inject(HttpClient);

  addCollection(formData: FormData): Observable<ApiResponse<null>> {
    const url = `${environment.apiUrl}/collection/addCollection.php`;
    return this.http.post<ApiResponse<null>>(url, formData);
  }
}
