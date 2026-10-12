import { Link } from 'react-router-dom';
import { ArrowRight, Phone, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function CTASection() {
  return (
    <section className="py-20 bg-primary text-primary-foreground border-t border-white/10 relative overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-5 tracking-tight">
            Ready to Plan Your Next{' '}
            <span className="text-accent">Group Journey in Odisha?</span>
          </h2>
          <p className="text-base md:text-lg text-white/85 mb-8 max-w-2xl mx-auto leading-relaxed">
            Get an all-inclusive, verified charter quote within 30 minutes. Fixed pricing, no hidden charges, and dedicated 24/7 on-trip coordinator.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
            <Link to="/inquiry">
              <Button variant="hero" size="xl" className="w-full sm:w-auto">
                Get Free Quote
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <a href="https://wa.me/918249529220" target="_blank" rel="noopener noreferrer">
              <Button variant="hero-outline" size="xl" className="w-full sm:w-auto">
                <MessageCircle className="w-5 h-5" />
                WhatsApp Us
              </Button>
            </a>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6 text-primary-foreground/70">
            <a href="tel:+918249529220" className="flex items-center gap-2 hover:text-primary-foreground transition-colors">
              <Phone className="w-5 h-5" />
              +91 82495 29220
            </a>
            <span className="hidden sm:block">•</span>
            <span>Available 24/7 for inquiries</span>
          </div>
        </div>
      </div>
    </section>
  );
}
