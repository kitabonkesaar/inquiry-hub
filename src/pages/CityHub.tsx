import { useParams, Link } from 'react-router-dom';
import { 
  MapPin, Phone, ArrowRight, ShieldCheck, Clock, Users, 
  CheckCircle2, Star, Calendar, MessageCircle, Bus, HelpCircle 
} from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { SEOHead } from '@/components/seo/SEOHead';
import { getBreadcrumbSchema, getFAQSchema, getLocalBusinessSchema } from '@/components/seo/schemaData';
import { vehicles as defaultVehicles } from '@/data/vehicles';
import { VehicleCard } from '@/components/vehicles/VehicleCard';

interface CityData {
  name: string;
  tagline: string;
  metaTitle: string;
  metaDescription: string;
  popularPickupPoints: string[];
  pricingTable: Array<{ type: string; capacity: string; ratePerDay: string; ratePerKm: string }>;
  faqs: Array<{ question: string; answer: string }>;
  localHighlights: string[];
}

const CITIES: Record<string, CityData> = {
  bhubaneswar: {
    name: 'Bhubaneswar',
    tagline: "Odisha's Capital Hub for Premium Bus & Tempo Traveller Hire",
    metaTitle: 'Bus Rental in Bhubaneswar | Tempo Traveller Hire | RentAnyBus',
    metaDescription: 'Rent luxury AC buses, sleeper coaches & tempo travellers in Bhubaneswar. 12 to 55 seater fleet for weddings, corporate, airport transfers & temple tours.',
    popularPickupPoints: [
      'Biju Patnaik International Airport (BBI)',
      'Bhubaneswar Railway Station (Master Canteen)',
      'Patia & Infocity IT Corridor',
      'Baramunda Bus Stand',
      'Jaydev Vihar & Nayapalli',
      'Khandagiri & Chandrasekharpur'
    ],
    pricingTable: [
      { type: '12 Seater Tempo Traveller', capacity: '12 Guests', ratePerDay: '₹6,500', ratePerKm: '₹22/km' },
      { type: '17 Seater Force Urbania', capacity: '17 Guests', ratePerDay: '₹8,500', ratePerKm: '₹26/km' },
      { type: '26 Seater Luxury Traveller', capacity: '26 Guests', ratePerDay: '₹10,500', ratePerKm: '₹32/km' },
      { type: '45 Seater AC Pushback Coach', capacity: '45 Guests', ratePerDay: '₹18,000', ratePerKm: '₹45/km' },
      { type: '53 Seater Volvo Multi-Axle', capacity: '53 Guests', ratePerDay: '₹25,000', ratePerKm: '₹55/km' },
    ],
    faqs: [
      {
        question: 'How do I book a bus in Bhubaneswar?',
        answer: 'You can browse verified vehicles on RentAnyBus, choose your seating capacity, and submit an inquiry. Our Bhubaneswar dispatch coordinator will call you within 30 minutes with photos and transparent all-inclusive pricing.'
      },
      {
        question: 'Are tolls, driver allowance, and parking included in the quote?',
        answer: 'Yes! All charter quotes provided by RentAnyBus in Bhubaneswar clearly outline driver night allowances, fuel, and state road taxes with zero hidden surprises.'
      },
      {
        question: 'Can I book a tempo traveller for Bhubaneswar airport pickup?',
        answer: 'Absolutely. We provide flight-tracking airport pickups at BBI Airport with professional chauffeurs and luggage assistance.'
      }
    ],
    localHighlights: [
      'Dedicated Infocity IT corporate transport packages',
      'Direct highway access for Puri Jagannath Dham & Konark day excursions',
      'Clean sanitized coaches with certified professional drivers'
    ]
  },
  puri: {
    name: 'Puri',
    tagline: 'Premier Bus Rental for Jagannath Dham Yatra & Beach Tours',
    metaTitle: 'Bus Rental in Puri | Jagannath Yatra Bus Hire | RentAnyBus',
    metaDescription: 'Book AC buses & tempo travellers in Puri for Jagannath Temple Yatra, Konark Sun Temple tours, and beach group excursions. Verified drivers & instant quotes.',
    popularPickupPoints: [
      'Puri Railway Station',
      'Jagannath Temple Grand Road (Badadanda)',
      'Golden Beach & Sea Beach Road',
      'Talabania Bus Stand',
      'VIP Road & Marine Drive'
    ],
    pricingTable: [
      { type: '12 Seater AC Tempo Traveller', capacity: '12 Guests', ratePerDay: '₹6,800', ratePerKm: '₹23/km' },
      { type: '17 Seater Luxury Traveller', capacity: '17 Guests', ratePerDay: '₹8,800', ratePerKm: '₹27/km' },
      { type: '26 Seater Group Bus', capacity: '26 Guests', ratePerDay: '₹11,000', ratePerKm: '₹34/km' },
      { type: '45 Seater Deluxe Coach', capacity: '45 Guests', ratePerDay: '₹18,500', ratePerKm: '₹46/km' },
      { type: '50 Seater Yatra Coach', capacity: '50 Guests', ratePerDay: '₹21,000', ratePerKm: '₹50/km' },
    ],
    faqs: [
      {
        question: 'Is parking available near Puri Jagannath Temple for large buses?',
        answer: 'Yes. Our local chauffeurs know all official RTO designated parking hubs at Talabania and near Grand Road, ensuring elders and children do not have to walk long distances.'
      },
      {
        question: 'Can we book a same-day round-trip from Puri to Konark & Chilika?',
        answer: 'Yes. We frequently organize customized day-tours covering Puri Golden Beach, Chandrabhaga Beach, Konark Sun Temple, and Satapada Chilika Lake dolphin tours.'
      }
    ],
    localHighlights: [
      'Specialized assistance for senior citizen pilgrimages',
      'Marine Drive sunrise and Konark beach itineraries',
      'Spacious luggage bays for pilgrimage groups and families'
    ]
  },
  cuttack: {
    name: 'Cuttack',
    tagline: 'Trusted Bus Rental for Millennium City Weddings & Group Events',
    metaTitle: 'Bus Rental in Cuttack | Wedding Bus & Tempo Traveller Hire',
    metaDescription: 'Hire buses & tempo travellers in Cuttack for weddings, family gatherings, educational tours, and Bali Jatra. All-inclusive transparent pricing.',
    popularPickupPoints: [
      'Badambadi Bus Stand',
      'Cuttack Railway Station',
      'CDA Sectors 1–11',
      'Madhupatna & Link Road',
      'Chhatra Bazar & College Square'
    ],
    pricingTable: [
      { type: '12 Seater Tempo Traveller', capacity: '12 Guests', ratePerDay: '₹6,500', ratePerKm: '₹22/km' },
      { type: '17 Seater Pushback Traveller', capacity: '17 Guests', ratePerDay: '₹8,500', ratePerKm: '₹26/km' },
      { type: '26 Seater Marriage Coach', capacity: '26 Guests', ratePerDay: '₹10,500', ratePerKm: '₹32/km' },
      { type: '50 Seater Barat Bus', capacity: '50 Guests', ratePerDay: '₹17,500', ratePerKm: '₹44/km' },
    ],
    faqs: [
      {
        question: 'Can I hire multiple buses for wedding guest transport in Cuttack?',
        answer: 'Yes. RentAnyBus provides bulk wedding convoy management in Cuttack, with on-time guest pickups across mandaps, hotels, and railway stations.'
      },
      {
        question: 'Do you offer pickup service from Badambadi Bus Stand?',
        answer: 'Yes, our verified drivers can coordinate pickups right at Badambadi, CDA, or any doorstep in Cuttack.'
      }
    ],
    localHighlights: [
      'Wedding Barat and guest shuttle experts in Millennium City',
      'Comfortable dual-chilled AC systems for summer travels',
      '24/7 route coordination and backup fleet guarantee'
    ]
  },
  berhampur: {
    name: 'Berhampur',
    tagline: 'Silk City Bus & Tempo Traveller Charter for Southern Odisha',
    metaTitle: 'Bus Rental in Berhampur | Tempo Traveller Hire | RentAnyBus',
    metaDescription: 'Rent AC buses & tempo travellers in Berhampur (Brahmapur). Outstation charters to Gopalpur Beach, Tara Tarini Temple, and Rayagada.',
    popularPickupPoints: [
      'Berhampur Railway Station (BAM)',
      'New Bus Stand (Haladipadar)',
      'Old Bus Stand & Giri Road',
      'Gandhi Nagar & Gosaninuagaon',
      'Gopalpur Junction'
    ],
    pricingTable: [
      { type: '12 Seater Tempo Traveller', capacity: '12 Guests', ratePerDay: '₹6,500', ratePerKm: '₹22/km' },
      { type: '17 Seater AC Traveller', capacity: '17 Guests', ratePerDay: '₹8,500', ratePerKm: '₹26/km' },
      { type: '26 Seater Tourist Coach', capacity: '26 Guests', ratePerDay: '₹10,500', ratePerKm: '₹32/km' },
      { type: '45 Seater Deluxe Bus', capacity: '45 Guests', ratePerDay: '₹18,000', ratePerKm: '₹45/km' },
    ],
    faqs: [
      {
        question: 'Can we book a day trip from Berhampur to Tara Tarini and Gopalpur?',
        answer: 'Yes! Our custom Berhampur 1-day package covers hilltop Tara Tarini Temple darshan and Gopalpur-on-Sea beach sunset before returning to Berhampur.'
      },
      {
        question: 'Are night pickups available at Berhampur Railway Station?',
        answer: 'Yes, our local chauffeurs track arriving trains and provide 24/7 station pickup with zero delay.'
      }
    ],
    localHighlights: [
      'Direct coastal routes to Gopalpur and Sonapur beaches',
      'Spiritual circuits to Tara Tarini & Tampara Lake',
      'Southern Odisha intercity wedding charter specialists'
    ]
  },
  balasore: {
    name: 'Balasore',
    tagline: 'North Odisha Bus & Tempo Traveller Rental for Chandipur & Kuldiha',
    metaTitle: 'Bus Rental in Balasore | Tempo Traveller Hire | RentAnyBus',
    metaDescription: 'Hire buses and tempo travellers in Balasore (Baleswar). Group trips to Chandipur Beach, Panchalingeswar Temple, Kuldiha Wildlife Sanctuary & Kolkata.',
    popularPickupPoints: [
      'Balasore Railway Station',
      'Sahadevkhunta Bus Stand',
      'Station Bazar & Motiganj',
      'Remuna Golei',
      'Kuruda Bypass'
    ],
    pricingTable: [
      { type: '12 Seater Tempo Traveller', capacity: '12 Guests', ratePerDay: '₹6,500', ratePerKm: '₹22/km' },
      { type: '17 Seater Force Urbania', capacity: '17 Guests', ratePerDay: '₹8,500', ratePerKm: '₹26/km' },
      { type: '26 Seater Pushback Bus', capacity: '26 Guests', ratePerDay: '₹10,500', ratePerKm: '₹32/km' },
      { type: '45 Seater AC Bus', capacity: '45 Guests', ratePerDay: '₹18,000', ratePerKm: '₹45/km' },
    ],
    faqs: [
      {
        question: 'Do you offer buses for Kolkata trips from Balasore?',
        answer: 'Yes, we provide inter-state permit tourist buses and tempo travellers from Balasore to Kolkata and Digha with all road taxes paid.'
      },
      {
        question: 'Can we take a tempo traveller to Panchalingeswar and Chandipur?',
        answer: 'Absolutely. We organize comfortable same-day group sightseeing covering Chandipur vanishing sea beach and Panchalingeswar hill temple.'
      }
    ],
    localHighlights: [
      'Inter-state road permits for West Bengal & Jharkhand tours',
      'Scenic excursions to Chandipur, Talasari & Panchalingeswar',
      'Industrial corporate transport for Balasore industrial corridors'
    ]
  },
  rourkela: {
    name: 'Rourkela',
    tagline: 'Steel City Bus Rental for Corporate, Sports & Western Odisha Tours',
    metaTitle: 'Bus Rental in Rourkela | Tempo Traveller Hire | RentAnyBus',
    metaDescription: 'Book luxury buses and tempo travellers in Rourkela for SAIL corporate trips, sports events at Birsa Munda Stadium, Mandira Dam, and outstation tours.',
    popularPickupPoints: [
      'Rourkela Railway Station',
      'Panposh Bus Stand',
      'Udit Nagar & Civil Township',
      'Koel Nagar & Chhend Colony',
      'Sector 5 & Birsa Munda Stadium'
    ],
    pricingTable: [
      { type: '12 Seater Tempo Traveller', capacity: '12 Guests', ratePerDay: '₹7,000', ratePerKm: '₹23/km' },
      { type: '17 Seater AC Traveller', capacity: '17 Guests', ratePerDay: '₹9,000', ratePerKm: '₹27/km' },
      { type: '26 Seater Executive Coach', capacity: '26 Guests', ratePerDay: '₹11,500', ratePerKm: '₹33/km' },
      { type: '45 Seater Luxury Bus', capacity: '45 Guests', ratePerDay: '₹19,000', ratePerKm: '₹46/km' },
    ],
    faqs: [
      {
        question: 'Can we hire buses for sports teams visiting Birsa Munda Hockey Stadium?',
        answer: 'Yes. RentAnyBus provides air-conditioned team buses with dedicated luggage bays for sports gear and priority venue parking.'
      },
      {
        question: 'Do you provide daily corporate shuttles for plant staff?',
        answer: 'Yes, we handle recurring executive and staff transport contracts for industrial units around Rourkela and Kalunga.'
      }
    ],
    localHighlights: [
      'Official sports event and tournament transportation',
      'Corporate charters for SAIL Rourkela Steel Plant & IT firms',
      'Western Odisha highway connectivity to Sambalpur & Ranchi'
    ]
  },
  sambalpur: {
    name: 'Sambalpur',
    tagline: 'Cultural Hub Bus Hire for Hirakud Dam, Samaleswari & Western Odisha',
    metaTitle: 'Bus Rental in Sambalpur | Tempo Traveller Hire | RentAnyBus',
    metaDescription: 'Hire AC tempo travellers and buses in Sambalpur for Maa Samaleswari Temple pilgrimage, Hirakud Dam excursions, Debrigarh Sanctuary, and weddings.',
    popularPickupPoints: [
      'Sambalpur Junction / Khetrajpur',
      'Ainthapali Bus Stand',
      'Dhanupali & Budharaja',
      'Burla & VSSUT Campus',
      'Hirakud Colony'
    ],
    pricingTable: [
      { type: '12 Seater Tempo Traveller', capacity: '12 Guests', ratePerDay: '₹6,800', ratePerKm: '₹22/km' },
      { type: '17 Seater Force Urbania', capacity: '17 Guests', ratePerDay: '₹8,800', ratePerKm: '₹26/km' },
      { type: '26 Seater Tourist Bus', capacity: '26 Guests', ratePerDay: '₹11,000', ratePerKm: '₹32/km' },
      { type: '45 Seater Deluxe Coach', capacity: '45 Guests', ratePerDay: '₹18,500', ratePerKm: '₹45/km' },
    ],
    faqs: [
      {
        question: 'How do I book a tour bus to Hirakud Dam and Debrigarh Sanctuary?',
        answer: 'Select your preferred vehicle size on RentAnyBus and request a quote. Our Sambalpur coordinator arranges vehicles with sanctuary eco-tour clearance.'
      },
      {
        question: 'Do you offer wedding buses in Sambalpur and Bargarh?',
        answer: 'Yes, we provide decorated marriage barat buses and guest shuttles across Sambalpur, Burla, Bargarh, and Jharsuguda.'
      }
    ],
    localHighlights: [
      'Pilgrimage charters to Maa Samaleswari Temple & Huma Leaning Temple',
      'Eco-tourism packages for Hirakud Dam & Debrigarh Sanctuary',
      'Burla university and campus student tour charters'
    ]
  }
};

