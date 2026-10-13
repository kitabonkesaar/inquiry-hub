import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Clock, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MarketplaceSearchBar } from './MarketplaceSearchBar';
import heroBus from '@/assets/hero-bus.jpg';

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img src={heroBus} alt="Luxury bus on scenic highway" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/80 to-primary/60" />
      </div>
      
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-accent blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-primary-foreground blur-3xl" />
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0" style={{
        backgroundImage: `linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`,
        backgroundSize: '60px 60px',
      }} />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="max-w-4xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-white text-xs sm:text-sm font-medium mb-6 animate-fade-in shadow-xs">
            <Award className="w-4 h-4 text-accent" />
            <span>Odisha's Premier Bus Rental Marketplace</span>
          </div>

          {/* Heading */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-4 animate-slide-up tracking-tight">
            Bus Rental & Tempo Traveller Hire
            <br />
            <span className="text-accent">Across Odisha</span>
          </h1>

          {/* Subheading */}
          <p className="text-sm sm:text-base md:text-lg text-white/85 max-w-2xl mb-8 animate-slide-up leading-relaxed" style={{ animationDelay: '0.1s' }}>
            Direct rental booking for <strong>Tirth Yatra & Pilgrimages</strong>, <strong>Corporate Tours</strong>, <strong>Weddings</strong>, and <strong>School Picnics</strong>. Clean verified buses, fixed upfront pricing, and experienced drivers.
          </p>

          {/* Instant Marketplace Search Bar */}
          <div className="mb-8 animate-slide-up" style={{ animationDelay: '0.15s' }}>
            <MarketplaceSearchBar />
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3.5 mb-10 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <Link to="/vehicles">
              <Button variant="accent" size="lg" className="w-full sm:w-auto font-bold shadow-md">
                Explore Verified Fleet
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
            <Link to="/inquiry">
              <Button variant="hero-outline" size="lg" className="w-full sm:w-auto font-medium">
                Get Custom Itinerary Quote
              </Button>
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 animate-slide-up" style={{ animationDelay: '0.25s' }}>
            <div className="flex items-center gap-3.5 p-3.5 rounded-xl bg-white/10 border border-white/15">
              <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center shrink-0">
                <Shield className="w-5 h-5 text-accent" />
              </div>
              <div>
                <p className="font-semibold text-sm text-white">100% Verified Fleet</p>
                <p className="text-xs text-white/70">Commercial Permits & Insurance</p>
              </div>
            </div>
            <div className="flex items-center gap-3.5 p-3.5 rounded-xl bg-white/10 border border-white/15">
              <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5 text-accent" />
              </div>
              <div>
                <p className="font-semibold text-sm text-white">30-Minute Callback</p>
                <p className="text-xs text-white/70">Instant quote & route assistance</p>
              </div>
            </div>
            <div className="flex items-center gap-3.5 p-3.5 rounded-xl bg-white/10 border border-white/15">
              <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center shrink-0">
                <Award className="w-5 h-5 text-accent" />
              </div>
              <div>
                <p className="font-semibold text-sm text-white">Odisha Wide Network</p>
                <p className="text-xs text-white/70">Covering all 30 districts</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
        <div className="w-6 h-10 rounded-full border-2 border-primary-foreground/30 flex items-start justify-center p-2">
          <div className="w-1 h-2 rounded-full bg-primary-foreground/50 animate-bounce" />
        </div>
      </div>
    </section>
  );
}
