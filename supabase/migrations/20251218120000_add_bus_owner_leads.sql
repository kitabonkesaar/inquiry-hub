-- Create bus_owner_leads table
CREATE TABLE public.bus_owner_leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  mobile TEXT NOT NULL,
  email TEXT,
  city TEXT NOT NULL,
  vehicle_details TEXT,
  status text DEFAULT 'new' NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Enable RLS
ALTER TABLE public.bus_owner_leads ENABLE ROW LEVEL SECURITY;

-- Policies
-- Anyone can insert (public form)
CREATE POLICY "Anyone can submit bus owner lead"
  ON public.bus_owner_leads FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Only admin/staff can view
CREATE POLICY "Admin/Staff can view all bus owner leads"
  ON public.bus_owner_leads FOR SELECT
  TO authenticated
  USING (public.is_admin_or_staff(auth.uid()));

-- Only admin/staff can update
CREATE POLICY "Admin/Staff can update bus owner leads"
  ON public.bus_owner_leads FOR UPDATE
  TO authenticated
  USING (public.is_admin_or_staff(auth.uid()));
