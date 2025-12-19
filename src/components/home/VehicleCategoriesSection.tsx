import { Link } from 'react-router-dom';
import { Snowflake, Bus, Car, ArrowRight, ArrowUpRight } from 'lucide-react';
import { vehicleCategories } from '@/data/vehicles';
import { Button } from '@/components/ui/button';

const iconMap = {
  Snowflake,
  Bus,
  Car,
};

export function VehicleCategoriesSection() {
  return (
    <section className="py-24 bg-gradient-to-b from-background to-muted/20 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-primary/5 rounded-full blur-[100px] -z-10" />

      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold tracking-wide">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            Our Fleet
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground tracking-tight">
            Choose Your <span className="text-primary">Perfect Ride</span>
          </h2>
          <p className="text-muted-foreground text-lg md:text-xl leading-relaxed">
            From compact travellers for family trips to luxury coaches for weddings, 
            we have the perfect vehicle for every journey.
          </p>
        </div>

        {/* Category Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {vehicleCategories.map((category, index) => {
            const Icon = iconMap[category.icon as keyof typeof iconMap] || Bus;
            return (
              <Link
                key={category.id}
                to={`/vehicles?category=${category.id}`}
                className="group relative p-8 rounded-3xl bg-card border border-border/50 shadow-sm hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 hover:-translate-y-2 flex flex-col h-full overflow-hidden"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Hover Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative z-10 flex flex-col h-full">
                  {/* Icon & Arrow Row */}
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:scale-110 transition-all duration-500 shadow-sm">
                      <Icon className="w-8 h-8 text-primary group-hover:text-primary-foreground transition-colors duration-500" />
                    </div>
                    
                    <div className="w-10 h-10 rounded-full bg-muted/50 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500 group-hover:rotate-45">
                      <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-current transition-colors" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="space-y-3 mb-8 flex-grow">
                    <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {category.description}
                    </p>
                  </div>

                  {/* Bottom Stats */}
                  <div className="pt-6 border-t border-border/50 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                      <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      {category.count} Vehicles Available
                    </div>
                    <span className="text-sm font-semibold text-primary opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                      Book Now
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <Link to="/vehicles">
            <Button size="lg" className="rounded-full px-8 h-12 text-base shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-1 transition-all duration-300">
              View All Vehicles
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
