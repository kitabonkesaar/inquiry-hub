import { Link } from 'react-router-dom';
import { Users, Snowflake, Wind, ArrowRight, Grip } from 'lucide-react';
import { Vehicle } from '@/data/vehicles';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface VehicleCardProps {
  vehicle: Vehicle;
}

const availabilityConfig = {
  available: { label: 'Available', className: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/25' },
  limited: { label: 'Filling Fast', className: 'bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/25' },
  booked: { label: 'Fully Booked', className: 'bg-rose-500/10 text-rose-700 dark:text-rose-400 border-rose-500/25' },
};

export function VehicleCard({ vehicle }: VehicleCardProps) {
  const availability = availabilityConfig[vehicle.availability] || availabilityConfig.available;

  // Ensure Indian currency formatting (e.g. ₹15,000)
  const numericPrice = parseInt(vehicle.pricePerDay.replace(/[^\d]/g, ''), 10);
  const formattedPrice = !isNaN(numericPrice) && numericPrice > 0
    ? `₹${numericPrice.toLocaleString('en-IN')}`
    : vehicle.pricePerDay;

  return (
    <div className="group rounded-2xl bg-card border border-border shadow-xs hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col h-full hover:border-secondary/40">
      {/* 16:9 Image Container */}
      <div className="relative aspect-video bg-muted overflow-hidden">
        <img
          src={vehicle.images[0]}
          alt={vehicle.name}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {/* Availability Badge */}
        <Badge className={cn('absolute top-3.5 right-3.5 border text-xs font-semibold backdrop-blur-xs', availability.className)}>
          {availability.label}
        </Badge>
        {/* Vehicle Type Badge */}
        <Badge className="absolute top-3.5 left-3.5 bg-primary text-primary-foreground font-semibold text-xs shadow-xs">
          {vehicle.type === 'bus' ? 'Bus' : 'Tempo Traveller'}
        </Badge>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1 justify-between">
        <div>
          <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-secondary transition-colors line-clamp-1">
            {vehicle.name}
          </h3>

          {/* Key Specs */}
          <div className="flex flex-wrap items-center gap-3 mb-3 text-xs text-muted-foreground">
            <div className="flex items-center gap-1 font-medium text-foreground/80">
              <Users className="w-3.5 h-3.5 text-secondary" />
              <span>{vehicle.seatingCapacity} Seats</span>
            </div>
            <div className="flex items-center gap-1">
              <Grip className="w-3.5 h-3.5 text-muted-foreground" />
              <span>{vehicle.bus_layout || '2x2'}</span>
            </div>
            <div className="flex items-center gap-1 font-medium">
              {vehicle.category === 'ac' ? (
                <>
                  <Snowflake className="w-3.5 h-3.5 text-secondary" />
                  <span className="text-secondary">AC Coach</span>
                </>
              ) : (
                <>
                  <Wind className="w-3.5 h-3.5 text-muted-foreground" />
                  <span>Non-AC</span>
                </>
              )}
            </div>
          </div>

          {/* Amenities Preview */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {vehicle.amenities.slice(0, 3).map((amenity) => (
              <span key={amenity} className="px-2 py-0.5 rounded-md bg-muted/60 text-muted-foreground text-[11px]">
                {amenity}
              </span>
            ))}
            {vehicle.amenities.length > 3 && (
              <span className="px-1.5 py-0.5 rounded-md bg-muted/40 text-muted-foreground text-[11px]">
                +{vehicle.amenities.length - 3} more
              </span>
            )}
          </div>
        </div>

        {/* Price & Action */}
        <div className="flex items-center justify-between pt-3.5 border-t border-border mt-2">
          <div>
            <span className="text-[11px] text-muted-foreground block">Starting from</span>
            <div className="flex items-baseline gap-1">
              <span className="text-lg font-bold text-foreground">{formattedPrice}</span>
              <span className="text-[11px] text-muted-foreground font-normal">/ day</span>
            </div>
          </div>
          <Link to={`/vehicles/${vehicle.id}`}>
            <Button variant="accent" size="sm" className="font-semibold shadow-xs">
              View Details
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
