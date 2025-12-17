import { Link } from 'react-router-dom';
import { Users, Snowflake, Wind, ArrowRight } from 'lucide-react';
import { Vehicle } from '@/data/vehicles';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface VehicleCardProps {
  vehicle: Vehicle;
}

const availabilityConfig = {
  available: { label: 'Available', className: 'bg-success/10 text-success border-success/20' },
  limited: { label: 'Limited Dates', className: 'bg-warning/10 text-warning border-warning/20' },
  booked: { label: 'Fully Booked', className: 'bg-destructive/10 text-destructive border-destructive/20' },
};

export function VehicleCard({ vehicle }: VehicleCardProps) {
  const availability = availabilityConfig[vehicle.availability];

  return (
    <div className="group rounded-2xl bg-card border border-border card-shadow hover:card-hover-shadow transition-all duration-500 overflow-hidden hover:-translate-y-1">
      {/* Image */}
      <div className="relative h-48 bg-muted overflow-hidden">
        <img
          src={vehicle.images[0]}
          alt={vehicle.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {/* Availability Badge */}
        <Badge className={cn('absolute top-4 right-4 border', availability.className)}>
          {availability.label}
        </Badge>
        {/* Category Badge */}
        <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground">
          {vehicle.type === 'bus' ? 'Bus' : 'Traveller'}
        </Badge>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-accent transition-colors">
          {vehicle.name}
        </h3>

        {/* Features */}
        <div className="flex flex-wrap gap-3 mb-4">
          <div className="flex items-center gap-1 text-muted-foreground text-sm">
            <Users className="w-4 h-4" />
            <span>{vehicle.seatingCapacity} Seats</span>
          </div>
          <div className="flex items-center gap-1 text-muted-foreground text-sm">
            {vehicle.category === 'ac' ? (
              <>
                <Snowflake className="w-4 h-4" />
                <span>AC</span>
              </>
            ) : (
              <>
                <Wind className="w-4 h-4" />
                <span>Non-AC</span>
              </>
            )}
          </div>
        </div>

        {/* Amenities Preview */}
        <div className="flex flex-wrap gap-2 mb-4">
          {vehicle.amenities.slice(0, 3).map((amenity) => (
            <span key={amenity} className="px-2 py-1 rounded-md bg-muted text-muted-foreground text-xs">
              {amenity}
            </span>
          ))}
          {vehicle.amenities.length > 3 && (
            <span className="px-2 py-1 rounded-md bg-muted text-muted-foreground text-xs">
              +{vehicle.amenities.length - 3} more
            </span>
          )}
        </div>

        {/* Price & CTA */}
        <div className="flex items-center justify-between pt-4 border-t border-border">
          <div>
            <span className="text-sm text-muted-foreground">Starting from</span>
            <p className="text-xl font-bold text-foreground">{vehicle.pricePerDay}</p>
          </div>
          <Link to={`/vehicles/${vehicle.id}`}>
            <Button variant="accent" size="sm" className="group/btn">
              View Details
              <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
