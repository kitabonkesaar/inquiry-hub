import { useParams, Link } from 'react-router-dom';
import { 
  MapPin, Clock, ArrowRight, ShieldCheck, Phone, CheckCircle2, 
  HelpCircle, Car, Compass, Fuel, Landmark 
} from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { SEOHead } from '@/components/seo/SEOHead';
import { getBreadcrumbSchema, getFAQSchema, getLocalBusinessSchema } from '@/components/seo/schemaData';
import { vehicles as defaultVehicles } from '@/data/vehicles';
import { VehicleCard } from '@/components/vehicles/VehicleCard';

interface RouteData {
  from: string;
  to: string;
  distanceKm: string;
  durationHours: string;
  highway: string;
  metaTitle: string;
  metaDescription: string;
  highlights: string[];
  pricingOptions: Array<{ vehicle: string; seats: string; estimatedRoundTrip: string; dryRate: string }>;
  faqs: Array<{ question: string; answer: string }>;
}

const ROUTES: Record<string, RouteData> = {
  'bhubaneswar-to-puri': {
    from: 'Bhubaneswar',
    to: 'Puri Jagannath Dham',
    distanceKm: '60 km',
    durationHours: '1 hr 30 mins',
    highway: 'NH 316 (Bhubaneswar - Puri Expressway)',
    metaTitle: 'Bhubaneswar to Puri Bus Rental & Tempo Traveller Hire | RentAnyBus',
    metaDescription: 'Book AC bus & tempo traveller from Bhubaneswar to Puri Jagannath Temple. Same-day return, wedding barat & pilgrimage tours. Tolls & driver charges included.',
    highlights: [
      'Smooth multi-lane expressway with scenic coconut groves',
      'En-route stop at Dhauli Shanti Stupa and Pipili Applique Village',
      'Dedicated temple parking assistance at Talabania / Grand Road',
      'Return same-day or multi-day temple stay flexibility'
    ],
    pricingOptions: [
      { vehicle: '12 Seater Tempo Traveller', seats: '12 Seats', estimatedRoundTrip: '₹5,500 - ₹6,500', dryRate: '₹22/km' },
      { vehicle: '17 Seater Force Urbania', seats: '17 Seats', estimatedRoundTrip: '₹7,500 - ₹8,500', dryRate: '₹26/km' },
      { vehicle: '26 Seater AC Traveller', seats: '26 Seats', estimatedRoundTrip: '₹9,500 - ₹11,000', dryRate: '₹32/km' },
      { vehicle: '45 Seater AC Luxury Coach', seats: '45 Seats', estimatedRoundTrip: '₹15,000 - ₹18,000', dryRate: '₹45/km' },
      { vehicle: '53 Seater Volvo Multi-Axle', seats: '53 Seats', estimatedRoundTrip: '₹22,000 - ₹25,000', dryRate: '₹55/km' },
    ],
    faqs: [
      {
        question: 'What is the road condition from Bhubaneswar to Puri?',
        answer: 'The route follows the well-maintained NH 316 4-lane expressway. Travel time is usually 75–90 minutes depending on city exit traffic.'
      },
      {
        question: 'Can the bus wait in Puri while we visit the Jagannath Temple and Golden Beach?',
        answer: 'Yes! All round-trip bookings include driver waiting time for temple darshan, prasad pickup, and beach sightseeing before returning to Bhubaneswar.'
      },
      {
        question: 'Are toll charges included on the Bhubaneswar-Puri route?',
        answer: 'Yes, our all-inclusive charter quotes cover the toll gate charges near Pipili and official state permits.'
      }
    ]
  },
  'bhubaneswar-to-konark': {
    from: 'Bhubaneswar',
    to: 'Konark Sun Temple',
    distanceKm: '65 km',
    durationHours: '1 hr 45 mins',
    highway: 'SH 13 via Pipili or Marine Drive via Puri',
    metaTitle: 'Bhubaneswar to Konark Sun Temple Bus & Tempo Traveller Hire | RentAnyBus',
    metaDescription: 'Hire buses and tempo travellers from Bhubaneswar to Konark Sun Temple & Chandrabhaga Beach. Experienced chauffeurs, fixed rates, instant quotes.',
    highlights: [
      'UNESCO World Heritage Konark Sun Temple excursion',
      'Chandrabhaga Beach sunset and water sports',
      'Artisanal handicrafts shopping at Pipili',
      'Optional Golden Triangle extension (Bhubaneswar-Puri-Konark)'
    ],
    pricingOptions: [
      { vehicle: '12 Seater Tempo Traveller', seats: '12 Seats', estimatedRoundTrip: '₹5,800 - ₹6,800', dryRate: '₹22/km' },
      { vehicle: '17 Seater AC Traveller', seats: '17 Seats', estimatedRoundTrip: '₹7,800 - ₹8,800', dryRate: '₹26/km' },
      { vehicle: '26 Seater Coach', seats: '26 Seats', estimatedRoundTrip: '₹10,000 - ₹11,500', dryRate: '₹32/km' },
      { vehicle: '45 Seater AC Bus', seats: '45 Seats', estimatedRoundTrip: '₹16,000 - ₹18,500', dryRate: '₹45/km' },
    ],
    faqs: [
      {
        question: 'Can we combine Bhubaneswar, Puri, and Konark in a 1-day trip?',
        answer: 'Yes, our Golden Triangle 1-day charter covers Lingaraj Temple, Dhauli, Konark Sun Temple, and Puri Jagannath Temple with return to Bhubaneswar by evening.'
      },
      {
        question: 'Is parking available near the Konark Sun Temple?',
        answer: 'Yes, there is a dedicated OTDC tourist parking complex just 400 meters from the Sun Temple complex.'
      }
    ]
  },
  'bhubaneswar-to-chilika': {
    from: 'Bhubaneswar',
    to: 'Chilika Lake (Satapada / Barkul)',
    distanceKm: '110 km',
    durationHours: '2 hrs 45 mins',
    highway: 'NH 16 (for Barkul) or via Puri NH 316 (for Satapada)',
    metaTitle: 'Bhubaneswar to Chilika Lake Bus Rental & Tempo Traveller | RentAnyBus',
    metaDescription: 'Book group bus & tempo traveller rental from Bhubaneswar to Chilika Lake. Irrawaddy dolphin boat tours, Kalijai Temple & bird sanctuary transport.',
    highlights: [
      "Asia's largest brackish water lagoon excursion",
      'Irrawaddy Dolphin watching boat points at Satapada',
      'Maa Kalijai Temple island boat cruise at Barkul',
      'Fresh seafood culinary stops along the coast'
    ],
    pricingOptions: [
      { vehicle: '12 Seater Tempo Traveller', seats: '12 Seats', estimatedRoundTrip: '₹7,500 - ₹8,500', dryRate: '₹22/km' },
      { vehicle: '17 Seater Force Urbania', seats: '17 Seats', estimatedRoundTrip: '₹9,500 - ₹11,000', dryRate: '₹26/km' },
      { vehicle: '26 Seater Deluxe Coach', seats: '26 Seats', estimatedRoundTrip: '₹13,000 - ₹14,500', dryRate: '₹32/km' },
      { vehicle: '45 Seater AC Bus', seats: '45 Seats', estimatedRoundTrip: '₹20,000 - ₹23,000', dryRate: '₹45/km' },
    ],
    faqs: [
      {
        question: 'Which Chilika point should we visit: Satapada or Barkul?',
        answer: 'Satapada is famous for dolphin spotting and the sea-mouth, while Barkul / Rambha is ideal for scenic island cruises to Kalijai Temple. Our team can guide your group.'
      },
      {
        question: 'Does the driver wait during our boat safari?',
        answer: 'Yes, the vehicle and chauffeur remain on standby at the boat jetty until your group completes the safari and lunch.'
      }
    ]
  }
};