export default function CityHub() {
  const { city } = useParams<{ city: string }>();
  const normalizedCity = (city || 'bhubaneswar').toLowerCase();
  const cityData = CITIES[normalizedCity] || CITIES.bhubaneswar;

  const breadcrumbs = [
    { name: 'Home', path: '/' },
    { name: 'City Bus Rental', path: '/vehicles' },
    { name: `${cityData.name} Bus Rental`, path: `/bus-rental/${normalizedCity}` }
  ];

  return (
    <Layout>
      <SEOHead
        title={cityData.metaTitle}
        description={cityData.metaDescription}
        canonicalPath={`/bus-rental/${normalizedCity}`}
        jsonLd={[
          getLocalBusinessSchema(),
          getBreadcrumbSchema(breadcrumbs),
          getFAQSchema(cityData.faqs)
        ]}
      />

      {/* Hero Header */}
      <section className="bg-primary text-primary-foreground py-14 md:py-20 border-b border-white/10 relative overflow-hidden">
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-accent text-[#081829] font-bold text-xs uppercase tracking-wider mb-4 shadow-xs">
              <MapPin className="w-3.5 h-3.5 text-[#081829]" />
              <span>Verified Fleet in {cityData.name}, Odisha</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-4 leading-tight">
              Bus Rental & Tempo Traveller Hire in{' '}
              <span className="text-accent">{cityData.name}</span>
            </h1>
            <p className="text-base md:text-lg text-slate-200 leading-relaxed mb-8">
              {cityData.tagline}. Choose from 12-seater tempo travellers to 55-seater Volvo coaches with certified chauffeurs, all-inclusive pricing, and zero hidden costs.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link to={`/inquiry?city=${cityData.name}`}>
                <Button variant="accent" size="lg" className="font-bold shadow-md">
                  Get Instant Quote in {cityData.name}
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

      {/* Highlights & Pickup Hubs */}
      <section className="py-12 bg-card border-b border-border">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            <div>
              <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-accent" />
                Popular Pickup Hubs in {cityData.name}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {cityData.popularPickupPoints.map((point) => (
                  <div key={point} className="flex items-center gap-2 text-xs sm:text-sm text-foreground/80 p-2.5 rounded-lg bg-muted/40 border">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{point}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-accent" />
                Why Rent in {cityData.name} with Us
              </h2>
              <ul className="space-y-3">
                {cityData.localHighlights.map((highlight) => (
                  <li key={highlight} className="flex items-start gap-2.5 text-xs sm:text-sm text-muted-foreground">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Transparent Pricing Table */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-accent mb-2 block">
              Transparent Pricing Guide
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-foreground">
              Estimated Bus Hire Rates in {cityData.name}
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground mt-2">
              All prices include verified driver allowance and commercial passenger permits.
            </p>
          </div>

          <div className="max-w-4xl mx-auto bg-card rounded-2xl border shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-muted text-foreground/80 font-bold border-b">
                  <tr>
                    <th className="p-4">Vehicle Category</th>
                    <th className="p-4">Capacity</th>
                    <th className="p-4">Daily Charter Rate</th>
                    <th className="p-4">Approx Per Km Rate</th>
                    <th className="p-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {cityData.pricingTable.map((row) => (
                    <tr key={row.type} className="hover:bg-muted/30 transition-colors">
                      <td className="p-4 font-semibold text-foreground">{row.type}</td>
                      <td className="p-4 text-muted-foreground">{row.capacity}</td>
                      <td className="p-4 font-bold text-primary">{row.ratePerDay} / day</td>
                      <td className="p-4 text-muted-foreground">{row.ratePerKm}</td>
                      <td className="p-4 text-right">
                        <Link to={`/inquiry?city=${cityData.name}&vehicleType=${encodeURIComponent(row.type)}`}>
                          <Button size="sm" variant="accent" className="font-semibold text-xs">
                            Select
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

      {/* Available Fleet in Region */}
      <section className="py-16 bg-muted/20 border-t border-border">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-accent mb-1 block">
                Inspected Fleet
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                Popular Vehicles Available for {cityData.name} Dispatch
              </h2>
            </div>
            <Link to="/vehicles">
              <Button variant="outline" size="sm" className="gap-2">
                View Full Fleet <ArrowRight className="w-4 h-4" />
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

      {/* Local FAQs */}
      <section className="py-16 bg-card border-t border-border">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-foreground flex items-center justify-center gap-2">
              <HelpCircle className="w-6 h-6 text-accent" />
              Frequently Asked Questions for {cityData.name} Bus Hire
            </h2>
          </div>

          <div className="space-y-4">
            {cityData.faqs.map((faq, i) => (
              <div key={i} className="p-5 rounded-xl border bg-background space-y-2">
                <h3 className="font-bold text-foreground text-sm sm:text-base">{faq.question}</h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 p-8 rounded-2xl bg-primary text-primary-foreground text-center space-y-4">
            <h3 className="text-2xl font-bold text-white">Need a Custom Route from {cityData.name}?</h3>
            <p className="text-sm text-slate-200 max-w-xl mx-auto">
              Our travel specialists will calculate exact mileage, tolls, and driver allowances for your personalized itinerary.
            </p>
            <div className="flex justify-center gap-4 pt-2">
              <Link to={`/inquiry?city=${cityData.name}`}>
                <Button variant="accent" size="lg" className="font-bold">
                  Request Custom Itinerary Quote
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
