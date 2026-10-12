import {
  MarketplaceBus,
  Booking,
  OwnerKYC,
  PayoutRequest,
  AppNotification,
  ChatMessage,
  Review,
  PlatformSettings,
  UserRole,
} from '@/types/marketplace';
import bus1 from '@/assets/bus-1.jpg';
import bus2 from '@/assets/bus-2.jpg';
import traveller1 from '@/assets/traveller-1.jpg';
import heroBus from '@/assets/hero-bus.jpg';

// Initial pre-seeded buses
const INITIAL_BUSES: MarketplaceBus[] = [
  {
    id: 'bus-1',
    name: 'Volvo 9600 Multi-Axle Luxury Sleeper',
    type: 'bus',
    category: 'ac',
    layout: '2x2 Sleeper',
    seatingCapacity: 40,
    pricePerDay: 22000,
    pricePerKm: 52,
    minKmPerDay: 300,
    driverAllowancePerDay: 700,
    images: [
      heroBus,
      bus1,
      'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=80',
    ],
    amenities: [
      'Central Air Conditioning',
      'Individual Reading Lights',
      'USB & Type-C Charging Ports',
      'High-Speed Wi-Fi',
      'Fresh Blankets & Pillows',
      'GPS Live Tracking',
      'First Aid Kit',
      'Water Bottles',
    ],
    description:
      'The pinnacle of interstate luxury travel. Volvo 9600 features air suspension, whisper-quiet cabin acoustics, wide berth sleeper pods, and dedicated luggage bay.',
    rating: 4.9,
    reviewCount: 38,
    ownerId: 'owner-1',
    ownerName: 'Kalinga Express Lines',
    ownerPhone: '+91 94370 12345',
    registrationNumber: 'OD-02-CB-9090',
    location: 'Bhubaneswar, Odisha',
    status: 'approved',
    blockedDates: ['2026-10-18', '2026-10-19', '2026-10-20'],
    createdAt: '2026-01-10T10:00:00Z',
  },
  {
    id: 'bus-2',
    name: 'BharatBenz Glider AC Push-Back Executive',
    type: 'bus',
    category: 'ac',
    layout: '2x2 Seater',
    seatingCapacity: 45,
    pricePerDay: 18000,
    pricePerKm: 44,
    minKmPerDay: 250,
    driverAllowancePerDay: 600,
    images: [
      bus2,
      heroBus,
      'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=1200&q=80',
    ],
    amenities: [
      'High Cooling AC',
      'Push-Back Ergonomic Seats',
      'Twin LED Entertainment Screens',
      'Public Address PA System',
      'Emergency Exit Doors',
      'Large Luggage Boot',
    ],
    description:
      'Top choice for corporate retreats, wedding parties, and interstate educational tours with deep plush seating and premium climate control.',
    rating: 4.8,
    reviewCount: 24,
    ownerId: 'owner-1',
    ownerName: 'Kalinga Express Lines',
    ownerPhone: '+91 94370 12345',
    registrationNumber: 'OD-02-AK-4411',
    location: 'Cuttack, Odisha',
    status: 'approved',
    blockedDates: ['2026-10-25', '2026-10-26'],
    createdAt: '2026-01-12T11:00:00Z',
  },
  {
    id: 'bus-3',
    name: 'Force Urbania Premium 17 Seater Cruiser',
    type: 'traveller',
    category: 'ac',
    layout: '2x1 Sleeper',
    seatingCapacity: 17,
    pricePerDay: 9500,
    pricePerKm: 28,
    minKmPerDay: 250,
    driverAllowancePerDay: 500,
    images: [
      traveller1,
      'https://images.unsplash.com/photo-1494515843206-f3117d3f51b7?auto=format&fit=crop&w=1200&q=80',
    ],
    amenities: [
      'Individual AC Vents',
      'Reclining Captain Chairs',
      'High Roof Walk-through Cabin',
      'Surround Sound Bluetooth Audio',
      'Mobile Fast Charging',
    ],
    description:
      'Ultra-modern European styling, panoramic windows, and smooth independent front suspension designed for VIP family journeys and hill stations.',
    rating: 4.95,
    reviewCount: 42,
    ownerId: 'owner-2',
    ownerName: 'Utkal Royal Travels',
    ownerPhone: '+91 98610 88776',
    registrationNumber: 'OD-33-M-1008',
    location: 'Puri / Bhubaneswar',
    status: 'approved',
    blockedDates: [],
    createdAt: '2026-01-14T08:30:00Z',
  },
  {
    id: 'bus-4',
    name: 'Scania Metrolink Multi-Axle Royal Coach',
    type: 'bus',
    category: 'ac',
    layout: 'Luxury Maharaja',
    seatingCapacity: 36,
    pricePerDay: 26000,
    pricePerKm: 60,
    minKmPerDay: 300,
    driverAllowancePerDay: 800,
    images: [
      bus1,
      heroBus,
      'https://images.unsplash.com/photo-1509749837427-ac94a2553d0e?auto=format&fit=crop&w=1200&q=80',
    ],
    amenities: [
      'Maharaja Reclining Seats with Leg Rests',
      'Onboard Washroom',
      'Wi-Fi & OTT Streaming',
      'Mini Refrigerator & Pantry',
      'Silent Cabin Suspension',
    ],
    description:
      'The crown jewel of commercial coaches featuring an onboard lavatory, spacious leather loungers, and ultra-smooth ride dynamics for VIP delegation tours.',
    rating: 5.0,
    reviewCount: 19,
    ownerId: 'owner-1',
    ownerName: 'Kalinga Express Lines',
    ownerPhone: '+91 94370 12345',
    registrationNumber: 'OD-02-ZZ-7777',
    location: 'Bhubaneswar, Odisha',
    status: 'approved',
    blockedDates: ['2026-11-01', '2026-11-02', '2026-11-03'],
    createdAt: '2026-01-15T09:00:00Z',
  },
  {
    id: 'bus-5',
    name: 'Tata Starbus Ultra 32 Seater Deluxe',
    type: 'bus',
    category: 'ac',
    layout: '3x2 Seater',
    seatingCapacity: 32,
    pricePerDay: 13500,
    pricePerKm: 38,
    minKmPerDay: 250,
    driverAllowancePerDay: 500,
    images: [
      bus2,
      'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=80',
    ],
    amenities: [
      'AC Ventilation',
      'High-Back Cushion Seats',
      'Emergency Kit & Fire Extinguisher',
      'Spacious Aisle',
      'Luggage Racks',
    ],
    description:
      'Reliable, spacious, and fuel-efficient option for school excursions, sports team tours, and local temple circuits across Eastern India.',
    rating: 4.7,
    reviewCount: 15,
    ownerId: 'owner-3',
    ownerName: 'Mayurbhanj Heritage Fleet',
    ownerPhone: '+91 94372 99881',
    registrationNumber: 'OD-11-A-3322',
    location: 'Balasore, Odisha',
    status: 'pending',
    blockedDates: [],
    createdAt: '2026-01-18T14:20:00Z',
  },
];

