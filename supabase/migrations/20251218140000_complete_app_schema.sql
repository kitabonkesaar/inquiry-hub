-- ==============================================================================
-- RENTANYBUS COMPLETE APPLICATION SCHEMA
-- This migration builds upon the existing core tables (profiles, inquiries, etc.)
-- and adds comprehensive support for Fleet Management, Bookings, Payments, and Reviews.
-- ==============================================================================

-- 1. REFERENCE TABLES (Enums and Categories)
-- ==============================================================================

-- Enhance the existing vehicle type concept
CREATE TABLE IF NOT EXISTS public.vehicle_categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL UNIQUE, -- e.g., 'Volvo Bus', 'Tempo Traveller', 'Luxury Car'
    slug TEXT NOT NULL UNIQUE,
    description TEXT,
    base_price_per_km DECIMAL(10, 2),
    base_price_per_day DECIMAL(10, 2),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Amenities lookup (e.g., AC, WiFi, Charging Point, Sleeper)
CREATE TABLE IF NOT EXISTS public.amenities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL UNIQUE,
    icon_key TEXT, -- Icon name for frontend lookup
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. FLEET MANAGEMENT (Operators & Vehicles)
-- ==============================================================================

-- Operators: The business entities (Bus Owners)
CREATE TABLE IF NOT EXISTS public.operators (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id), -- Optional link if they have a login
    business_name TEXT NOT NULL,
    contact_person TEXT NOT NULL,
    contact_number TEXT NOT NULL,
    email TEXT,
    address TEXT,
    gst_number TEXT,
    is_verified BOOLEAN DEFAULT FALSE,
    rating DECIMAL(3, 2) DEFAULT 0.0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Vehicles: The actual inventory
CREATE TABLE IF NOT EXISTS public.vehicles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    operator_id UUID REFERENCES public.operators(id) ON DELETE CASCADE,
    category_id UUID REFERENCES public.vehicle_categories(id),
    name TEXT NOT NULL, -- e.g., "Royal Volvo B9R"
    registration_number TEXT NOT NULL UNIQUE, -- License plate
    seating_capacity INTEGER NOT NULL,
    is_ac BOOLEAN DEFAULT TRUE,
    is_sleeper BOOLEAN DEFAULT FALSE,
    description TEXT,
    
    -- Pricing Logic (Simplified)
    price_per_km DECIMAL(10, 2),
    min_km_per_day INTEGER DEFAULT 300,
    driver_allowance_per_day DECIMAL(10, 2),
    
    status TEXT DEFAULT 'active' CHECK (status IN ('active', 'maintenance', 'inactive')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Vehicle Images
CREATE TABLE IF NOT EXISTS public.vehicle_images (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    vehicle_id UUID REFERENCES public.vehicles(id) ON DELETE CASCADE,
    url TEXT NOT NULL,
    is_primary BOOLEAN DEFAULT FALSE,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Vehicle <-> Amenities (Many-to-Many)
CREATE TABLE IF NOT EXISTS public.vehicle_amenities_link (
    vehicle_id UUID REFERENCES public.vehicles(id) ON DELETE CASCADE,
    amenity_id UUID REFERENCES public.amenities(id) ON DELETE CASCADE,
    PRIMARY KEY (vehicle_id, amenity_id)
);

-- 3. BOOKING SYSTEM
-- ==============================================================================

CREATE TYPE public.booking_status AS ENUM ('pending', 'confirmed', 'completed', 'cancelled', 'refunded');
CREATE TYPE public.payment_status AS ENUM ('pending', 'partial', 'paid', 'failed');

CREATE TABLE IF NOT EXISTS public.bookings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    -- Link to Inquiry if this booking came from one
    inquiry_id UUID REFERENCES public.inquiries(id),
    -- Customer info (if registered)
    user_id UUID REFERENCES auth.users(id),
    -- Or guest info if not registered (denormalized from inquiry or fresh input)
    customer_name TEXT NOT NULL,
    customer_mobile TEXT NOT NULL,
    customer_email TEXT,
    
    -- Vehicle assigned
    vehicle_id UUID REFERENCES public.vehicles(id),
    
    -- Journey Details
    pickup_location TEXT NOT NULL,
    drop_location TEXT NOT NULL,
    start_time TIMESTAMP WITH TIME ZONE NOT NULL,
    end_time TIMESTAMP WITH TIME ZONE NOT NULL,
    
    -- Financials
    total_amount DECIMAL(12, 2) NOT NULL,
    advance_amount DECIMAL(12, 2) DEFAULT 0,
    pending_amount DECIMAL(12, 2) GENERATED ALWAYS AS (total_amount - advance_amount) STORED,
    
    status booking_status DEFAULT 'pending',
    payment_status payment_status DEFAULT 'pending',
    
    admin_notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. PAYMENTS
-- ==============================================================================

CREATE TABLE IF NOT EXISTS public.payments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    booking_id UUID REFERENCES public.bookings(id) ON DELETE CASCADE,
    amount DECIMAL(12, 2) NOT NULL,
    transaction_id TEXT, -- e.g., Razorpay/Stripe ID
    payment_method TEXT, -- e.g., 'upi', 'card', 'cash'
    payment_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    status TEXT DEFAULT 'success',
    notes TEXT
);

-- 5. REVIEWS & RATINGS
-- ==============================================================================

CREATE TABLE IF NOT EXISTS public.reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    booking_id UUID REFERENCES public.bookings(id) UNIQUE, -- One review per booking
    user_id UUID REFERENCES auth.users(id),
    vehicle_id UUID REFERENCES public.vehicles(id),
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    is_approved BOOLEAN DEFAULT FALSE, -- Admin moderation
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. RLS POLICIES (Security)
-- ==============================================================================

-- Enable RLS on all new tables
ALTER TABLE public.vehicle_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.operators ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vehicles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- Public Read Access (Catalog)
CREATE POLICY "Public can view vehicle categories" ON public.vehicle_categories FOR SELECT USING (true);
CREATE POLICY "Public can view active vehicles" ON public.vehicles FOR SELECT USING (status = 'active');
CREATE POLICY "Public can view vehicle images" ON public.vehicle_images FOR SELECT USING (true);
CREATE POLICY "Public can view amenities" ON public.amenities FOR SELECT USING (true);
CREATE POLICY "Public can view approved reviews" ON public.reviews FOR SELECT USING (is_approved = true);

-- Admin Management Access (Using existing is_admin_or_staff function)
-- Note: Assuming the function exists from previous migrations.

CREATE POLICY "Admins can manage categories" ON public.vehicle_categories FOR ALL USING (public.is_admin_or_staff(auth.uid()));
CREATE POLICY "Admins can manage operators" ON public.operators FOR ALL USING (public.is_admin_or_staff(auth.uid()));
CREATE POLICY "Admins can manage vehicles" ON public.vehicles FOR ALL USING (public.is_admin_or_staff(auth.uid()));
CREATE POLICY "Admins can manage bookings" ON public.bookings FOR ALL USING (public.is_admin_or_staff(auth.uid()));

-- User Booking Access
CREATE POLICY "Users can view own bookings" ON public.bookings FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create bookings" ON public.bookings FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Operator Access (If we give operators login access later)
-- We would need an 'operator' role or link in user_roles table.

-- 7. TRIGGERS
-- ==============================================================================

-- Update timestamp trigger
CREATE TRIGGER update_operators_timestamp BEFORE UPDATE ON public.operators FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_vehicles_timestamp BEFORE UPDATE ON public.vehicles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_bookings_timestamp BEFORE UPDATE ON public.bookings FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
