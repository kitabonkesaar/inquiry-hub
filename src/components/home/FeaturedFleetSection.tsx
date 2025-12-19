import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import bus1 from '@/assets/bus-1.jpg';
import bus2 from '@/assets/bus-2.jpg';
import traveller1 from '@/assets/traveller-1.jpg';
import heroBus from '@/assets/hero-bus.jpg';

export function FeaturedFleetSection() {
  const fleet = [
    {
      id: 1,
      image: bus1,
      title: 'Luxury AC Sleeper',
      capacity: '45 Seater',
    },
    {
      id: 2,
      image: traveller1,
      title: 'Premium Traveller',
      capacity: '17 Seater',
    },
    {
      id: 3,
      image: bus2,
      title: 'Executive Coach',
      capacity: '50 Seater',
    },
     {
      id: 4,
      image: heroBus,
      title: 'Volvo Multi-Axle',
      capacity: '53 Seater',
    },
  ];

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-end justify-between mb-12">
            <div className="max-w-2xl">
                <span className="inline-block px-4 py-1 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
                    Visual Tour
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                    Experience Our Premium Fleet
                </h2>
            </div>
            <Link to="/vehicles" className="hidden md:block">
                <Button variant="outline" className="gap-2">
                    View All Photos <ArrowRight className="w-4 h-4" />
                </Button>
            </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {fleet.map((item) => (
                <div key={item.id} className="group relative rounded-2xl overflow-hidden aspect-[4/5] cursor-pointer shadow-lg hover:shadow-xl transition-all">
                    <img 
                        src={item.image} 
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 transition-opacity" />
                    
                    <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                        <p className="text-accent text-sm font-medium mb-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -translate-y-2 group-hover:translate-y-0">
                            {item.capacity}
                        </p>
                        <h3 className="text-white text-xl font-bold leading-tight">
                            {item.title}
                        </h3>
                    </div>
                </div>
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