const INITIAL_BOOKINGS: Booking[] = [
  {
    id: 'book-101',
    bookingNumber: 'RAB-2026-8901',
    busId: 'bus-1',
    busName: 'Volvo 9600 Multi-Axle Luxury Sleeper',
    busImage: heroBus,
    ownerId: 'owner-1',
    customerName: 'Rahul Mohapatra',
    customerPhone: '+91 98531 22334',
    customerEmail: 'rahul.m@example.com',
    pickupLocation: 'Bhubaneswar Airport (BBI)',
    dropLocation: 'Varanasi Ghats & Return',
    startDate: '2026-10-18',
    endDate: '2026-10-22',
    durationDays: 5,
    passengers: 36,
    dailyRate: 22000,
    totalAmount: 110000,
    advanceAmount: 10000, // ₹10,000 partial upfront
    balanceAmount: 100000,
    platformCommission: 11000, // 10%
    ownerNetEarnings: 99000,
    paymentStatus: 'partial_paid',
    bookingStatus: 'Confirmed',
    transactionId: 'pay_RZP_904423812',
    paymentGateway: 'Razorpay',
    paymentMethod: 'UPI',
    createdAt: '2026-10-10T14:30:00Z',
    hasReviewed: false,
  },
  {
    id: 'book-102',
    bookingNumber: 'RAB-2026-8902',
    busId: 'bus-3',
    busName: 'Force Urbania Premium 17 Seater Cruiser',
    busImage: traveller1,
    ownerId: 'owner-2',
    customerName: 'Ananya Pattnaik',
    customerPhone: '+91 94371 55667',
    customerEmail: 'ananya.p@example.com',
    pickupLocation: 'Cuttack Railway Station',
    dropLocation: 'Similipal National Park (Eco Tour)',
    startDate: '2026-10-02',
    endDate: '2026-10-05',
    durationDays: 4,
    passengers: 14,
    dailyRate: 9500,
    totalAmount: 38000,
    advanceAmount: 10000,
    balanceAmount: 28000,
    platformCommission: 3800,
    ownerNetEarnings: 34200,
    paymentStatus: 'paid',
    bookingStatus: 'Completed',
    transactionId: 'pay_RZP_782294101',
    paymentGateway: 'Razorpay',
    paymentMethod: 'Card',
    createdAt: '2026-09-25T11:00:00Z',
    hasReviewed: true,
  },
  {
    id: 'book-103',
    bookingNumber: 'RAB-2026-8903',
    busId: 'bus-2',
    busName: 'BharatBenz Glider AC Push-Back Executive',
    busImage: bus2,
    ownerId: 'owner-1',
    customerName: 'Vikram Das',
    customerPhone: '+91 97760 33445',
    customerEmail: 'vikram.das@example.com',
    pickupLocation: 'KIIT Square, Bhubaneswar',
    dropLocation: 'Puri Beach Wedding Resort',
    startDate: '2026-10-25',
    endDate: '2026-10-27',
    durationDays: 3,
    passengers: 42,
    dailyRate: 18000,
    totalAmount: 54000,
    advanceAmount: 10000,
    balanceAmount: 44000,
    platformCommission: 5400,
    ownerNetEarnings: 48600,
    paymentStatus: 'partial_paid',
    bookingStatus: 'Pending',
    transactionId: 'pay_RZP_881920334',
    paymentGateway: 'Razorpay',
    paymentMethod: 'UPI',
    createdAt: '2026-10-12T18:15:00Z',
    hasReviewed: false,
  },
];

