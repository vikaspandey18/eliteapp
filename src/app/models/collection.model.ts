export interface CollectionPayload {
  customerId: string;
  journeryId?: string;
  amount: number;
  receiptNo: string;
  followUpDate: string;
  comment: string;
  latitude: number;
  longitude: number;
  photo?: string;
}
