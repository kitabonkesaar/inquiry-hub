-- Adapt vehicles table to match frontend requirements
ALTER TABLE public.vehicles
ALTER COLUMN operator_id DROP NOT NULL,
ALTER COLUMN registration_number DROP NOT NULL,
ALTER COLUMN category_id DROP NOT NULL,
ALTER COLUMN seating_capacity DROP NOT NULL;

ALTER TABLE public.vehicles
ADD COLUMN IF NOT EXISTS type TEXT DEFAULT 'bus',
ADD COLUMN IF NOT EXISTS price_display TEXT,
ADD COLUMN IF NOT EXISTS amenities TEXT[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS images TEXT[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS ideal_for TEXT[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS availability_status TEXT DEFAULT 'available';

-- Update RLS policies to allow public read access
DROP POLICY IF EXISTS "Public read access" ON public.vehicles;
CREATE POLICY "Public read access" ON public.vehicles FOR SELECT USING (true);

-- Allow admins to insert/update/delete
DROP POLICY IF EXISTS "Admins can manage vehicles" ON public.vehicles;
CREATE POLICY "Admins can manage vehicles" ON public.vehicles FOR ALL USING (public.is_admin_or_staff(auth.uid()));