const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    bookingId: 'book-102',
    busId: 'bus-3',
    customerName: 'Ananya Pattnaik',
    rating: 5,
    comment:
      'Exceptional experience! The Force Urbania was sparkling clean, AC worked flawlessly in October heat, and the captain was very courteous.',
    createdAt: '2026-10-06T12:00:00Z',
  },
  {
    id: 'rev-2',
    bookingId: 'book-past-1',
    busId: 'bus-1',
    customerName: 'Debabrata Rout',
    rating: 5,
    comment:
      'Booked the Volvo for our college reunion trip to Vizag. The sleeper berths are wider than train berths! ₹10,000 upfront booking was very convenient.',
    createdAt: '2026-09-18T10:00:00Z',
  },
];

const INITIAL_KYC: Record<string, OwnerKYC> = {
  'owner-1': {
    ownerId: 'owner-1',
    businessName: 'Kalinga Express Lines Pvt Ltd',
    contactPerson: 'Sanjay Kumar Jena',
    phone: '+91 94370 12345',
    email: 'kalinga.express@rentanybus.in',
    gstNumber: '21AAACK1928N1Z5',
    rcBookNumber: 'OD02CB9090-RC-2024',
    bankAccountName: 'Kalinga Express Lines Pvt Ltd',
    bankAccountNumber: '912020045612348',
    bankIfsc: 'HDFC0000543',
    bankName: 'HDFC Bank, Saheed Nagar Branch',
    kycStatus: 'verified',
    submittedAt: '2026-01-05T09:00:00Z',
  },
  'owner-2': {
    ownerId: 'owner-2',
    businessName: 'Utkal Royal Travels',
    contactPerson: 'Pritam Samal',
    phone: '+91 98610 88776',
    email: 'utkal.royal@rentanybus.in',
    gstNumber: '21BBBUR4432K1Z9',
    rcBookNumber: 'OD33M1008-RC-2023',
    bankAccountName: 'Utkal Royal Travels',
    bankAccountNumber: '4099101004567',
    bankIfsc: 'SBIN0001023',
    bankName: 'State Bank of India, Puri Main',
    kycStatus: 'verified',
    submittedAt: '2026-01-08T11:30:00Z',
  },
  'owner-3': {
    ownerId: 'owner-3',
    businessName: 'Mayurbhanj Heritage Fleet',
    contactPerson: 'Bikash Mohanty',
    phone: '+91 94372 99881',
    email: 'bikash.m@example.com',
    gstNumber: '21CCCMH9988L2Z1',
    rcBookNumber: 'OD11A3322-RC-2025',
    bankAccountName: 'Mayurbhanj Heritage Fleet',
    bankAccountNumber: '50100445566778',
    bankIfsc: 'ICIC0001928',
    bankName: 'ICICI Bank, Balasore',
    kycStatus: 'pending',
    submittedAt: '2026-10-11T16:00:00Z',
  },
};

const INITIAL_NOTIFICATIONS: AppNotification[] = [
  {
    id: 'notif-1',
    recipientRole: 'customer',
    title: 'Booking Confirmed (RAB-2026-8901)',
    message:
      'Your Volvo 9600 booking for 5 days trip to Varanasi is confirmed. Advance token ₹10,000 received successfully.',
    type: 'booking',
    channel: 'sms',
    read: false,
    timestamp: '2026-10-10T14:32:00Z',
  },
  {
    id: 'notif-2',
    recipientRole: 'owner',
    title: 'New Booking Request #RAB-2026-8903',
    message:
      'Vikram Das has requested BharatBenz Glider for 3 days trip to Puri. Action required: Accept or Reject.',
    type: 'booking',
    channel: 'in_app',
    read: false,
    timestamp: '2026-10-12T18:16:00Z',
  },
  {
    id: 'notif-3',
    recipientRole: 'admin',
    title: 'New Owner KYC & Bus Submitted',
    message:
      'Mayurbhanj Heritage Fleet submitted "Tata Starbus Ultra" for marketplace review.',
    type: 'kyc',
    channel: 'in_app',
    read: false,
    timestamp: '2026-10-11T16:05:00Z',
  },
  {
    id: 'notif-4',
    recipientRole: 'all',
    title: 'Diwali Festive Tour Special!',
    message:
      'Flat 10% cash-back on interstate group travel bookings completed before Nov 15.',
    type: 'announcement',
    channel: 'push',
    read: true,
    timestamp: '2026-10-01T08:00:00Z',
  },
];

