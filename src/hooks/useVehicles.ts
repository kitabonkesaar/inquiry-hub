import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { vehicles as defaultVehicles, Vehicle } from '@/data/vehicles';

export type { Vehicle };

export function useVehicles() {
  const [vehicles, setVehicles] = useState<Vehicle[]>(defaultVehicles);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchVehicles = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('vehicles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      if (data && data.length > 0) {
        // Map Supabase data to frontend Vehicle interface
        const mappedVehicles: Vehicle[] = data.map((v: any) => ({
          id: String(v.id),
          name: v.name,
          type: (v.type as 'bus' | 'traveller') || 'bus',
          category: v.is_ac ? 'ac' : 'non-ac',
          seatingCapacity: v.seating_capacity || 40,
          pricePerDay: v.price_display || 'On Request',
          amenities: v.amenities || [],
          images: (v.images && v.images.length > 0) ? v.images : ['/placeholder.svg'],
          description: v.description || '',
          idealFor: v.ideal_for || [],
          availability: (v.availability_status as any) || 'available',
          bus_layout: v.bus_layout || '2x2',
        }));
        setVehicles(mappedVehicles);
      } else {
        setVehicles(defaultVehicles);
      }
    } catch (err) {
      console.warn('Using default vehicles due to Supabase error/offline:', err);
      setError(err as Error);
      setVehicles(defaultVehicles);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  return { vehicles, loading, error, refetch: fetchVehicles };
}

