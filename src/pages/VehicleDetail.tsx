import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Users, Snowflake, Wind, Check, Calendar, Phone, MessageCircle } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { vehicles } from '@/data/vehicles';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { VehicleCard } from '@/components/vehicles/VehicleCard';
import { cn } from '@/lib/utils';

const availabilityConfig = {
  available: { label: 'Available', className: 'bg-success/10 text-success border-success/20', description: 'This vehicle is available for most dates.' },
  limited: { label: 'Limited Availability', className: 'bg-warning/10 text-warning border-warning/20', description: 'Some dates are already booked. Contact us to check your dates.' },
  booked: { label: 'Fully Booked', className: 'bg-destructive/10 text-destructive border-destructive/20', description: 'This vehicle is fully booked. Consider similar vehicles below.' },
};

export default function VehicleDetailPage() {
  const { id } = useParams();
  const vehicle = vehicles.find((v) => v.id === id);

  if (!vehicle) {
    return (
      <Layout>
        <section className="py-24">
          <div className="container mx-auto px-4 lg:px-8 text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">Vehicle Not Found</h1>
            <p className="text-muted-foreground mb-6">The vehicle you're looking for doesn't exist.</p>
            <Link to="/vehicles">
              <Button variant="accent">Browse All Vehicles</Button>
            </Link>
          </div>
        </section>
      </Layout>
    );
  }

  const availability = availabilityConfig[vehicle.availability];
  const similarVehicles = vehicles
    .filter((v) => v.id !== vehicle.id && v.type === vehicle.type)
    .slice(0, 3);

  return (
    <Layout>
      {/* Breadcrumb */}
      <section className="bg-muted/50 py-4">
        <div className="container mx-auto px-4 lg:px-8">
          <Link to="/vehicles" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Fleet
          </Link>
        </div>
      </section>

      {/* Vehicle Details */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Image Gallery */}
            <div className="space-y-4">
              <div className="aspect-video rounded-2xl bg-muted overflow-hidden">
                <img
                  src={vehicle.images[0]}
                  alt={vehicle.name}
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Thumbnail strip could go here */}
            </div>

            {/* Vehicle Info */}
            <div>
              {/* Badges */}
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge className="bg-primary text-primary-foreground">
                  {vehicle.type === 'bus' ? 'Bus' : 'Tempo Traveller'}
                </Badge>
                <Badge className={cn('border', availability.className)}>
                  {availability.label}
                </Badge>
              </div>

              {/* Title */}
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                {vehicle.name}
              </h1>

              {/* Quick Info */}
              <div className="flex flex-wrap gap-6 mb-6 pb-6 border-b border-border">
                <div className="flex items-center gap-2 text-foreground">
                  <Users className="w-5 h-5 text-accent" />
                  <span className="font-semibold">{vehicle.seatingCapacity}</span>
                  <span className="text-muted-foreground">Seats</span>
                </div>
                <div className="flex items-center gap-2 text-foreground">
                  {vehicle.category === 'ac' ? (
                    <>
                      <Snowflake className="w-5 h-5 text-accent" />
                      <span>Air Conditioned</span>
                    </>
                  ) : (
                    <>
                      <Wind className="w-5 h-5 text-accent" />
                      <span>Non-AC</span>
                    </>
                  )}
                </div>
              </div>

              {/* Description */}
              <p className="text-muted-foreground mb-6">
                {vehicle.description}
              </p>

              {/* Amenities */}
              <div className="mb-6">
                <h3 className="font-semibold text-foreground mb-3">Amenities</h3>
                <div className="grid grid-cols-2 gap-2">
                  {vehicle.amenities.map((amenity) => (
                    <div key={amenity} className="flex items-center gap-2 text-muted-foreground">
                      <Check className="w-4 h-4 text-success" />
                      {amenity}
                    </div>
                  ))}
                </div>
              </div>

              {/* Ideal For */}
              <div className="mb-6">
                <h3 className="font-semibold text-foreground mb-3">Ideal For</h3>
                <div className="flex flex-wrap gap-2">
                  {vehicle.idealFor.map((item) => (
                    <span key={item} className="px-3 py-1 rounded-full bg-accent/10 text-accent text-sm">
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* Availability Info */}
              <div className="p-4 rounded-xl bg-muted/50 border border-border mb-6">
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-accent mt-0.5" />
                  <div>
                    <p className="font-semibold text-foreground">{availability.label}</p>
                    <p className="text-sm text-muted-foreground">{availability.description}</p>
                  </div>
                </div>
              </div>

              {/* Price */}
              <div className="mb-8">
                <span className="text-muted-foreground">Starting from</span>
                <p className="text-3xl font-bold text-foreground">{vehicle.pricePerDay}<span className="text-lg font-normal text-muted-foreground">/day</span></p>
                <p className="text-sm text-muted-foreground mt-1">*Final price may vary based on route and duration</p>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to={`/inquiry?vehicle=${vehicle.id}`} className="flex-1">
                  <Button variant="accent" size="lg" className="w-full">
                    Request Quote
                  </Button>
                </Link>
                <a href="tel:+919876543210" className="flex-1">
                  <Button variant="outline" size="lg" className="w-full">
                    <Phone className="w-4 h-4" />
                    Call Now
                  </Button>
                </a>
                <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="lg">
                    <MessageCircle className="w-4 h-4" />
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Similar Vehicles */}
      {similarVehicles.length > 0 && (
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4 lg:px-8">
            <h2 className="text-2xl font-bold text-foreground mb-8">Similar Vehicles</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {similarVehicles.map((v) => (
                <VehicleCard key={v.id} vehicle={v} />
              ))}
            </div>
          </div>
        </section>
      )}
    </Layout>
  );
}
