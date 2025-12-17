import { Link } from 'react-router-dom';
import { Snowflake, Bus, Car, ArrowRight } from 'lucide-react';
import { vehicleCategories } from '@/data/vehicles';

const iconMap = {
  Snowflake,
  Bus,
  Car,
};

export function VehicleCategoriesSection() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block px-4 py-1 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
            Our Fleet
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Choose the right vehicle for your group
          </h2>
          <p className="text-muted-foreground text-lg">
            From compact tempo travellers for family trips in Puri to premium AC coaches for weddings in Bhubaneswar, pick a category that matches your route, group size and comfort expectations.
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
                className="group relative p-8 rounded-2xl bg-card border border-border card-shadow hover:card-hover-shadow transition-all duration-500 hover:-translate-y-2"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Icon */}
                <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center mb-6 group-hover:bg-accent group-hover:scale-110 transition-all duration-300">
                  <Icon className="w-8 h-8 text-accent group-hover:text-accent-foreground transition-colors" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {category.name}
                </h3>
                <p className="text-muted-foreground mb-4">
                  {category.description}
                </p>

                {/* Count Badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-muted text-muted-foreground text-sm">
                  <span className="font-semibold text-foreground">{category.count}</span>
                  vehicles available
                </div>

                {/* Arrow */}
                <div className="absolute top-8 right-8 w-10 h-10 rounded-full bg-muted flex items-center justify-center group-hover:bg-accent transition-all duration-300">
                  <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-accent-foreground transition-colors" />
                </div>
              </Link>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Link
            to="/vehicles"
            className="inline-flex items-center gap-2 text-accent font-medium hover:gap-4 transition-all duration-300"
          >
            View All Vehicles
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