const INITIAL_CHATS: ChatMessage[] = [
  {
    id: 'chat-1',
    bookingId: 'book-101',
    senderRole: 'customer',
    senderName: 'Rahul Mohapatra',
    text: 'Hello Sanjay ji, can the bus reach Airport Terminal 2 parking by 6:00 AM on Oct 18?',
    timestamp: '2026-10-11T09:15:00Z',
  },
  {
    id: 'chat-2',
    bookingId: 'book-101',
    senderRole: 'owner',
    senderName: 'Kalinga Express Lines',
    text: 'Namaste Rahul ji! Absolutely, our captain and co-driver will be stationed at Terminal 2 coach parking by 5:30 AM with luggage assistance.',
    timestamp: '2026-10-11T09:22:00Z',
  },
  {
    id: 'chat-3',
    bookingId: 'book-103',
    senderRole: 'customer',
    senderName: 'Vikram Das',
    text: 'Hi, we will have 42 passengers with wedding attire. Is there adequate hanging space and luggage room?',
    timestamp: '2026-10-12T18:30:00Z',
  },
];

const INITIAL_SETTINGS: PlatformSettings = {
  commissionType: 'percentage',
  commissionValue: 10, // 10%
  upfrontTokenAmount: 10000,
  minTripDays: 2,
  maxTripDays: 20,
};

// LocalStorage Keys
const KEYS = {
  BUSES: 'rab_marketplace_buses_v1',
  BOOKINGS: 'rab_marketplace_bookings_v1',
  REVIEWS: 'rab_marketplace_reviews_v1',
  KYC: 'rab_marketplace_kyc_v1',
  PAYOUTS: 'rab_marketplace_payouts_v1',
  NOTIFICATIONS: 'rab_marketplace_notifs_v1',
  CHATS: 'rab_marketplace_chats_v1',
  SETTINGS: 'rab_marketplace_settings_v1',
  ROLE: 'rab_active_user_role_v1',
};

function getStorage<T>(key: string, fallback: T): T {
  try {
    const val = localStorage.getItem(key);
    if (!val) return fallback;
    return JSON.parse(val) as T;
  } catch (e) {
    return fallback;
  }
}

function setStorage<T>(key: string, val: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(val));
  } catch (e) {
    console.error('Failed to write storage key:', key, e);
  }
}

// Subscriptions for real-time reactivity
type Listener = () => void;
const listeners: Set<Listener> = new Set();

function emitChange() {
  listeners.forEach((l) => {
    try {
      l();
    } catch (err) {
      console.error(err);
    }
  });
}

