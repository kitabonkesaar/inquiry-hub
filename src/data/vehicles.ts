import bus1 from '@/assets/bus-1.jpg';
import bus2 from '@/assets/bus-2.jpg';
import traveller1 from '@/assets/traveller-1.jpg';

export interface Vehicle {
  id: string;
  name: string;
  type: 'bus' | 'traveller';
  category: 'ac' | 'non-ac';
  seatingCapacity: number;
  pricePerDay: string;
  amenities: string[];
  images: string[];
  description: string;
  idealFor: string[];
  availability: 'available' | 'limited' | 'booked';
  bus_layout?: '1x2' | '2x2';
}

export const vehicles: Vehicle[] = [
  {
    id: '1',
    name: 'Luxury AC Sleeper Bus',
    type: 'bus',
    category: 'ac',
    seatingCapacity: 45,
    pricePerDay: '₹18,000',
    amenities: ['Air Conditioning', 'Reclining Seats', 'Entertainment System', 'USB Charging', 'WiFi', 'Blankets'],
    images: [bus1],
    description: 'Premium luxury sleeper bus with full air conditioning, individual entertainment screens, and maximum comfort for long-distance travel.',
    idealFor: ['Corporate Events', 'Long Distance Travel', 'Night Journeys', 'Group Tours'],
    availability: 'available',
  },
  {
    id: '2',
    name: 'Executive AC Coach',
    type: 'bus',
    category: 'ac',
    seatingCapacity: 50,
    pricePerDay: '₹15,000',
    amenities: ['Air Conditioning', 'Push-back Seats', 'Mic System', 'LCD TV', 'First Aid Kit'],
    images: [bus2],
    description: 'Comfortable executive coach ideal for corporate outings, conferences, and group travel with premium amenities.',
    idealFor: ['Corporate Outings', 'Conferences', 'Educational Tours', 'Pilgrimages'],
    availability: 'available',
  },
  {
    id: '3',
    name: 'Tempo Traveller 12 Seater',
    type: 'traveller',
    category: 'ac',
    seatingCapacity: 12,
    pricePerDay: '₹6,500',
    amenities: ['Air Conditioning', 'Music System', 'Comfortable Seats', 'Luggage Space'],
    images: [traveller1],
    description: 'Compact and comfortable 12-seater tempo traveller, perfect for small group trips and family outings.',
    idealFor: ['Family Trips', 'Small Group Tours', 'Airport Transfers', 'Local Sightseeing'],
    availability: 'limited',
  },
  {
    id: '4',
    name: 'Tempo Traveller 17 Seater',
    type: 'traveller',
    category: 'ac',
    seatingCapacity: 17,
    pricePerDay: '₹8,000',
    amenities: ['Air Conditioning', 'Music System', 'Push-back Seats', 'Icebox', 'Charging Points'],
    images: [traveller1],
    description: 'Spacious 17-seater tempo traveller with premium seating and amenities for medium-sized groups.',
    idealFor: ['Extended Family Trips', 'Office Outings', 'Wedding Groups', 'Pilgrimages'],
    availability: 'available',
  },
  {
    id: '5',
    name: 'Non-AC Deluxe Bus',
    type: 'bus',
    category: 'non-ac',
    seatingCapacity: 52,
    pricePerDay: '₹10,000',
    amenities: ['Comfortable Seats', 'Mic System', 'First Aid Kit', 'Large Windows'],
    images: [bus2],
    description: 'Budget-friendly deluxe bus with comfortable seating, ideal for school trips and budget group travel.',
    idealFor: ['School Trips', 'Budget Travel', 'Short Distance', 'Large Groups'],
    availability: 'available',
  },
  {
    id: '6',
    name: 'Mini Bus 25 Seater',
    type: 'bus',
    category: 'ac',
    seatingCapacity: 25,
    pricePerDay: '₹12,000',
    amenities: ['Air Conditioning', 'Push-back Seats', 'Music System', 'Curtains', 'First Aid'],
    images: [bus1],
    description: 'Mid-sized AC mini bus perfect for medium groups seeking comfort without the need for a full-size coach.',
    idealFor: ['Medium Groups', 'Corporate Teams', 'Wedding Parties', 'Day Tours'],
    availability: 'booked',
  },
  {
    id: '7',
    name: 'Tempo Traveller 26 Seater',
    type: 'traveller',
    category: 'ac',
    seatingCapacity: 26,
    pricePerDay: '₹10,500',
    amenities: ['Air Conditioning', 'High-back Seats', 'LED TV', 'Music System', 'Large Luggage Space'],
    images: [traveller1],
    description: 'Large capacity tempo traveller with premium features, ideal for bigger groups wanting flexibility.',
    idealFor: ['Large Family Groups', 'Office Teams', 'Extended Tours', 'Pilgrimages'],
    availability: 'available',
  },
  {
    id: '8',
    name: 'Luxury Volvo Coach',
    type: 'bus',
    category: 'ac',
    seatingCapacity: 40,
    pricePerDay: '₹25,000',
    amenities: ['Multi-zone AC', 'Semi-sleeper Seats', 'Personal Entertainment', 'WiFi', 'Refreshments', 'Toilet'],
    images: [bus2],
    description: 'Ultra-premium Volvo coach with top-tier amenities including onboard toilet, WiFi, and personal entertainment systems.',
    idealFor: ['VIP Travel', 'Long Distance Luxury', 'Corporate Executives', 'Premium Tours'],
    availability: 'limited',
  },
];

export const vehicleCategories = [
  {
    id: 'ac-bus',
    name: 'AC Buses',
    description: 'Climate-controlled comfort for any weather',
    icon: 'Snowflake',
    count: vehicles.filter(v => v.type === 'bus' && v.category === 'ac').length,
  },
  {
    id: 'non-ac-bus',
    name: 'Non-AC Buses',
    description: 'Budget-friendly options for groups',
    icon: 'Bus',
    count: vehicles.filter(v => v.type === 'bus' && v.category === 'non-ac').length,
  },
  {
    id: 'tempo-traveller',
    name: 'Tempo Travellers',
    description: 'Compact vehicles for small groups',
    icon: 'Car',
    count: vehicles.filter(v => v.type === 'traveller').length,
  },
];
