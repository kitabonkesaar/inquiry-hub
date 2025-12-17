-- Add bus_layout column to vehicles table
ALTER TABLE public.vehicles
ADD COLUMN IF NOT EXISTS bus_layout TEXT DEFAULT '2x2';
