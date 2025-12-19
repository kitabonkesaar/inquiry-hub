import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, SlidersHorizontal, RefreshCw, Search, ArrowUpDown } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { VehicleCard } from '@/components/vehicles/VehicleCard';
import { FilterContent } from '@/components/vehicles/FilterContent';
import { useVehicles } from '@/hooks/useVehicles';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  const { vehicles: allVehicles, loading } = useVehicles();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('recommended');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const [filters, setFilters] = useState({
    type: searchParams.get('type') || 'all',
    category: searchParams.get('category') || 'all',
    capacity: searchParams.get('capacity') || 'all',
    availability: searchParams.get('availability') || 'all',
  });

  const filteredVehicles = useMemo(() => {
    let result = allVehicles.filter((vehicle) => {
      // Search Query
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesName = vehicle.name.toLowerCase().includes(query);
        const matchesDesc = vehicle.description.toLowerCase().includes(query);
        if (!matchesName && !matchesDesc) return false;
      }

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

    // Sorting
    return result.sort((a, b) => {
      if (sortBy === 'price-low') {
        const priceA = parseInt(a.pricePerDay.replace(/[^\d]/g, '')) || 0;
        const priceB = parseInt(b.pricePerDay.replace(/[^\d]/g, '')) || 0;
        return priceA - priceB;
      }
      if (sortBy === 'price-high') {
        const priceA = parseInt(a.pricePerDay.replace(/[^\d]/g, '')) || 0;
        const priceB = parseInt(b.pricePerDay.replace(/[^\d]/g, '')) || 0;
        return priceB - priceA;
      }
      if (sortBy === 'capacity-low') {
        return a.seatingCapacity - b.seatingCapacity;
      }
      if (sortBy === 'capacity-high') {
        return b.seatingCapacity - a.seatingCapacity;
      }
      return 0; // recommended/default
    });
  }, [filters, allVehicles, searchQuery, sortBy]);

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
    setIsDrawerOpen(false);
  };

  const hasActiveFilters = Object.values(filters).some(v => v !== 'all');

  return (
    <Layout>
      {/* Page Header */}
      <section className="hero-gradient py-12 md:py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-5xl font-bold text-primary-foreground mb-4">
              Premium Bus & Tempo Traveller Fleet
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/80">
              Browse our verified fleet available for rent across Odisha.
            </p>
          </div>
        </div>
      </section>

      {/* Sticky Search & Sort Bar */}
      <div className="sticky top-[60px] z-30 bg-background/80 backdrop-blur-md border-b border-border py-4">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input 
                placeholder="Search by name or description..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 bg-card"
              />
            </div>
            <div className="flex gap-2">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[160px] bg-card">
                  <SelectValue placeholder="Sort By" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recommended">Recommended</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="capacity-low">Seats: Low to High</SelectItem>
                  <SelectItem value="capacity-high">Seats: High to Low</SelectItem>
                </SelectContent>
              </Select>
              
              <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
                <DrawerTrigger asChild>
                  <Button variant="outline" className="lg:hidden relative">
                    <SlidersHorizontal className="w-4 h-4 mr-2" />
                    Filters
                    {hasActiveFilters && (
                      <span className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full animate-pulse" />
                    )}
                  </Button>
                </DrawerTrigger>
                <DrawerContent>
                  <DrawerHeader>
                    <DrawerTitle>Filter Vehicles</DrawerTitle>
                  </DrawerHeader>
                  <div className="p-4 pb-8 overflow-y-auto max-h-[70vh]">
                    <FilterContent 
                      filterOptions={filterOptions}
                      filters={filters}
                      handleFilterChange={handleFilterChange}
                      clearFilters={clearFilters}
                      hasActiveFilters={hasActiveFilters}
                    />
                    <Button className="w-full mt-6" onClick={() => setIsDrawerOpen(false)}>
                      Show {filteredVehicles.length} Vehicles
                    </Button>
                  </div>
                </DrawerContent>
              </Drawer>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <section className="py-8 bg-background min-h-[50vh]">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Desktop Filters Sidebar */}
            <aside className="hidden lg:block w-72 shrink-0">
              <div className="sticky top-40 p-6 rounded-2xl bg-card border border-border card-shadow">
                <FilterContent 
                  filterOptions={filterOptions}
                  filters={filters}
                  handleFilterChange={handleFilterChange}
                  clearFilters={clearFilters}
                  hasActiveFilters={hasActiveFilters}
                />
              </div>
            </aside>

            {/* Vehicle Grid */}
            <div className="flex-1">
              <div className="mb-4 text-sm text-muted-foreground">
                Showing {filteredVehicles.length} vehicles
              </div>

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
                <div className="text-center py-20 bg-muted/30 rounded-3xl border border-dashed border-border">
                  <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                    <Search className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">No vehicles found</h3>
                  <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                    We couldn't find any vehicles matching your current filters. Try adjusting your search or clearing filters.
                  </p>
                  <Button onClick={clearFilters} variant="outline">
                    Clear All Filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
