import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Clock, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
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
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground/90 text-xs sm:text-sm font-medium mb-6 sm:mb-8 animate-fade-in">
            <Award className="w-4 h-4 text-accent" />
            Odisha's Only Premier Bus Rental Provider
          </div>

          {/* Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-primary-foreground leading-tight mb-4 sm:mb-6 animate-slide-up">
            The Only Choice for
            <br className="hidden md:block" />
            <span className="text-gradient">Group Travel in Odisha</span>
          </h1>

          {/* Subheading */}
          <p className="text-base md:text-lg lg:text-xl text-primary-foreground/80 max-w-2xl mb-8 sm:mb-10 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            We are the only provider offering dedicated fleet services for <strong>Tirth Yatra</strong>, <strong>Corporate Tours</strong>, and <strong>School/College Picnics</strong>.
            <span className="block mt-2">
              Experience the difference with Odisha's most trusted transport partner.
            </span>
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-16 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <Link to="/vehicles">
              <Button variant="hero" size="xl" className="w-full sm:w-auto">
                Explore Our Fleet
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <Link to="/inquiry">
              <Button variant="hero-outline" size="xl" className="w-full sm:w-auto">
                Get Free Quote
              </Button>
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <div className="flex items-center gap-4 p-4 rounded-xl bg-primary-foreground/5 border border-primary-foreground/10 backdrop-blur-sm">
              <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center">
                <Shield className="w-6 h-6 text-accent" />
              </div>
              <div>
                <p className="font-semibold text-primary-foreground">Verified Vehicles</p>
                <p className="text-sm text-primary-foreground/60">100% Safety Certified</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 rounded-xl bg-primary-foreground/5 border border-primary-foreground/10 backdrop-blur-sm">
              <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center">
                <Clock className="w-6 h-6 text-accent" />
              </div>
              <div>
                <p className="font-semibold text-primary-foreground">Quick Response</p>
                <p className="text-sm text-primary-foreground/60">Within 30 minutes</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 rounded-xl bg-primary-foreground/5 border border-primary-foreground/10 backdrop-blur-sm">
              <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center">
                <Award className="w-6 h-6 text-accent" />
              </div>
              <div>
                <p className="font-semibold text-primary-foreground">10+ Years</p>
                <p className="text-sm text-primary-foreground/60">Industry Experience</p>
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
