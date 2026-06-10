export interface AttendanceRecord {
  date: string;
  day: string;
  status: 'present' | 'absent' | 'half-day' | 'holiday';
  checkIn: string;
  checkOut: string;
}