export const marketplaceStore = {
  subscribe(listener: Listener) {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },

  // Active Role
  getActiveRole(): UserRole {
    return getStorage<UserRole>(KEYS.ROLE, 'customer');
  },
  setActiveRole(role: UserRole) {
    setStorage(KEYS.ROLE, role);
    emitChange();
  },

  // Settings
  getSettings(): PlatformSettings {
    return getStorage<PlatformSettings>(KEYS.SETTINGS, INITIAL_SETTINGS);
  },
  updateSettings(settings: Partial<PlatformSettings>) {
    const current = this.getSettings();
    const updated = { ...current, ...settings };
    setStorage(KEYS.SETTINGS, updated);
    emitChange();
    return updated;
  },

  // Buses
  getBuses(): MarketplaceBus[] {
    return getStorage<MarketplaceBus[]>(KEYS.BUSES, INITIAL_BUSES);
  },
  getApprovedBuses(): MarketplaceBus[] {
    return this.getBuses().filter((b) => b.status === 'approved');
  },
  getBusById(id: string): MarketplaceBus | undefined {
    return this.getBuses().find((b) => b.id === id);
  },
  getOwnerBuses(ownerId = 'owner-1'): MarketplaceBus[] {
    return this.getBuses().filter((b) => b.ownerId === ownerId);
  },
  addBus(busData: Omit<MarketplaceBus, 'id' | 'createdAt' | 'status' | 'rating' | 'reviewCount'>): MarketplaceBus {
    const buses = this.getBuses();
    const newBus: MarketplaceBus = {
      ...busData,
      id: `bus-${Date.now()}`,
      status: 'pending', // Requires admin review
      rating: 5.0,
      reviewCount: 0,
      createdAt: new Date().toISOString(),
    };
    buses.unshift(newBus);
    setStorage(KEYS.BUSES, buses);

    // Notify Admin
    this.addNotification({
      recipientRole: 'admin',
      title: 'New Bus Listed for Approval',
      message: `${newBus.ownerName} submitted "${newBus.name}" (${newBus.registrationNumber}) for review.`,
      type: 'kyc',
      channel: 'in_app',
    });

    emitChange();
    return newBus;
  },
  updateBusStatus(busId: string, status: 'approved' | 'rejected'): MarketplaceBus | null {
    const buses = this.getBuses();
    const idx = buses.findIndex((b) => b.id === busId);
    if (idx === -1) return null;
    buses[idx].status = status;
    setStorage(KEYS.BUSES, buses);

    this.addNotification({
      recipientRole: 'owner',
      title: status === 'approved' ? 'Bus Listing Approved!' : 'Bus Listing Declined',
      message: `Your bus "${buses[idx].name}" has been ${status === 'approved' ? 'approved and is now LIVE for customers to rent' : 'declined by administrators'}.`,
      type: 'kyc',
      channel: 'in_app',
    });

    emitChange();
    return buses[idx];
  },
  updateBus(busId: string, updates: Partial<MarketplaceBus>): MarketplaceBus | null {
    const buses = this.getBuses();
    const idx = buses.findIndex((b) => b.id === busId);
    if (idx === -1) return null;
    buses[idx] = { ...buses[idx], ...updates };
    setStorage(KEYS.BUSES, buses);
    emitChange();
    return buses[idx];
  },

  // Bookings
  getBookings(): Booking[] {
    return getStorage<Booking[]>(KEYS.BOOKINGS, INITIAL_BOOKINGS);
  },
  getCustomerBookings(customerPhone?: string): Booking[] {
    const all = this.getBookings();
    if (!customerPhone) return all;
    return all.filter((b) => b.customerPhone === customerPhone);
  },
  getOwnerBookings(ownerId = 'owner-1'): Booking[] {
    return this.getBookings().filter((b) => b.ownerId === ownerId);
  },
  getBookingById(id: string): Booking | undefined {
    return this.getBookings().find((b) => b.id === id);
  },
  createBooking(params: {
    busId: string;
    customerName: string;
    customerPhone: string;
    customerEmail: string;
    pickupLocation: string;
    dropLocation: string;
    startDate: string;
    endDate: string;
    durationDays: number;
    passengers: number;
    paymentMethod: 'UPI' | 'Card' | 'NetBanking';
    paymentGateway: 'Razorpay' | 'Stripe';
  }): Booking {
    const bus = this.getBusById(params.busId);
    if (!bus) throw new Error('Vehicle not found');

    const settings = this.getSettings();
    if (params.durationDays < settings.minTripDays || params.durationDays > settings.maxTripDays) {
      throw new Error(`Trip duration must be between ${settings.minTripDays} and ${settings.maxTripDays} days`);
    }

    const totalAmount = bus.pricePerDay * params.durationDays;
    const advanceAmount = Math.min(settings.upfrontTokenAmount, totalAmount);
    const balanceAmount = totalAmount - advanceAmount;

    // Commission calculation
    const platformCommission =
      settings.commissionType === 'percentage'
        ? Math.round((totalAmount * settings.commissionValue) / 100)
        : settings.commissionValue;
    const ownerNetEarnings = Math.max(0, totalAmount - platformCommission);

    const bookingId = `book-${Date.now()}`;
    const bookingNumber = `RAB-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const transactionId = `pay_${params.paymentGateway === 'Razorpay' ? 'RZP' : 'STRIPE'}_${Math.floor(100000000 + Math.random() * 900000000)}`;

    const newBooking: Booking = {
      id: bookingId,
      bookingNumber,
      busId: bus.id,
      busName: bus.name,
      busImage: bus.images[0] || heroBus,
      ownerId: bus.ownerId,
      customerName: params.customerName,
      customerPhone: params.customerPhone,
      customerEmail: params.customerEmail,
      pickupLocation: params.pickupLocation,
      dropLocation: params.dropLocation,
      startDate: params.startDate,
      endDate: params.endDate,
      durationDays: params.durationDays,
      passengers: params.passengers,
      dailyRate: bus.pricePerDay,
      totalAmount,
      advanceAmount,
      balanceAmount,
      platformCommission,
      ownerNetEarnings,
      paymentStatus: 'partial_paid',
      bookingStatus: 'Confirmed', // Instant confirmed on partial payment
      transactionId,
      paymentGateway: params.paymentGateway,
      paymentMethod: params.paymentMethod,
      createdAt: new Date().toISOString(),
      disputeStatus: 'none',
      hasReviewed: false,
    };

    const bookings = this.getBookings();
    bookings.unshift(newBooking);
    setStorage(KEYS.BOOKINGS, bookings);

    // Update bus blocked dates
    const updatedBlocked = [...bus.blockedDates, params.startDate, params.endDate];
    this.updateBus(bus.id, { blockedDates: updatedBlocked });

    // Send notifications to Customer, Owner, Admin
    this.addNotification({
      recipientRole: 'customer',
      title: `Booking Confirmed #${bookingNumber}`,
      message: `Your booking for ${bus.name} (${params.durationDays} Days) is confirmed! Advance payment of ₹${advanceAmount.toLocaleString('en-IN')} received.`,
      type: 'booking',
      channel: 'sms',
    });

    this.addNotification({
      recipientRole: 'owner',
      title: `New Confirmed Trip #${bookingNumber}`,
      message: `${params.customerName} booked ${bus.name} from ${params.pickupLocation} to ${params.dropLocation} (${params.startDate} to ${params.endDate}). Net payout: ₹${ownerNetEarnings.toLocaleString('en-IN')}.`,
      type: 'booking',
      channel: 'in_app',
    });

    this.addNotification({
      recipientRole: 'admin',
      title: `Platform Booking #${bookingNumber}`,
      message: `Trip booked on ${bus.name}. Total: ₹${totalAmount.toLocaleString('en-IN')} | Commission: ₹${platformCommission.toLocaleString('en-IN')}.`,
      type: 'payment',
      channel: 'in_app',
    });

    emitChange();
    return newBooking;
  },
  updateBookingStatus(bookingId: string, status: 'Confirmed' | 'Completed' | 'Cancelled'): Booking | null {
    const bookings = this.getBookings();
    const idx = bookings.findIndex((b) => b.id === bookingId);
    if (idx === -1) return null;
    bookings[idx].bookingStatus = status;
    if (status === 'Completed') {
      bookings[idx].paymentStatus = 'paid';
    }
    setStorage(KEYS.BOOKINGS, bookings);

    this.addNotification({
      recipientRole: 'customer',
      title: `Trip Status Update: ${status}`,
      message: `Your booking #${bookings[idx].bookingNumber} has been marked as ${status}.`,
      type: 'trip',
      channel: 'in_app',
    });

    emitChange();
    return bookings[idx];
  },
  cancelBooking(bookingId: string, reason: string): { booking: Booking; refundAmount: number } {
    const bookings = this.getBookings();
    const idx = bookings.findIndex((b) => b.id === bookingId);
    if (idx === -1) throw new Error('Booking not found');

    const booking = bookings[idx];
    const today = new Date();
    const start = new Date(booking.startDate);
    const diffDays = Math.ceil((start.getTime() - today.getTime()) / (1000 * 3600 * 24));

    // Cancellation policy calculation:
    // >7 days: 90% of advance refunded (₹9,000)
    // 2-7 days: 70% of advance refunded (₹7,000)
    // <48 hrs: 50% of advance refunded (₹5,000)
    let refundPercent = 0.5;
    if (diffDays > 7) refundPercent = 0.9;
    else if (diffDays >= 2) refundPercent = 0.7;

    const refundAmount = Math.round(booking.advanceAmount * refundPercent);

    booking.bookingStatus = 'Cancelled';
    booking.cancellationReason = reason;
    booking.disputeStatus = 'refund_requested';
    booking.refundAmount = refundAmount;

    setStorage(KEYS.BOOKINGS, bookings);

    this.addNotification({
      recipientRole: 'customer',
      title: `Booking Cancelled #${booking.bookingNumber}`,
      message: `Your trip has been cancelled. Eligible refund of ₹${refundAmount.toLocaleString('en-IN')} has been scheduled to your original payment method.`,
      type: 'dispute',
      channel: 'sms',
    });

    this.addNotification({
      recipientRole: 'owner',
      title: `Trip Cancelled #${booking.bookingNumber}`,
      message: `${booking.customerName} cancelled their trip on ${booking.busName}. Bus is now available again.`,
      type: 'booking',
      channel: 'in_app',
    });

    this.addNotification({
      recipientRole: 'admin',
      title: `Dispute/Refund Request #${booking.bookingNumber}`,
      message: `Customer cancelled booking. Refund required: ₹${refundAmount.toLocaleString('en-IN')}.`,
      type: 'dispute',
      channel: 'in_app',
    });

    emitChange();
    return { booking, refundAmount };
  },
  processRefund(bookingId: string): Booking {
    const bookings = this.getBookings();
    const idx = bookings.findIndex((b) => b.id === bookingId);
    if (idx === -1) throw new Error('Booking not found');

    bookings[idx].disputeStatus = 'refunded';
    bookings[idx].paymentStatus = 'refunded';
    setStorage(KEYS.BOOKINGS, bookings);

    this.addNotification({
      recipientRole: 'customer',
      title: `Refund Processed #${bookings[idx].bookingNumber}`,
      message: `Refund of ₹${(bookings[idx].refundAmount || 0).toLocaleString('en-IN')} has been settled to your account via ${bookings[idx].paymentGateway}.`,
      type: 'payment',
      channel: 'email',
    });

    emitChange();
    return bookings[idx];
  },

  // Reviews
  getReviews(busId?: string): Review[] {
    const all = getStorage<Review[]>(KEYS.REVIEWS, INITIAL_REVIEWS);
    if (!busId) return all;
    return all.filter((r) => r.busId === busId);
  },
  addReview(params: { bookingId: string; busId: string; customerName: string; rating: number; comment: string }): Review {
    const reviews = this.getReviews();
    const newRev: Review = {
      id: `rev-${Date.now()}`,
      bookingId: params.bookingId,
      busId: params.busId,
      customerName: params.customerName,
      rating: params.rating,
      comment: params.comment,
      createdAt: new Date().toISOString(),
    };
    reviews.unshift(newRev);
    setStorage(KEYS.REVIEWS, reviews);

    // Mark booking as reviewed
    const bookings = this.getBookings();
    const bIdx = bookings.findIndex((b) => b.id === params.bookingId);
    if (bIdx !== -1) {
      bookings[bIdx].hasReviewed = true;
      setStorage(KEYS.BOOKINGS, bookings);
    }

    // Recompute bus average rating
    const busReviews = reviews.filter((r) => r.busId === params.busId);
    const avg = busReviews.reduce((acc, r) => acc + r.rating, 0) / busReviews.length;
    this.updateBus(params.busId, {
      rating: Number(avg.toFixed(1)),
      reviewCount: busReviews.length,
    });

    emitChange();
    return newRev;
  },

  // Owner KYC
  getOwnerKYC(ownerId = 'owner-1'): OwnerKYC | undefined {
    const all = getStorage<Record<string, OwnerKYC>>(KEYS.KYC, INITIAL_KYC);
    return all[ownerId];
  },
  getAllOwnerKYCs(): OwnerKYC[] {
    const all = getStorage<Record<string, OwnerKYC>>(KEYS.KYC, INITIAL_KYC);
    return Object.values(all);
  },
  saveOwnerKYC(kyc: OwnerKYC): OwnerKYC {
    const all = getStorage<Record<string, OwnerKYC>>(KEYS.KYC, INITIAL_KYC);
    all[kyc.ownerId] = kyc;
    setStorage(KEYS.KYC, all);

    this.addNotification({
      recipientRole: 'admin',
      title: 'Owner KYC Submitted',
      message: `${kyc.businessName} has submitted KYC verification details.`,
      type: 'kyc',
      channel: 'in_app',
    });

    emitChange();
    return kyc;
  },
  verifyOwnerKYC(ownerId: string, status: 'verified' | 'action_required'): void {
    const all = getStorage<Record<string, OwnerKYC>>(KEYS.KYC, INITIAL_KYC);
    if (all[ownerId]) {
      all[ownerId].kycStatus = status;
      setStorage(KEYS.KYC, all);

      this.addNotification({
        recipientRole: 'owner',
        title: status === 'verified' ? 'KYC Verification Approved!' : 'KYC Action Required',
        message:
          status === 'verified'
            ? 'Your business and bank account have been verified. You can now receive fast automated payouts.'
            : 'Please review your uploaded documents and resubmit.',
        type: 'kyc',
        channel: 'in_app',
      });

      emitChange();
    }
  },

  // Wallet & Payouts
  getOwnerFinancials(ownerId = 'owner-1') {
    const bookings = this.getOwnerBookings(ownerId).filter((b) => b.bookingStatus !== 'Cancelled');
    const grossBookings = bookings.reduce((sum, b) => sum + b.totalAmount, 0);
    const platformCommission = bookings.reduce((sum, b) => sum + b.platformCommission, 0);
    const netEarnings = grossBookings - platformCommission;

    const payouts = this.getPayoutRequests(ownerId);
    const totalPaidOut = payouts
      .filter((p) => p.status === 'Completed')
      .reduce((sum, p) => sum + p.amount, 0);

    const availableBalance = Math.max(0, netEarnings - totalPaidOut);

    return {
      grossBookings,
      platformCommission,
      netEarnings,
      totalPaidOut,
      availableBalance,
      bookingsCount: bookings.length,
    };
  },
  getPayoutRequests(ownerId = 'owner-1'): PayoutRequest[] {
    const all = getStorage<PayoutRequest[]>(KEYS.PAYOUTS, [
      {
        id: 'payout-1',
        ownerId: 'owner-1',
        amount: 50000,
        status: 'Completed',
        requestedAt: '2026-10-05T12:00:00Z',
        bankAccount: 'HDFC Bank ****2348',
      },
    ]);
    return all.filter((p) => p.ownerId === ownerId);
  },
  requestPayout(ownerId = 'owner-1', amount: number, bankAccount: string): PayoutRequest {
    const payouts = getStorage<PayoutRequest[]>(KEYS.PAYOUTS, []);
    const newReq: PayoutRequest = {
      id: `payout-${Date.now()}`,
      ownerId,
      amount,
      status: 'Completed', // Instant mock settlement
      requestedAt: new Date().toISOString(),
      bankAccount,
    };
    payouts.unshift(newReq);
    setStorage(KEYS.PAYOUTS, payouts);

    this.addNotification({
      recipientRole: 'owner',
      title: 'Payout Processed Successfully',
      message: `₹${amount.toLocaleString('en-IN')} has been transferred to ${bankAccount}.`,
      type: 'payment',
      channel: 'sms',
    });

    emitChange();
    return newReq;
  },

  // Notifications
  getNotifications(role?: UserRole): AppNotification[] {
    const all = getStorage<AppNotification[]>(KEYS.NOTIFICATIONS, INITIAL_NOTIFICATIONS);
    if (!role) return all;
    return all.filter((n) => n.recipientRole === role || n.recipientRole === 'all');
  },
  addNotification(notif: Omit<AppNotification, 'id' | 'timestamp' | 'read'>): AppNotification {
    const all = this.getNotifications();
    const newNotif: AppNotification = {
      ...notif,
      id: `notif-${Date.now()}`,
      read: false,
      timestamp: new Date().toISOString(),
    };
    all.unshift(newNotif);
    setStorage(KEYS.NOTIFICATIONS, all);
    emitChange();
    return newNotif;
  },
  markNotificationsAsRead(role?: UserRole): void {
    const all = this.getNotifications();
    const updated = all.map((n) => {
      if (!role || n.recipientRole === role || n.recipientRole === 'all') {
        return { ...n, read: true };
      }
      return n;
    });
    setStorage(KEYS.NOTIFICATIONS, updated);
    emitChange();
  },

  // Customer <-> Owner Chat
  getChatMessages(bookingId: string): ChatMessage[] {
    const all = getStorage<ChatMessage[]>(KEYS.CHATS, INITIAL_CHATS);
    return all.filter((c) => c.bookingId === bookingId);
  },
  sendMessage(params: { bookingId: string; senderRole: 'customer' | 'owner'; senderName: string; text: string }): ChatMessage {
    const all = getStorage<ChatMessage[]>(KEYS.CHATS, INITIAL_CHATS);
    const newMsg: ChatMessage = {
      id: `chat-${Date.now()}`,
      bookingId: params.bookingId,
      senderRole: params.senderRole,
      senderName: params.senderName,
      text: params.text,
      timestamp: new Date().toISOString(),
    };
    all.push(newMsg);
    setStorage(KEYS.CHATS, all);

    // Notify the other party
    const booking = this.getBookingById(params.bookingId);
    if (booking) {
      const recipientRole = params.senderRole === 'customer' ? 'owner' : 'customer';
      this.addNotification({
        recipientRole,
        title: `New Message from ${params.senderName}`,
        message: params.text.length > 60 ? `${params.text.slice(0, 60)}...` : params.text,
        type: 'booking',
        channel: 'in_app',
      });
    }

    emitChange();
    return newMsg;
  },

  // Admin Metrics
  getAdminMetrics() {
    const bookings = this.getBookings();
    const buses = this.getBuses();
    const totalBookings = bookings.length;
    const gmv = bookings.reduce((sum, b) => sum + (b.bookingStatus !== 'Cancelled' ? b.totalAmount : 0), 0);
    const totalCommission = bookings.reduce((sum, b) => sum + (b.bookingStatus !== 'Cancelled' ? b.platformCommission : 0), 0);
    const activeTrips = bookings.filter((b) => b.bookingStatus === 'Confirmed').length;
    const pendingBuses = buses.filter((b) => b.status === 'pending').length;
    const disputes = bookings.filter((b) => b.disputeStatus === 'refund_requested').length;

    return {
      totalBookings,
      gmv,
      totalCommission,
      activeTrips,
      fleetCount: buses.length,
      pendingBuses,
      disputes,
    };
  },

  // CSV Report Generator
  exportCSV(type: 'earnings' | 'users' | 'trips'): string {
    if (type === 'earnings') {
      const bookings = this.getBookings();
      const headers = ['Booking ID', 'Bus Name', 'Customer', 'Trip Start', 'Trip End', 'Total Fare (INR)', 'Commission (INR)', 'Owner Net (INR)', 'Payment Status'];
      const rows = bookings.map((b) => [
        b.bookingNumber,
        `"${b.busName}"`,
        `"${b.customerName}"`,
        b.startDate,
        b.endDate,
        b.totalAmount,
        b.platformCommission,
        b.ownerNetEarnings,
        b.paymentStatus,
      ]);
      return [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    }

    if (type === 'trips') {
      const bookings = this.getBookings();
      const headers = ['Booking ID', 'Vehicle', 'Customer', 'Phone', 'Pickup', 'Drop', 'Days', 'Passengers', 'Status', 'Advance Paid'];
      const rows = bookings.map((b) => [
        b.bookingNumber,
        `"${b.busName}"`,
        `"${b.customerName}"`,
        b.customerPhone,
        `"${b.pickupLocation}"`,
        `"${b.dropLocation}"`,
        b.durationDays,
        b.passengers,
        b.bookingStatus,
        b.advanceAmount,
      ]);
      return [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    }

    // users
    const kycs = this.getAllOwnerKYCs();
    const headers = ['Owner ID', 'Business Name', 'Contact Person', 'Phone', 'Email', 'GSTIN', 'Bank Name', 'Account Number', 'KYC Status'];
    const rows = kycs.map((k) => [
      k.ownerId,
      `"${k.businessName}"`,
      `"${k.contactPerson}"`,
      k.phone,
      k.email,
      k.gstNumber,
      `"${k.bankName}"`,
      k.bankAccountNumber,
      k.kycStatus,
    ]);
    return [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
  },
};
