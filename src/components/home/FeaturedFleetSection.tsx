import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import luxurySleeperBus from '@/assets/luxury-sleeper-bus.jpg';
import bus2 from '@/assets/bus-2.jpg';
import traveller1 from '@/assets/traveller-1.jpg';
import heroBus from '@/assets/hero-bus.jpg';

export function FeaturedFleetSection() {
  const fleet = [
    {
      id: 1,
      image: luxurySleeperBus,
      title: 'Luxury AC Sleeper',
      capacity: '45 Seater • 2x1 Layout',
      price: 'From ₹18,000/day',
    },
    {
      id: 2,
      image: traveller1,
      title: 'Premium Tempo Traveller',
      capacity: '17 Seater • AC',
      price: 'From ₹6,500/day',
    },
    {
      id: 3,
      image: bus2,
      title: 'Executive Pushback Coach',
      capacity: '50 Seater • 2x2 Layout',
      price: 'From ₹15,000/day',
    },
    {
      id: 4,
      image: heroBus,
      title: 'Volvo 9600 Multi-Axle',
      capacity: '53 Seater • Ultra Luxury',
      price: 'From ₹25,000/day',
    },
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div className="max-w-2xl">
            <span className="inline-block px-3.5 py-1 rounded-full bg-secondary/10 text-secondary text-xs font-semibold uppercase tracking-wider mb-3">
              Fleet Showcase
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground tracking-tight">
              Experience Our Premium Verified Fleet
            </h2>
          </div>
          <Link to="/vehicles">
            <Button variant="outline" className="gap-2 font-semibold">
              View All Buses & Travellers <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {fleet.map((item) => (
            <Link
              key={item.id}
              to="/vehicles"
              className="group relative rounded-2xl overflow-hidden aspect-[4/5] bg-muted shadow-xs hover:shadow-md transition-all duration-300 block"
            >
              <img 
                src={item.image} 
                alt={item.title}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/30 to-transparent opacity-90" />
              
              <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                <span className="inline-block px-2 py-0.5 rounded bg-accent text-accent-foreground text-xs font-bold mb-2">
                  {item.price}
                </span>
                <p className="text-white/80 text-xs font-medium mb-1">
                  {item.capacity}
                </p>
                <h3 className="text-white text-lg font-bold leading-tight group-hover:text-accent transition-colors">
                  {item.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
        
        <div className="mt-8 text-center md:hidden">
            <Link to="/vehicles">
                <Button variant="outline" className="w-full gap-2">
                    View All Photos <ArrowRight className="w-4 h-4" />
                </Button>
            </Link>
        </div>
      </div>
    </section>
  );
}
