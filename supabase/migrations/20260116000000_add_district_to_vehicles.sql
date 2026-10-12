-- Add district column to vehicles table for regional boarding location matching
ALTER TABLE public.vehicles
ADD COLUMN IF NOT EXISTS district TEXT;

-- Grant permissions to access the district column
GRANT ALL ON public.vehicles TO authenticated;
GRANT ALL ON public.vehicles TO anon;
