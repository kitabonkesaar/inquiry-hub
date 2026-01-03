-- Run this SQL in your Supabase SQL Editor to add the missing column
ALTER TABLE public.vehicles 
ADD COLUMN IF NOT EXISTS agent_contact_number TEXT;

-- Grant permissions just in case
GRANT ALL ON public.vehicles TO authenticated;
GRANT ALL ON public.vehicles TO anon;
