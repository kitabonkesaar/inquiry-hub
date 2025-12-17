import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface Vehicle {
  id: string;
  name: string;
  type: 'bus' | 'traveller';
  category: 'ac' | 'non-ac';
  seatingCapacity: number;
  pricePerDay: string;
  amenities: string[];
  images: string[];
  description: string;
  idealFor: string[];
  availability: 'available' | 'limited' | 'booked';
  bus_layout?: '1x2' | '2x2';
}

export function useVehicles() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchVehicles = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('vehicles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Map Supabase data to frontend Vehicle interface
      const mappedVehicles: Vehicle[] = (data || []).map((v: any) => ({
        id: v.id,
        name: v.name,
        type: (v.type as 'bus' | 'traveller') || 'bus',
        category: v.is_ac ? 'ac' : 'non-ac', // Simplify for now
        seatingCapacity: v.seating_capacity,
        pricePerDay: v.price_display || 'On Request',
        amenities: v.amenities || [],
        images: v.images || [],
        description: v.description || '',
        idealFor: v.ideal_for || [],
        availability: (v.availability_status as any) || 'available',
        bus_layout: v.bus_layout || '2x2',
      }));

      setVehicles(mappedVehicles);
    } catch (err) {
      console.error('Error fetching vehicles:', err);
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  return { vehicles, loading, error, refetch: fetchVehicles };
}
