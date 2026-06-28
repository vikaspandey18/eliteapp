import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../../models/api.response.model';
import { CollectionDetailModel } from '../../../models/collection-detail.model';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ViewCollectionService {
  private http = inject(HttpClient);

  getCollectionDetail(id: string): Observable<ApiResponse<CollectionDetailModel>> {
    const url = `${environment.apiUrl}/collection/collectionDetail.php`;
    return this.http.post<ApiResponse<CollectionDetailModel>>(url, { id });
  }
}
