
export type Language = 'en' | 'ar';
export type UserRole = 'customer' | 'agent';
export type InsuranceType = 'motor' | 'medical' | 'general';
export type InquiryStatus = 'pending' | 'active' | 'expired' | 'rejected';

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  idNumber: string;
}

export interface Policy {
  id: string;
  type: InsuranceType;
  provider: string;
  premium: number;
  expiryDate: string;
  status: InquiryStatus;
}

export interface Inquiry {
  id: string;
  customerName: string;
  type: InsuranceType;
  status: InquiryStatus;
  date: string;
  slaDays: number;
}
