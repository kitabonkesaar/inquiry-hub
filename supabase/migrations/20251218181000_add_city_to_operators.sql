-- Add city column to operators table
ALTER TABLE public.operators ADD COLUMN IF NOT EXISTS city TEXT;
