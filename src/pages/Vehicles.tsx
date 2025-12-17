import { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Filter, X, SlidersHorizontal, RefreshCw } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { VehicleCard } from '@/components/vehicles/VehicleCard';
import { Vehicle } from '@/data/vehicles';
import { useVehicles } from '@/hooks/useVehicles';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const filterOptions = {
  type: [
    { value: 'all', label: 'All Types' },
    { value: 'bus', label: 'Buses' },
    { value: 'traveller', label: 'Tempo Travellers' },
  ],
  category: [
    { value: 'all', label: 'AC & Non-AC' },
    { value: 'ac', label: 'AC Only' },
    { value: 'non-ac', label: 'Non-AC Only' },
  ],
  capacity: [
    { value: 'all', label: 'Any Capacity' },
    { value: '1-15', label: '1-15 Seats' },
    { value: '16-30', label: '16-30 Seats' },
    { value: '31-50', label: '31-50 Seats' },
    { value: '50+', label: '50+ Seats' },
  ],
  availability: [
    { value: 'all', label: 'All' },
    { value: 'available', label: 'Available Now' },
    { value: 'limited', label: 'Limited Dates' },
  ],
};

export default function VehiclesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [showFilters, setShowFilters] = useState(false);
  const { vehicles: allVehicles, loading } = useVehicles();

  const [filters, setFilters] = useState({
    type: searchParams.get('type') || 'all',
    category: searchParams.get('category') || 'all',
    capacity: searchParams.get('capacity') || 'all',
    availability: searchParams.get('availability') || 'all',
  });

  const filteredVehicles = useMemo(() => {
    return allVehicles.filter((vehicle) => {
      // Type filter
      if (filters.type !== 'all' && vehicle.type !== filters.type) return false;
      
      // Category filter
      if (filters.category !== 'all' && vehicle.category !== filters.category) return false;
      
      // Availability filter
      if (filters.availability !== 'all' && vehicle.availability !== filters.availability) return false;
      
      // Capacity filter
      if (filters.capacity !== 'all') {
        const cap = vehicle.seatingCapacity;
        if (filters.capacity === '1-15' && (cap < 1 || cap > 15)) return false;
        if (filters.capacity === '16-30' && (cap < 16 || cap > 30)) return false;
        if (filters.capacity === '31-50' && (cap < 31 || cap > 50)) return false;
        if (filters.capacity === '50+' && cap <= 50) return false;
      }
      
      return true;
    });
  }, [filters, allVehicles]);

  const handleFilterChange = (key: string, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    
    const params = new URLSearchParams();
    Object.entries(newFilters).forEach(([k, v]) => {
      if (v !== 'all') params.set(k, v);
    });
    setSearchParams(params);
  };

  const clearFilters = () => {
    setFilters({
      type: 'all',
      category: 'all',
      capacity: 'all',
      availability: 'all',
    });
    setSearchParams({});
  };

  const hasActiveFilters = Object.values(filters).some(v => v !== 'all');

  return (
    <Layout>
      {/* Page Header */}
      <section className="hero-gradient py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
              Premium Bus & Tempo Traveller Fleet in Odisha
            </h1>
            <p className="text-xl text-primary-foreground/80">
              Browse our verified fleet of luxury buses, AC coaches, and tempo travellers available for rent in Bhubaneswar, Puri, Cuttack, and across Odisha.
            </p>
          </div>
        </div>
      </section>


      {/* Filters & Content */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Mobile Filter Toggle */}
          <div className="lg:hidden mb-6">
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="w-full justify-between"
            >
              <span className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4" />
                Filters
              </span>
              {hasActiveFilters && (
                <span className="bg-accent text-accent-foreground px-2 py-0.5 rounded-full text-xs">
                  Active
                </span>
              )}
            </Button>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters Sidebar */}
            <aside className={cn(
              "lg:w-72 shrink-0",
              showFilters ? "block" : "hidden lg:block"
            )}>
              <div className="sticky top-24 p-6 rounded-2xl bg-card border border-border card-shadow">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-semibold text-foreground flex items-center gap-2">
                    <Filter className="w-5 h-5" />
                    Filters
                  </h3>
                  {hasActiveFilters && (
                    <button
                      onClick={clearFilters}
                      className="text-sm text-accent hover:underline flex items-center gap-1"
                    >
                      <X className="w-4 h-4" />
                      Clear
                    </button>
                  )}
                </div>

                {/* Filter Groups */}
                <div className="space-y-6">
                  {Object.entries(filterOptions).map(([key, options]) => (
                    <div key={key}>
                      <label className="block text-sm font-medium text-foreground mb-2 capitalize">
                        {key === 'category' ? 'AC Type' : key}
                      </label>
                      <div className="space-y-2">
                        {options.map((option) => (
                          <button
                            key={option.value}
                            onClick={() => handleFilterChange(key, option.value)}
                            className={cn(
                              "w-full text-left px-4 py-2 rounded-lg text-sm transition-all",
                              filters[key as keyof typeof filters] === option.value
                                ? "bg-accent text-accent-foreground font-medium"
                                : "bg-muted text-muted-foreground hover:bg-muted/80"
                            )}
                          >
                            {option.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </aside>

            {/* Vehicle Grid */}
            <div className="flex-1">
              {/* Results Count */}
              <div className="flex items-center justify-between mb-6">
                <p className="text-muted-foreground">
                  Showing <span className="font-semibold text-foreground">{filteredVehicles.length}</span> vehicles
                </p>
              </div>

              {/* Grid */}
              {loading ? (
                <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
                  <RefreshCw className="w-8 h-8 animate-spin mb-4" />
                  <p>Loading vehicles...</p>
                </div>
              ) : filteredVehicles.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredVehicles.map((vehicle) => (
                    <VehicleCard key={vehicle.id} vehicle={vehicle} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-20">
                  <p className="text-muted-foreground mb-4">No vehicles match your filters.</p>
                  <Button variant="accent" onClick={clearFilters}>
                    Clear Filters
                  </Button>
                </div>
              )}

              {/* CTA */}
              <div className="mt-12 p-8 rounded-2xl bg-primary text-primary-foreground text-center">
                <h3 className="text-2xl font-bold mb-2">Can't find what you're looking for?</h3>
                <p className="text-primary-foreground/80 mb-6">
                  Contact us and we'll help you find the perfect vehicle for your needs.
                </p>
                <Link to="/inquiry">
                  <Button variant="hero" size="lg">
                    Send Inquiry
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
