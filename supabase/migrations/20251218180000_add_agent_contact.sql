-- Add agent_contact_number to vehicles
ALTER TABLE public.vehicles
ADD COLUMN IF NOT EXISTS agent_contact_number TEXT;

-- Ensure operators table has necessary columns (if not already)
-- We assume operators table exists from previous migrations

-- Grant access to new column
GRANT ALL ON public.vehicles TO authenticated;
GRANT ALL ON public.vehicles TO anon;
