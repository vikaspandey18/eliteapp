export interface AttendanceRecord {
  date: string;
  day: string;
  status: 'present' | 'absent' | 'half-day';
  checkIn: string;
  checkOut: string;
}
