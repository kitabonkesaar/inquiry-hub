import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, Users, Snowflake, Wind, Check, Calendar, Phone, MessageCircle, 
  RefreshCw, Wifi, Zap, Music, Armchair, Droplets, Tv, ShieldCheck, MapPin, 
  Clock, CreditCard, Star, Grip, Share2
} from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { useVehicles } from '@/hooks/useVehicles';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { VehicleCard } from '@/components/vehicles/VehicleCard';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';

const availabilityConfig = {
  available: { 
    label: 'Available', 
    className: 'bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400 dark:border-emerald-800', 
    description: 'This vehicle is available for immediate booking.' 
  },
  limited: { 
    label: 'Limited Availability', 
    className: 'bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800', 
    description: 'Dates are filling up fast. Check availability now.' 
  },
  booked: { 
    label: 'Fully Booked', 
    className: 'bg-rose-100 text-rose-700 border-rose-200 dark:bg-rose-900/30 dark:text-rose-400 dark:border-rose-800', 
    description: 'Currently unavailable for selected dates.' 
  },
};

const getAmenityIcon = (name: string) => {
  const lower = name.toLowerCase();
  if (lower.includes('wifi')) return Wifi;
  if (lower.includes('ac') && !lower.includes('non')) return Snowflake;
  if (lower.includes('charging') || lower.includes('usb') || lower.includes('plug')) return Zap;
  if (lower.includes('music') || lower.includes('audio') || lower.includes('speaker')) return Music;
  if (lower.includes('tv') || lower.includes('screen') || lower.includes('entertainment')) return Tv;
  if (lower.includes('seat') || lower.includes('push-back') || lower.includes('reclining')) return Armchair;
  if (lower.includes('water') || lower.includes('bottle') || lower.includes('refreshment')) return Droplets;
  if (lower.includes('first aid') || lower.includes('safety')) return ShieldCheck;
  return Check;
};

