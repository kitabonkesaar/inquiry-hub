export type UserRole = 'customer' | 'owner' | 'admin';

export type BusType = 'bus' | 'traveller';
export type BusCategory = 'ac' | 'non-ac';
export type BusLayout = '2x2 Sleeper' | '2x1 Sleeper' | '3x2 Seater' | '2x2 Seater' | 'Luxury Maharaja';
export type ListingStatus = 'approved' | 'pending' | 'rejected';
export type BookingStatus = 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled';
export type PaymentStatus = 'pending' | 'partial_paid' | 'paid' | 'refunded';
export type KYCStatus = 'verified' | 'pending' | 'action_required';

export interface MarketplaceBus {
  id: string;
  name: string;
  type: BusType;
  category: BusCategory;
  layout: BusLayout;
  seatingCapacity: number;
  pricePerDay: number;
  pricePerKm: number;
  minKmPerDay: number;
  driverAllowancePerDay: number;
  images: string[];
  rcDocumentUrl?: string;
  amenities: string[];
  description: string;
  rating: number;
  reviewCount: number;
  ownerId: string;
  ownerName: string;
  ownerPhone: string;
  registrationNumber: string;
  location: string;
  status: ListingStatus;
  blockedDates: string[]; // ISO YYYY-MM-DD
  createdAt: string;
}

export interface Booking {
  id: string;
  bookingNumber: string;
  busId: string;
  busName: string;
  busImage: string;
  ownerId: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  pickupLocation: string;
  dropLocation: string;
  startDate: string; // YYYY-MM-DD
  endDate: string; // YYYY-MM-DD
  durationDays: number; // 2 to 20 days
  passengers: number;
  dailyRate: number;
  totalAmount: number;
  advanceAmount: number; // ₹10,000 upfront
  balanceAmount: number; // Remainder
  platformCommission: number;
  ownerNetEarnings: number;
  paymentStatus: PaymentStatus;
  bookingStatus: BookingStatus;
  transactionId: string;
  paymentGateway: 'Razorpay' | 'Stripe';
  paymentMethod: 'UPI' | 'Card' | 'NetBanking';
  createdAt: string;
  cancellationReason?: string;
  disputeStatus?: 'none' | 'disputed' | 'refund_requested' | 'refunded';
  refundAmount?: number;
  hasReviewed?: boolean;
}

export interface Review {
  id: string;
  bookingId: string;
  busId: string;
  customerName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface OwnerKYC {
  ownerId: string;
  businessName: string;
  contactPerson: string;
  phone: string;
  email: string;
  gstNumber: string;
  rcBookNumber: string;
  bankAccountName: string;
  bankAccountNumber: string;
  bankIfsc: string;
  bankName: string;
  kycStatus: KYCStatus;
  submittedAt: string;
}

export interface PayoutRequest {
  id: string;
  ownerId: string;
  amount: number;
  status: 'Pending' | 'Completed' | 'Rejected';
  requestedAt: string;
  bankAccount: string;
}

export interface AppNotification {
  id: string;
  recipientRole: UserRole | 'all';
  title: string;
  message: string;
  type: 'booking' | 'payment' | 'kyc' | 'announcement' | 'dispute' | 'trip';
  channel: 'in_app' | 'sms' | 'email' | 'push';
  read: boolean;
  timestamp: string;
}

export interface ChatMessage {
  id: string;
  bookingId: string;
  senderRole: 'customer' | 'owner';
  senderName: string;
  text: string;
  timestamp: string;
}

export interface PlatformSettings {
  commissionType: 'percentage' | 'flat';
  commissionValue: number; // e.g. 10 for 10%, or 2000 for flat ₹2,000
  upfrontTokenAmount: number; // Default 10000
  minTripDays: number; // 2
  maxTripDays: number; // 20
}