export default function RouteHub() {
  const { routeSlug } = useParams<{ routeSlug: string }>();
  const normalizedSlug = (routeSlug || 'bhubaneswar-to-puri').toLowerCase();
  const routeData = ROUTES[normalizedSlug] || ROUTES['bhubaneswar-to-puri'];

  const breadcrumbs = [
    { name: 'Home', path: '/' },
    { name: 'Routes', path: '/vehicles' },
    { name: `${routeData.from} to ${routeData.to}`, path: `/routes/${normalizedSlug}` }
  ];

  return (
    <Layout>
      <SEOHead
        title={routeData.metaTitle}
        description={routeData.metaDescription}
        canonicalPath={`/routes/${normalizedSlug}`}
        jsonLd={[
          getLocalBusinessSchema(),
          getBreadcrumbSchema(breadcrumbs),
          getFAQSchema(routeData.faqs)
        ]}
      />

      {/* Hero Header */}
      <section className="bg-primary text-primary-foreground py-14 md:py-20 border-b border-white/10 relative overflow-hidden">
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-accent text-[#081829] font-bold text-xs uppercase tracking-wider mb-4 shadow-xs">
              <Compass className="w-3.5 h-3.5 text-[#081829]" />
              <span>Popular Intercity Corridor</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-4 leading-tight">
              {routeData.from} to <span className="text-accent">{routeData.to}</span> Bus Rental
            </h1>
            <p className="text-base md:text-lg text-slate-200 leading-relaxed mb-6">
              Comfortable, all-inclusive bus and tempo traveller charter. Distance: <strong className="text-white">{routeData.distanceKm}</strong> • Estimated time: <strong className="text-white">{routeData.durationHours}</strong> via {routeData.highway}.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link to={`/inquiry?from=${encodeURIComponent(routeData.from)}&to=${encodeURIComponent(routeData.to)}`}>
                <Button variant="accent" size="lg" className="font-bold shadow-md">
                  Book This Route Online
                  <ArrowRight className="w-4 h-4 ml-1.5" />
                </Button>
              </Link>
              <a href="tel:+918249529220">
                <Button variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/10">
                  <Phone className="w-4 h-4 mr-2" />
                  Call: +91 82495 29220
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Key Route Metrics */}
      <section className="py-8 bg-card border-b border-border">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="p-3">
              <span className="text-xs text-muted-foreground block font-medium">One-Way Distance</span>
              <span className="text-xl md:text-2xl font-black text-primary">{routeData.distanceKm}</span>
            </div>
            <div className="p-3">
              <span className="text-xs text-muted-foreground block font-medium">Avg Travel Time</span>
              <span className="text-xl md:text-2xl font-black text-primary">{routeData.durationHours}</span>
            </div>
            <div className="p-3">
              <span className="text-xs text-muted-foreground block font-medium">Main Route</span>
              <span className="text-sm md:text-base font-bold text-foreground truncate block">{routeData.highway}</span>
            </div>
            <div className="p-3">
              <span className="text-xs text-muted-foreground block font-medium">Tolls & Driver</span>
              <span className="text-xl md:text-2xl font-black text-emerald-600">All Included</span>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="py-12 bg-background border-b border-border">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
            <Landmark className="w-6 h-6 text-accent" />
            Route Highlights & Recommended Stops
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {routeData.highlights.map((h, i) => (
              <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-card border">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <span className="text-sm font-medium text-foreground/90">{h}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Route Pricing Table */}
      <section className="py-16 bg-muted/20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-accent mb-2 block">
              Estimated Trip Fare
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-foreground">
              {routeData.from} to {routeData.to} Bus Rental Rates
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground mt-2">
              Transparent round-trip and dry pricing. Zero hidden charges.
            </p>
          </div>

          <div className="max-w-4xl mx-auto bg-card rounded-2xl border shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-muted text-foreground/80 font-bold border-b">
                  <tr>
                    <th className="p-4">Vehicle Category</th>
                    <th className="p-4">Seating</th>
                    <th className="p-4">Est. Round Trip Rate</th>
                    <th className="p-4">Per Km Rate</th>
                    <th className="p-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {routeData.pricingOptions.map((row) => (
                    <tr key={row.vehicle} className="hover:bg-muted/30 transition-colors">
                      <td className="p-4 font-semibold text-foreground">{row.vehicle}</td>
                      <td className="p-4 text-muted-foreground">{row.seats}</td>
                      <td className="p-4 font-bold text-primary">{row.estimatedRoundTrip}</td>
                      <td className="p-4 text-muted-foreground">{row.dryRate}</td>
                      <td className="p-4 text-right">
                        <Link to={`/inquiry?from=${encodeURIComponent(routeData.from)}&to=${encodeURIComponent(routeData.to)}&vehicleType=${encodeURIComponent(row.vehicle)}`}>
                          <Button size="sm" variant="accent" className="font-semibold text-xs">
                            Book
                          </Button>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Available Fleet */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-accent mb-1 block">
                Recommended Coaches
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                Top Vehicles for {routeData.from} - {routeData.to}
              </h2>
            </div>
            <Link to="/vehicles">
              <Button variant="outline" size="sm" className="gap-2">
                View All Vehicles <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {defaultVehicles.slice(0, 3).map((v) => (
              <VehicleCard key={v.id} vehicle={v} />
            ))}
          </div>
        </div>
      </section>

      {/* Route FAQs */}
      <section className="py-16 bg-card border-t border-border">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-foreground flex items-center justify-center gap-2">
              <HelpCircle className="w-6 h-6 text-accent" />
              Route FAQs: {routeData.from} to {routeData.to}
            </h2>
          </div>

          <div className="space-y-4">
            {routeData.faqs.map((faq, i) => (
              <div key={i} className="p-5 rounded-xl border bg-background space-y-2">
                <h3 className="font-bold text-foreground text-sm sm:text-base">{faq.question}</h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
