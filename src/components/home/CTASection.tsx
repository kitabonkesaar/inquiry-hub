import { Link } from 'react-router-dom';
import { ArrowRight, Phone, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function CTASection() {
  return (
    <section className="py-24 hero-gradient relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-accent blur-3xl" />
        <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-primary-foreground blur-3xl" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-primary-foreground mb-6">
            Ready to Plan Your <span className="text-gradient">Perfect Trip?</span>
          </h2>
          <p className="text-lg md:text-xl text-primary-foreground/80 mb-10 max-w-2xl mx-auto">
            Get a free, no-obligation quote within 30 minutes. Our team is ready to help you find the perfect vehicle for your journey.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
            <Link to="/inquiry">
              <Button variant="hero" size="xl" className="w-full sm:w-auto">
                Get Free Quote
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer">
              <Button variant="hero-outline" size="xl" className="w-full sm:w-auto">
                <MessageCircle className="w-5 h-5" />
                WhatsApp Us
              </Button>
            </a>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6 text-primary-foreground/70">
            <a href="tel:+919876543210" className="flex items-center gap-2 hover:text-primary-foreground transition-colors">
              <Phone className="w-5 h-5" />
              +91 98765 43210
            </a>
            <span className="hidden sm:block">•</span>
            <span>Available 24/7 for inquiries</span>
          </div>
        </div>
      </div>
    </section>
  );
}
