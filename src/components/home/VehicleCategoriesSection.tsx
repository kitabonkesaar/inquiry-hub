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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {vehicleCategories.map((category, index) => {
            const Icon = iconMap[category.icon as keyof typeof iconMap] || Bus;
            const targetUrl = 
              category.id === 'ac-bus' ? '/vehicles?type=bus&category=ac' :
              category.id === 'non-ac-bus' ? '/vehicles?type=bus&category=non-ac' :
              '/vehicles?type=traveller';

            return (
              <Link
                key={category.id}
                to={targetUrl}
                className="group relative p-6 rounded-2xl bg-card border border-border shadow-xs hover:shadow-md hover:border-secondary/50 transition-all duration-300 flex flex-col h-full"
              >
                <div className="flex flex-col h-full">
                  {/* Icon & Arrow Row */}
                  <div className="flex justify-between items-start mb-5">
                    <div className="w-14 h-14 rounded-xl bg-secondary/10 flex items-center justify-center group-hover:bg-primary transition-colors duration-300">
                      <Icon className="w-7 h-7 text-secondary group-hover:text-accent transition-colors duration-300" />
                    </div>
                    
                    <div className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center group-hover:bg-accent group-hover:text-accent-foreground transition-all duration-300">
                      <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-current transition-colors" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="space-y-2 mb-6 flex-grow">
                    <h3 className="text-xl font-bold text-foreground group-hover:text-secondary transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {category.description}
                    </p>
                  </div>

                  {/* Bottom Stats */}
                  <div className="pt-4 border-t border-border flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                      <div className="h-2 w-2 rounded-full bg-emerald-500" />
                      <span>{category.count} Verified Vehicles</span>
                    </div>
                    <span className="text-xs font-semibold text-secondary group-hover:text-accent flex items-center gap-1 transition-colors">
                      Explore Fleet →
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