export default function VehicleDetailPage() {
  const { id } = useParams();
  const { vehicles: allVehicles, loading } = useVehicles();
  const vehicle = allVehicles.find((v) => v.id === id);

  if (loading) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-muted-foreground">
          <RefreshCw className="w-10 h-10 animate-spin mb-4 text-primary" />
          <p className="text-lg font-medium">Loading vehicle details...</p>
        </div>
      </Layout>
    );
  }

  if (!vehicle) {
    return (
      <Layout>
        <section className="py-24">
          <div className="container mx-auto px-4 lg:px-8 text-center max-w-md">
            <div className="bg-muted/30 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
              <BusIcon className="w-10 h-10 text-muted-foreground" />
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-4">Vehicle Not Found</h1>
            <p className="text-muted-foreground mb-8">The vehicle you're looking for might have been removed or is temporarily unavailable.</p>
            <Link to="/vehicles">
              <Button size="lg" className="w-full">Browse All Vehicles</Button>
            </Link>
          </div>
        </section>
      </Layout>
    );
  }

  const availability = availabilityConfig[vehicle.availability];
  const similarVehicles = allVehicles
    .filter((v) => v.id !== vehicle.id && v.type === vehicle.type)
    .slice(0, 3);

  // Default layout if not present
  const busLayout = (vehicle as any).bus_layout || '2x2';

  return (
    <Layout>
      {/* Breadcrumb Area */}
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-10">
        <div className="container mx-auto px-4 lg:px-8 py-3">
          <Link 
            to="/vehicles" 
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Fleet
          </Link>
        </div>
      </div>

      <div className="bg-muted/10 min-h-screen">
        <div className="container mx-auto px-4 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 xl:gap-12">
            
            {/* Left Column - Main Content */}
            <div className="lg:col-span-2 space-y-8">
              
              {/* Image Gallery */}
              <div className="rounded-2xl overflow-hidden border bg-background shadow-sm">
                <Carousel className="w-full">
                  <CarouselContent>
                    {vehicle.images.map((image, index) => (
                      <CarouselItem key={index}>
                        <div className="aspect-video relative group">
                          <img
                            src={image}
                            alt={`${vehicle.name} - View ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute top-4 left-4 flex gap-2 z-10">
                            <Badge className="bg-background/90 text-foreground hover:bg-background/100 backdrop-blur shadow-sm border-0">
                              {vehicle.type === 'bus' ? 'Bus' : 'Tempo Traveller'}
                            </Badge>
                          </div>
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  {vehicle.images.length > 1 && (
                    <>
                      <CarouselPrevious className="left-4" />
                      <CarouselNext className="right-4" />
                    </>
                  )}
                  
                  {/* Share Button (Overlay) */}
                  <div className="absolute top-4 right-4 z-10">
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className="rounded-full bg-background/90 hover:bg-background backdrop-blur border-0 shadow-sm" 
                      onClick={() => {
                        const text = `Check out this ${vehicle.name} on RentAnyBus: ${window.location.href}`;
                        window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
                      }}
                      title="Share on WhatsApp"
                    >
                      <Share2 className="w-5 h-5" />
                    </Button>
                  </div>
                </Carousel>
              </div>

              {/* Title & Description */}
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h1 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight mb-2">
                      {vehicle.name}
                    </h1>
                    <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" /> Available for Outstation
                      </span>
                      <span className="w-1 h-1 rounded-full bg-border" />
                      <span className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-amber-400 fill-amber-400" /> 4.8 Rating
                      </span>
                    </div>
                  </div>
                </div>
                
                <p className="text-muted-foreground text-lg leading-relaxed border-l-4 border-primary/20 pl-4">
                  {vehicle.description}
                </p>
              </div>

              {/* Specs Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="bg-card p-4 rounded-xl border shadow-sm flex flex-col items-center text-center gap-2 hover:border-primary/50 transition-colors">
                  <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center dark:bg-blue-900/20">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground font-medium">Capacity</p>
                    <p className="font-semibold">{vehicle.seatingCapacity} Seats</p>
                  </div>
                </div>

                <div className="bg-card p-4 rounded-xl border shadow-sm flex flex-col items-center text-center gap-2 hover:border-primary/50 transition-colors">
                  <div className="w-10 h-10 rounded-full bg-cyan-50 text-cyan-600 flex items-center justify-center dark:bg-cyan-900/20">
                    {vehicle.category === 'ac' ? <Snowflake className="w-5 h-5" /> : <Wind className="w-5 h-5" />}
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground font-medium">Climate</p>
                    <p className="font-semibold">{vehicle.category === 'ac' ? 'AC' : 'Non-AC'}</p>
                  </div>
                </div>

                <div className="bg-card p-4 rounded-xl border shadow-sm flex flex-col items-center text-center gap-2 hover:border-primary/50 transition-colors">
                  <div className="w-10 h-10 rounded-full bg-violet-50 text-violet-600 flex items-center justify-center dark:bg-violet-900/20">
                    <Grip className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground font-medium">Layout</p>
                    <p className="font-semibold">{busLayout}</p>
                  </div>
                </div>

                <div className="bg-card p-4 rounded-xl border shadow-sm flex flex-col items-center text-center gap-2 hover:border-primary/50 transition-colors">
                  <div className="w-10 h-10 rounded-full bg-orange-50 text-orange-600 flex items-center justify-center dark:bg-orange-900/20">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground font-medium">Safety</p>
                    <p className="font-semibold">Verified</p>
                  </div>
                </div>
              </div>

              {/* Amenities */}
              <div className="bg-card rounded-2xl border shadow-sm p-6 sm:p-8">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <Star className="w-5 h-5 text-primary" /> Premium Amenities
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-4 gap-x-8">
                  {vehicle.amenities.map((amenity) => {
                    const Icon = getAmenityIcon(amenity);
                    return (
                      <div key={amenity} className="flex items-center gap-3 group">
                        <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                          <Icon className="w-4 h-4" />
                        </div>
                        <span className="font-medium text-foreground/90">{amenity}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Ideal For */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Perfect For</h3>
                <div className="flex flex-wrap gap-2">
                  {vehicle.idealFor.map((item) => (
                    <Badge key={item} variant="secondary" className="px-4 py-2 text-sm font-normal bg-muted hover:bg-muted/80">
                      {item}
                    </Badge>
                  ))}
                </div>
              </div>

            </div>

            {/* Right Column - Booking Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                
                <div className="bg-card rounded-2xl border shadow-lg overflow-hidden">
                  <div className="p-6 space-y-6">
                    <div>
                      <p className="text-sm text-muted-foreground font-medium mb-1">Starting Price</p>
                      <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-bold text-primary">{vehicle.pricePerDay}</span>
                        <span className="text-muted-foreground">/ day</span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
                        <Clock className="w-3 h-3" /> Includes driver charges
                      </p>
                    </div>

                    <div className={cn("p-4 rounded-xl border flex items-start gap-3", availability.className)}>
                      <Calendar className="w-5 h-5 mt-0.5 shrink-0" />
                      <div>
                        <p className="font-semibold text-sm">{availability.label}</p>
                        <p className="text-xs opacity-90 mt-1">{availability.description}</p>
                      </div>
                    </div>

                    <div className="space-y-3 pt-2">
                      <Link to={`/inquiry?vehicle=${vehicle.id}`} className="block">
                        <Button className="w-full h-12 text-base shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all">
                          Get Instant Quote
                        </Button>
                      </Link>
                      
                      <div className="grid grid-cols-2 gap-3">
                        <a href="tel:+918249529220" className="block">
                          <Button variant="outline" className="w-full h-11 border-primary/20 hover:bg-primary/5 hover:text-primary">
                            <Phone className="w-4 h-4 mr-2" />
                            Call
                          </Button>
                        </a>
                        <a 
                          href={`https://wa.me/918249529220?text=${encodeURIComponent(`Hi, I am interested in ${vehicle.name} (Price: ${vehicle.pricePerDay}/day). Is it available?`)}`}
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="block"
                        >
                          <Button variant="outline" className="w-full h-11 border-primary/20 hover:bg-primary/5 hover:text-primary">
                            <MessageCircle className="w-4 h-4 mr-2" />
                            WhatsApp
                          </Button>
                        </a>
                      </div>
                    </div>

                    <div className="text-xs text-muted-foreground text-center pt-2">
                      <p>No booking fees • Free cancellation available</p>
                    </div>
                  </div>
                  
                  <div className="bg-muted/30 p-4 border-t border-border/50">
                    <div className="flex items-center justify-center gap-4 text-muted-foreground">
                       <div className="flex flex-col items-center gap-1">
                          <ShieldCheck className="w-5 h-5 text-primary/60" />
                          <span className="text-[10px] uppercase tracking-wider font-semibold">Verified</span>
                       </div>
                       <div className="w-px h-8 bg-border" />
                       <div className="flex flex-col items-center gap-1">
                          <CreditCard className="w-5 h-5 text-primary/60" />
                          <span className="text-[10px] uppercase tracking-wider font-semibold">Secure</span>
                       </div>
                       <div className="w-px h-8 bg-border" />
                       <div className="flex flex-col items-center gap-1">
                          <Clock className="w-5 h-5 text-primary/60" />
                          <span className="text-[10px] uppercase tracking-wider font-semibold">24/7 Support</span>
                       </div>
                    </div>
                  </div>
                </div>

                {/* Contact Info Card */}
                <div className="bg-card rounded-xl border p-5 shadow-sm">
                   <h4 className="font-semibold mb-3 text-sm">Need help deciding?</h4>
                   <p className="text-sm text-muted-foreground mb-4">
                     Our travel experts can help you choose the perfect vehicle for your trip.
                   </p>
                   <div className="flex items-center gap-3 text-sm font-medium">
                     <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                       <Phone className="w-4 h-4" />
                     </div>
                     <div>
                       <p className="text-xs text-muted-foreground">Call us at</p>
                       <p>+91 82495 29220</p>
                     </div>
                   </div>
                </div>

              </div>
            </div>
          </div>

          {/* Similar Vehicles Section */}
          {similarVehicles.length > 0 && (
            <div className="mt-20">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-foreground">Similar Vehicles</h2>
                <Link to="/vehicles">
                  <Button variant="ghost" className="gap-2">
                    View All <ArrowLeft className="w-4 h-4 rotate-180" />
                  </Button>
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {similarVehicles.map((v) => (
                  <VehicleCard key={v.id} vehicle={v} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

// Simple Bus Icon for 404 state
function BusIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8 6v6" />
      <path d="M15 6v6" />
      <path d="M2 12h19.6" />
      <path d="M18 18h3s.5-1.7.8-2.8c.1-.4.2-.8.2-1.2 0-.4-.1-.8-.2-1.2l-1.4-5C20.1 6.8 19.1 6 18 6H4a2 2 0 0 0-2 2v10h3" />
      <circle cx="7" cy="18" r="2" />
      <path d="M9 18h5" />
      <circle cx="16" cy="18" r="2" />
    </svg>
  )
}
