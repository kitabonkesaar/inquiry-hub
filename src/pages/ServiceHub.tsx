import { useParams, Link } from 'react-router-dom';
import { 
  Heart, Building2, Landmark, Plane, ShieldCheck, CheckCircle2, 
  ArrowRight, Phone, Clock, Users, Star, Sparkles, HelpCircle 
} from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { SEOHead } from '@/components/seo/SEOHead';
import { getBreadcrumbSchema, getFAQSchema, getLocalBusinessSchema } from '@/components/seo/schemaData';
import { vehicles as defaultVehicles } from '@/data/vehicles';
import { VehicleCard } from '@/components/vehicles/VehicleCard';

interface ServiceData {
  title: string;
  badge: string;
  tagline: string;
  metaTitle: string;
  metaDescription: string;
  icon: any;
  overview: string;
  fleetRecommendations: Array<{
    name: string;
    capacity: string;
    idealFor: string;
    rateEstimate: string;
  }>;
  perks: string[];
  faqs: Array<{ question: string; answer: string }>;
}

const SERVICES: Record<string, ServiceData> = {
  'wedding-bus-rental': {
    title: 'Wedding Bus Rental & Barat Bus Hire in Odisha',
    badge: 'Odisha Wedding Transit Specialists',
    tagline: 'Luxury AC coaches, Force Urbanias & decorated Barat buses for seamless marriage logistics in Bhubaneswar & Cuttack',
    metaTitle: 'Wedding Bus Rental in Odisha | Barat Bus Hire Bhubaneswar & Cuttack | RentAnyBus',
    metaDescription: 'Hire luxury AC buses, Maharaja tempo travellers & barat coaches for weddings in Bhubaneswar, Cuttack & Puri. Reliable guest shuttles with professional drivers.',
    icon: Heart,
    overview: 'Ensure your wedding guests, relatives, and VIP attendees travel in supreme comfort. From airport transfers at BBI to festive Barat processions with high-power audio systems and decorated coaches, we manage end-to-end wedding transit with zero delays.',
    fleetRecommendations: [
      { name: '17 Seater Force Urbania VIP', capacity: '16–17 Guests', idealFor: 'Bride/Groom immediate family, photoshoot teams', rateEstimate: '₹8,500 / day' },
      { name: '26 Seater AC Luxury Traveller', capacity: '26 Guests', idealFor: 'Out-of-town guest hotel-to-mandap shuttle', rateEstimate: '₹10,500 / day' },
      { name: '45–50 Seater Barat Pushback Coach', capacity: '50 Guests', idealFor: 'Festive Barat procession & extended relatives', rateEstimate: '₹17,500 / day' },
      { name: 'Multi-Vehicle Wedding Convoy', capacity: '100–300 Guests', idealFor: 'Coordinated fleet across multiple hotel venues', rateEstimate: 'Custom Package' },
    ],
    perks: [
      'Punctual hotel-to-mandap guest shuttles across Bhubaneswar & Cuttack',
      'Option for floral bus decoration and professional Barat chauffeurs',
      'Large luggage boot compartments for heavy bridal trunks & gifts',
      'Dual-chilled AC systems ensuring guest makeup and finery stay pristine',
      'Dedicated dispatch coordinator on standby for last-minute schedule changes'
    ],
    faqs: [
      {
        question: 'Can you handle multiple pickups from railway station and airport for wedding guests?',
        answer: 'Yes. Our wedding logistics managers track flight arrivals at BBI Airport and train schedules at Bhubaneswar and Cuttack stations, ensuring prompt guest pickup.'
      },
      {
        question: 'Can the bus be decorated for the wedding Barat?',
        answer: 'Yes, we provide bus decoration options or allow external floral decorators to coordinate with the vehicle owner before the Barat procession begins.'
      },
      {
        question: 'What happens if a wedding event runs late into the night?',
        answer: 'We understand wedding ceremonies can extend past midnight. Our drivers are briefed beforehand, and reasonable night driver batta is transparently arranged.'
      }
    ]
  },
  'corporate-bus-rental': {
    title: 'Corporate Bus Rental & Employee Commute in Bhubaneswar',
    badge: 'Enterprise Transportation',
    tagline: 'Reliable employee shuttles, executive Force Urbanias & conference transit for Infocity IT corridor and industrial parks',
    metaTitle: 'Corporate Bus Rental Bhubaneswar | Employee Commute & Event Bus Hire | RentAnyBus',
    metaDescription: 'Rent executive buses and tempo travellers for corporate events, daily employee commute, and airport delegations in Bhubaneswar & Odisha. GST billing & verified drivers.',
    icon: Building2,
    overview: 'Streamline your enterprise workforce mobility with certified commercial fleets. RentAnyBus supports leading IT firms in Infocity Patia, industrial manufacturing units in Chandaka, and international conferences with compliant GPS-enabled coaches.',
    fleetRecommendations: [
      { name: '12–17 Seater Executive Traveller', capacity: '12–17 Executives', idealFor: 'Client delegation, leadership team travel', rateEstimate: '₹7,500 / day' },
      { name: '26 Seater Corporate Shuttle', capacity: '26 Staff', idealFor: 'Daily tech park shift commute & seminar transfers', rateEstimate: '₹9,500 / day' },
      { name: '45 Seater BharatBenz Luxury Coach', capacity: '45 Delegates', idealFor: 'Annual summits, conventions at Janata Maidan', rateEstimate: '₹16,500 / day' },
      { name: 'Monthly Contract Shuttles', capacity: 'Custom Fleet', idealFor: 'Recurring daily office routes with live GPS tracking', rateEstimate: 'Monthly Retainer' },
    ],
    perks: [
      '100% GST-compliant tax invoices and monthly billing reconciliation',
      'GPS vehicle tracking and vetted, professionally uniformed chauffeurs',
      'Fixed SLA on-time arrival guarantee for tech park shift pickups',
      'Full emergency backup fleet replacement within 45 minutes',
      'Clean interiors with working charging sockets and air conditioning'
    ],
    faqs: [
      {
        question: 'Do you provide formal GST invoices for corporate accounting?',
        answer: 'Yes. All enterprise charters are billed with valid GST invoices and full vendor compliance documentation.'
      },
      {
        question: 'Can we hire buses for delegates attending conferences at Janata Maidan?',
        answer: 'Yes, we regularly handle large-scale convention transport with dedicated coordinator managers on the ground.'
      },
      {
        question: 'Do you offer monthly recurring employee transit contracts?',
        answer: 'Yes, we manage long-term staff transportation contracts for tech firms, manufacturing plants, and educational institutions.'
      }
    ]
  },
  'pilgrimage-bus-rental': {
    title: 'Jagannath Puri Yatra & Temple Tour Bus Rental in Odisha',
    badge: 'Spiritual Tour Charters',
    tagline: 'Comfortable air-conditioned bus and tempo traveller hire for holy darshan across Puri Dham, Konark, Lingaraj & Tara Tarini',
    metaTitle: 'Jagannath Puri Yatra Bus Rental | Odisha Temple Tour Bus Hire | RentAnyBus',
    metaDescription: 'Book AC buses & tempo travellers for Jagannath Dham Puri pilgrimage, Konark Sun Temple, and Lingaraj Temple tours. Senior citizen friendly with doorstep pickup.',
    icon: Landmark,
    overview: 'Experience peaceful, hassle-free temple pilgrimages across sacred Odisha shrines. We specialize in senior-friendly itineraries with minimal walking, air-conditioned pushback seating, and drivers familiar with temple parking gates and Mahaprasad timings.',
    fleetRecommendations: [
      { name: '12–17 Seater Pushback Tempo Traveller', capacity: '12–17 Devotees', idealFor: 'Extended family Puri & Konark day darshan', rateEstimate: '₹6,500 / day' },
      { name: '26 Seater Pilgrim Bus', capacity: '26 Devotees', idealFor: 'Samaj and bhajan mandali group tours', rateEstimate: '₹10,000 / day' },
      { name: '45–50 Seater Yatra Coach', capacity: '50 Devotees', idealFor: 'Multi-day all-Odisha temple circuit yatra', rateEstimate: '₹17,000 / day' },
    ],
    perks: [
      'Senior citizen friendly: low footstep entry and smooth pushback reclining seats',
      'Knowledgeable chauffeurs who guide groups to Talabania & Grand Road parking',
      'Flexible itineraries allowing unhurried temple darshan and Mahaprasad meals',
      'Round-trip day excursions from Bhubaneswar to Puri, Konark, and Dhauli Stupa',
      'Spacious baggage compartments for pilgrim luggage, prasad, and beach gear'
    ],
    faqs: [
      {
        question: 'Where does the bus park in Puri during temple darshan?',
        answer: 'Our drivers utilize authorized municipal parking hubs at Talabania or near Grand Road, coordinating electric-rickshaw transit so elderly pilgrims avoid long walks.'
      },
      {
        question: 'Can we plan a 2-day trip covering Puri, Konark, and Chilika Lake?',
        answer: 'Yes, our 2-day pilgrimage package allows devotees to attend morning Mangala Alati in Puri, visit Konark in the afternoon, and cruise Chilika the following day.'
      }
    ]
  },
  'airport-transfer': {
    title: 'Bhubaneswar Airport Bus & Tempo Traveller Pickup (BBI)',
    badge: 'Airport Delegation Transit',
    tagline: 'Flight-tracked group pickups and drop-offs at Biju Patnaik International Airport with luggage assistance and chauffeur greeting',
    metaTitle: 'Bhubaneswar Airport Bus Rental | BBI Tempo Traveller Hire | RentAnyBus',
    metaDescription: 'Hire tempo travellers and buses for Biju Patnaik International Airport (BBI) pickups in Bhubaneswar. Flight tracking, luggage assistance, 24/7 service.',
    icon: Plane,
    overview: 'Never leave arriving guests stranded at the airport terminal. We provide flight-tracked arrivals at Biju Patnaik International Airport (BBI) with prompt pickup at commercial bays, experienced drivers, and immediate transfer to hotels or outstation destinations.',
    fleetRecommendations: [
      { name: '12–17 Seater Urbania Airport Shuttle', capacity: '12–16 Guests + 15 Bags', idealFor: 'Arriving delegations, wedding party arrivals', rateEstimate: '₹4,500 local transfer' },
      { name: '26 Seater AC Traveller with Luggage Carrier', capacity: '26 Guests + 25 Bags', idealFor: 'Sports squads, inbound tourist groups', rateEstimate: '₹6,500 local transfer' },
      { name: '45 Seater Deluxe Coach', capacity: '45 Passengers', idealFor: 'Corporate delegations & university teams', rateEstimate: '₹12,000 local transfer' },
    ],
    perks: [
      'Real-time flight radar tracking ensuring driver is parked before touchdown',
      'Chauffeur nameboard greeting service available at BBI Arrival terminal',
      'Direct highway departures to Cuttack, Puri, Paradip, and Berhampur',
      'Zero cancellation penalty for flight delays under 3 hours',
      'Assistance with luggage loading and heavy trolley bags'
    ],
    faqs: [
      {
        question: 'What if our inbound flight to Bhubaneswar is delayed?',
        answer: 'Our operations team tracks your flight status in real time. We adjust chauffeur pickup timing automatically with no extra charge.'
      },
      {
        question: 'Can the airport bus directly take us to Puri or Cuttack?',
        answer: 'Yes, we frequently operate direct BBI Airport to Puri temple or Cuttack wedding venue transfers without stopping in central city traffic.'
      }
    ]
  }
};

