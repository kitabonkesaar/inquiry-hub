import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, Bus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Our Buses', href: '/vehicles' },
  { name: 'Blog', href: '/blog' },
  { name: 'About Us', href: '/about' },
  { name: 'FAQs', href: '/faqs' },
  { name: 'Contact', href: '/contact' },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-primary text-primary-foreground border-b border-white/10 shadow-sm transition-all duration-200">
      <nav className="container mx-auto flex items-center justify-between py-3.5 px-4 lg:px-8">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center group-hover:scale-105 transition-transform duration-200 shadow-xs">
            <Bus className="w-5 h-5 text-accent-foreground" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-lg text-white leading-tight tracking-tight">RentAnyBus</span>
            <span className="text-[11px] text-white/70 leading-tight">Travel with Trust</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-1">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "px-3.5 py-2 rounded-lg text-sm font-medium transition-colors duration-150",
                  isActive
                    ? "bg-white/15 text-white font-semibold"
                    : "text-white/80 hover:text-white hover:bg-white/10"
                )}
              >
                {item.name}
              </Link>
            );
          })}
        </div>

        {/* CTA Buttons */}
        <div className="hidden lg:flex items-center gap-4">
          <a
            href="tel:+918249529220"
            className="flex items-center gap-2 text-xs font-semibold text-white/90 hover:text-white transition-colors bg-white/10 px-3 py-2 rounded-lg border border-white/10"
          >
            <Phone className="w-3.5 h-3.5 text-accent" />
            <span>+91 82495 29220</span>
          </a>
          <Link to="/inquiry">
            <Button variant="accent" size="default" className="shadow-xs font-semibold px-5">
              Get Quote
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          aria-label="Toggle navigation menu"
          className="lg:hidden p-2 rounded-lg text-white hover:bg-white/10 transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <X className="w-6 h-6 text-white" />
          ) : (
            <Menu className="w-6 h-6 text-white" />
          )}
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-primary border-t border-white/10 animate-fade-in shadow-xl">
          <div className="container mx-auto py-4 px-4 space-y-1.5">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "block px-4 py-2.5 rounded-lg text-sm font-medium transition-colors",
                    isActive
                      ? "bg-white/15 text-white font-semibold"
                      : "text-white/80 hover:text-white hover:bg-white/10"
                  )}
                >
                  {item.name}
                </Link>
              );
            })}
            <div className="pt-4 mt-3 border-t border-white/10 space-y-3">
              <a
                href="tel:+918249529220"
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white/90 bg-white/10 rounded-lg"
              >
                <Phone className="w-4 h-4 text-accent" />
                <span>+91 82495 29220</span>
              </a>
              <Link to="/inquiry" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="accent" size="lg" className="w-full font-semibold shadow-xs">
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
