import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, Bus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Our Fleet', href: '/vehicles' },
  { name: 'About Us', href: '/about' },
  { name: 'FAQs', href: '/faqs' },
  { name: 'Contact', href: '/contact' },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass">
      <nav className="container mx-auto flex items-center justify-between py-4 px-4 lg:px-8">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <Bus className="w-6 h-6 text-accent-foreground" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-lg text-foreground leading-tight">RentAnyBus</span>
            <span className="text-xs text-muted-foreground leading-tight">Travel with Trust</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-1">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300",
                location.pathname === item.href
                  ? "bg-primary text-primary-foreground"
                  : "text-foreground/70 hover:text-foreground hover:bg-muted"
              )}
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="hidden lg:flex items-center gap-3">
          <a href="tel:+919876543210" className="flex items-center gap-2 text-sm font-medium text-foreground/70 hover:text-foreground transition-colors">
            <Phone className="w-4 h-4" />
            +91 82495 29220
          </a>
          <Link to="/inquiry">
            <Button variant="accent" size="default">
              Get Quote
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          className="lg:hidden p-2 rounded-lg hover:bg-muted transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <X className="w-6 h-6 text-foreground" />
          ) : (
            <Menu className="w-6 h-6 text-foreground" />
          )}
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden glass border-t border-border animate-fade-in">
          <div className="container mx-auto py-4 px-4 space-y-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  "block px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300",
                  location.pathname === item.href
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground/70 hover:text-foreground hover:bg-muted"
                )}
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-4 border-t border-border space-y-3">
              <a href="tel:+919876543210" className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-foreground/70">
                <Phone className="w-4 h-4" />
                +91 98765 43210
              </a>
              <Link to="/inquiry" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="accent" size="lg" className="w-full">
                  Get Quote
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
