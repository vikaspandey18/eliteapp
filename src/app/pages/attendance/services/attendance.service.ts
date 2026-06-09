import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ApiResponse } from '../../../models/api.response.model';
import { AttendanceRecord } from '../../../models/attendance.model';

@Injectable({
  providedIn: 'root',
})
export class AttendanceService {
  private http = inject(HttpClient);

  checkIn(latitude: number, longitude: number): Observable<ApiResponse<any>> {
    const url = `${environment.apiUrl}/attendance/checkIn.php`;
    return this.http.post<ApiResponse<any>>(url, { latitude, longitude });
  }

  checkOut(latitude: number, longitude: number): Observable<ApiResponse<any>> {
    const url = `${environment.apiUrl}/attendance/checkOut.php`;
    return this.http.post<ApiResponse<any>>(url, { latitude, longitude });
  }

  getAttendanceReport(fromDate: string, toDate: string): Observable<ApiResponse<AttendanceRecord[]>> {
    const url = `${environment.apiUrl}/attendance/getAttendanceReport.php?fromDate=${fromDate}&toDate=${toDate}`;
    return this.http.get<ApiResponse<AttendanceRecord[]>>(url);
  }
}