export default function ServiceHub() {
  const { serviceSlug } = useParams<{ serviceSlug: string }>();
  const normalizedSlug = (serviceSlug || 'wedding-bus-rental').toLowerCase();
  const service = SERVICES[normalizedSlug] || SERVICES['wedding-bus-rental'];
  const IconComponent = service.icon;

  const breadcrumbs = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/vehicles' },
    { name: service.title, path: `/services/${normalizedSlug}` }
  ];

  return (
    <Layout>
      <SEOHead
        title={service.metaTitle}
        description={service.metaDescription}
        canonicalPath={`/services/${normalizedSlug}`}
        jsonLd={[
          getLocalBusinessSchema(),
          getBreadcrumbSchema(breadcrumbs),
          getFAQSchema(service.faqs)
        ]}
      />

      {/* Hero Header */}
      <section className="bg-primary text-primary-foreground py-14 md:py-20 border-b border-white/10 relative overflow-hidden">
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-accent text-[#081829] font-bold text-xs uppercase tracking-wider mb-4 shadow-xs">
              <IconComponent className="w-3.5 h-3.5 text-[#081829]" />
              <span>{service.badge}</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-4 leading-tight">
              {service.title}
            </h1>
            <p className="text-base md:text-lg text-slate-200 leading-relaxed mb-8">
              {service.tagline}
            </p>

            <div className="flex flex-wrap gap-4">
              <Link to={`/inquiry?service=${encodeURIComponent(service.title)}`}>
                <Button variant="accent" size="lg" className="font-bold shadow-md">
                  Request Customized Quote
                </Button>
              </Link>
              <a href="tel:+918249529220">
                <Button variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10">
                  <Phone className="w-4 h-4 mr-2" /> Call Dispatch Desk
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Overview & Key Perks */}
      <section className="py-12 md:py-16 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-7">
              <h2 className="text-2xl md:text-3xl font-black text-foreground mb-4">
                Service Overview & Fleet Standards
              </h2>
              <p className="text-muted-foreground leading-relaxed text-base md:text-lg mb-8">
                {service.overview}
              </p>

              <div className="space-y-4">
                {service.perks.map((perk, idx) => (
                  <div key={idx} className="flex items-start gap-3 bg-muted/40 p-4 rounded-xl border border-border/50">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 mt-0.5 shrink-0" />
                    <span className="text-foreground text-sm md:text-base font-medium">{perk}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Fleet Recommendation Cards */}
            <div className="lg:col-span-5 bg-card border border-border rounded-2xl p-6 shadow-sm">
              <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-accent" /> Recommended Vehicle Configurations
              </h3>
              <div className="space-y-4">
                {service.fleetRecommendations.map((fleet, idx) => (
                  <div key={idx} className="p-4 rounded-xl border border-border/80 bg-background/50 hover:border-primary/40 transition-colors">
                    <div className="flex justify-between items-start mb-1">
                      <h4 className="font-bold text-foreground text-sm">{fleet.name}</h4>
                      <Badge variant="outline" className="text-xs bg-accent/20 border-accent/40 font-semibold text-foreground">
                        {fleet.rateEstimate}
                      </Badge>
                    </div>
                    <div className="text-xs text-muted-foreground mb-1">Capacity: {fleet.capacity}</div>
                    <p className="text-xs text-slate-500">{fleet.idealFor}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-border">
                <Link to="/inquiry" className="w-full block">
                  <Button variant="accent" className="w-full font-bold">
                    Check Date Availability <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Available Vehicles Showcase */}
      <section className="py-12 bg-muted/30 border-y border-border">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-black text-foreground mb-2">
                Verified Vehicles Ready For Hire
              </h2>
              <p className="text-muted-foreground text-sm">
                Clean, inspected coaches driven by background-checked chauffeurs.
              </p>
            </div>
            <Link to="/vehicles" className="text-primary font-bold text-sm inline-flex items-center hover:underline mt-4 md:mt-0">
              Browse all 12–55 seater fleet <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {defaultVehicles.slice(0, 3).map((vehicle) => (
              <VehicleCard key={vehicle.id} vehicle={vehicle} />
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-12 md:py-16 bg-background">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-black text-foreground mb-2">
              Frequently Asked Questions
            </h2>
            <p className="text-muted-foreground text-sm">
              Common questions answered about {service.title.toLowerCase()} in Odisha.
            </p>
          </div>

          <div className="space-y-4">
            {service.faqs.map((faq, index) => (
              <div key={index} className="border border-border rounded-xl p-5 bg-card">
                <h3 className="font-bold text-foreground text-base mb-2 flex items-start gap-2">
                  <HelpCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  {faq.question}
                </h3>
                <p className="text-muted-foreground text-sm pl-7 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final Bottom Call-to-Action */}
      <section className="bg-primary text-primary-foreground py-14">
        <div className="container mx-auto px-4 lg:px-8 text-center max-w-2xl">
          <h2 className="text-2xl md:text-3xl font-black text-white mb-4">
            Need Expert Logistics Coordination for Your Event?
          </h2>
          <p className="text-slate-200 text-sm md:text-base mb-8">
            Tell us your passenger count, travel dates, and route. Our Odisha dispatch team will organize the right vehicle with guaranteed punctuality.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/inquiry">
              <Button variant="accent" size="lg" className="font-bold">
                Get an Instant Quote
              </Button>
            </Link>
            <a href="tel:+918249529220">
              <Button variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10">
                <Phone className="w-4 h-4 mr-2" /> +91 82495 29220
              </Button>
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
}
