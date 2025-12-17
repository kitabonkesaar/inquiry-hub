-- Relax constraints on inquiries table to support Quick Leads
ALTER TABLE public.inquiries
ALTER COLUMN vehicle_type DROP NOT NULL,
ALTER COLUMN journey_end_date DROP NOT NULL,
ALTER COLUMN pickup_location DROP NOT NULL,
ALTER COLUMN drop_location DROP NOT NULL;
