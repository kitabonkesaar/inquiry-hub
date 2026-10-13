export const BASE_URL = 'https://www.rentanybus.com';

export const getOrganizationSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'RentAnyBus',
  alternateName: 'Rent Any Bus Odisha',
  url: BASE_URL,
  logo: `${BASE_URL}/logo.png`,
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+91-82495-29220',
    contactType: 'customer service',
    areaServed: 'IN-OR',
    availableLanguage: ['English', 'Hindi', 'Odia'],
  },
  sameAs: [
    'https://www.facebook.com/rentanybus',
    'https://www.instagram.com/rentanybus',
  ],
});

export const getLocalBusinessSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': `${BASE_URL}/#localbusiness`,
  name: 'RentAnyBus - Bus & Tempo Traveller Hire Odisha',
  image: `${BASE_URL}/quote-banner-bus.png`,
  telephone: '+91-82495-29220',
  priceRange: '₹6500 - ₹25000',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Patia, Infocity Road',
    addressLocality: 'Bhubaneswar',
    addressRegion: 'Odisha',
    postalCode: '751024',
    addressCountry: 'IN',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 20.3547,
    longitude: 85.8178,
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '06:00',
      closes: '23:30',
    },
  ],
  areaServed: [
    { '@type': 'City', name: 'Bhubaneswar' },
    { '@type': 'City', name: 'Cuttack' },
    { '@type': 'City', name: 'Puri' },
    { '@type': 'City', name: 'Berhampur' },
    { '@type': 'City', name: 'Balasore' },
    { '@type': 'City', name: 'Rourkela' },
    { '@type': 'City', name: 'Sambalpur' },
  ],
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    reviewCount: '128',
    bestRating: '5',
    worstRating: '1',
  },
});

export const getBreadcrumbSchema = (crumbs: Array<{ name: string; path: string }>) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: crumbs.map((crumb, idx) => ({
    '@type': 'ListItem',
    position: idx + 1,
    name: crumb.name,
    item: crumb.path.startsWith('http') ? crumb.path : `${BASE_URL}${crumb.path}`,
  })),
});

export const getFAQSchema = (faqs: Array<{ question: string; answer: string }>) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
});

export const getVehicleProductSchema = (vehicle: {
  id: string;
  name: string;
  description: string;
  pricePerDay: string | number;
  seatingCapacity: number;
  images?: string[];
}) => {
  const numericPrice = typeof vehicle.pricePerDay === 'number'
    ? vehicle.pricePerDay
    : parseInt(String(vehicle.pricePerDay).replace(/[^0-9]/g, '')) || 18000;

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: vehicle.name,
    description: vehicle.description,
    image: vehicle.images && vehicle.images.length > 0 ? vehicle.images[0] : `${BASE_URL}/quote-banner-bus.png`,
    sku: `BUS-${vehicle.id}`,
    offers: {
      '@type': 'Offer',
      price: numericPrice,
      priceCurrency: 'INR',
      availability: 'https://schema.org/InStock',
      url: `${BASE_URL}/vehicles/${vehicle.id}`,
      priceValidUntil: '2026-12-31',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '34',
    },
  };
};
