import { Link } from 'react-router-dom';
import { Bus, Phone, Mail, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';

const footerLinks = {
  company: [
    { name: 'About Us', href: '/about' },
    { name: 'Verified Fleet', href: '/vehicles' },
    { name: 'Bus Rental Cost Guide', href: '/blog/bus-rental-cost-per-km-odisha-price-guide' },
    { name: 'Travel Guides & Blog', href: '/blog' },
    { name: 'FAQs', href: '/faqs' },
    { name: 'Contact Us', href: '/contact' },
  ],
  services: [
    { name: 'Wedding Bus Rental', href: '/services/wedding-bus-rental' },
    { name: 'Corporate & Tech Park Shuttles', href: '/services/corporate-bus-rental' },
    { name: 'Jagannath Puri Yatra Charters', href: '/services/pilgrimage-bus-rental' },
    { name: 'BBI Airport Group Transfers', href: '/services/airport-transfer' },
    { name: 'Outstation Group Charters', href: '/vehicles' },
  ],
  cities: [
    { name: 'Bus Rental Bhubaneswar', href: '/bus-rental/bhubaneswar' },
    { name: 'Bus Rental Puri', href: '/bus-rental/puri' },
    { name: 'Bus Rental Cuttack', href: '/bus-rental/cuttack' },
    { name: 'Bus Rental Berhampur', href: '/bus-rental/berhampur' },
    { name: 'Bus Rental Balasore', href: '/bus-rental/balasore' },
    { name: 'Bus Rental Sambalpur', href: '/bus-rental/sambalpur' },
    { name: 'Bus Rental Rourkela', href: '/bus-rental/rourkela' },
  ],
  routes: [
    { name: 'Bhubaneswar to Puri', href: '/routes/bhubaneswar-to-puri' },
    { name: 'Bhubaneswar to Konark', href: '/routes/bhubaneswar-to-konark' },
    { name: 'Bhubaneswar to Chilika', href: '/routes/bhubaneswar-to-chilika' },
    { name: 'Cuttack to Puri', href: '/routes/cuttack-to-puri' },
    { name: 'Bhubaneswar to Gopalpur', href: '/routes/bhubaneswar-to-gopalpur' },
  ],
  portals: [
    { name: 'List Your Bus (Owner Portal)', href: '/owner' },
    { name: 'Operator Verification', href: '/owner' },
    { name: 'My Bookings & Profile', href: '/profile' },
  ],
};

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground border-t border-white/10">
      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-5">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center shadow-xs">
                <Bus className="w-5 h-5 text-accent-foreground" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-lg leading-tight tracking-tight text-white">RentAnyBus</span>
                <span className="text-[11px] text-white/70 leading-tight">Odisha's Premier Bus Rental Marketplace</span>
              </div>
            </Link>
            <p className="text-white/80 text-sm leading-relaxed max-w-sm">
              Odisha's only specialized marketplace connecting customers directly with verified bus operators and tempo travellers for <strong>Tirth Yatra</strong>, <strong>Weddings</strong>, <strong>Corporate Tours</strong>, and <strong>School Picnics</strong>.
            </p>
            <div className="space-y-2.5 text-xs">
              <a href="tel:+918249529220" className="flex items-center gap-2.5 text-white/85 hover:text-white transition-colors">
                <Phone className="w-4 h-4 text-accent shrink-0" />
                <span className="font-medium">+91 82495 29220 (24/7 Helpline)</span>
              </a>
              <a href="mailto:info@rentanybus.com" className="flex items-center gap-2.5 text-white/85 hover:text-white transition-colors">
                <Mail className="w-4 h-4 text-accent shrink-0" />
                <span>info@rentanybus.com</span>
              </a>
              <div className="flex items-start gap-2.5 text-white/85">
                <MapPin className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                <span>FM Golei, Balasore & Nayapalli, Bhubaneswar, Odisha — 756001</span>
              </div>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-semibold text-xs uppercase tracking-wider text-accent mb-4">Company</h4>
            <ul className="space-y-2.5 text-xs">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link to={link.href} className="text-white/75 hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-xs uppercase tracking-wider text-accent mb-4">Services</h4>
            <ul className="space-y-2.5 text-xs">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link to={link.href} className="text-white/75 hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* City Hubs */}
          <div>
            <h4 className="font-semibold text-xs uppercase tracking-wider text-accent mb-4">Cities</h4>
            <ul className="space-y-2.5 text-xs">
              {footerLinks.cities.map((link) => (
                <li key={link.name}>
                  <Link to={link.href} className="text-white/75 hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular Routes & Portals */}
          <div>
            <h4 className="font-semibold text-xs uppercase tracking-wider text-accent mb-4">Routes & Portals</h4>
            <ul className="space-y-2.5 text-xs">
              {footerLinks.routes.map((link) => (
                <li key={link.name}>
                  <Link to={link.href} className="text-white/75 hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
              {footerLinks.portals.map((link) => (
                <li key={link.name} className="pt-1">
                  <Link to={link.href} className="text-accent/90 hover:text-accent font-medium transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/60">
          <p>© {new Date().getFullYear()} RentAnyBus. All rights reserved. Registered Transport Partner in Odisha.</p>
          <div className="flex items-center gap-3">
            <span className="text-accent font-medium">100% Commercial Permits</span>
            <span>•</span>
            <span>All-Odisha 24/7 Roadside Assistance</span>
          </div>
          <div className="flex items-center gap-3">
            <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 text-white transition-colors">
              <Facebook className="w-4 h-4" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 text-white transition-colors">
              <Instagram className="w-4 h-4" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="Twitter" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 text-white transition-colors">
              <Twitter className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
