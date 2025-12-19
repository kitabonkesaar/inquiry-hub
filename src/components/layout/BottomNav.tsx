import { Link, useLocation } from 'react-router-dom';
import { Home, Bus, FileText, Phone } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

export function BottomNav() {
  const location = useLocation();
  const [activeIndex, setActiveIndex] = useState(0);

  const navItems = [
    {
      name: 'Home',
      href: '/',
      icon: Home,
    },
    {
      name: 'Buses',
      href: '/vehicles',
      icon: Bus,
    },
    {
      name: 'Quote',
      href: '/inquiry',
      icon: FileText,
    },
    {
      name: 'Support',
      href: '/contact',
      icon: Phone,
    },
  ];

  useEffect(() => {
    const index = navItems.findIndex(item => {
      if (item.href === '/') return location.pathname === '/';
      return location.pathname.startsWith(item.href);
    });
    setActiveIndex(index === -1 ? 0 : index);
  }, [location.pathname]);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-background/95 backdrop-blur-lg border-t border-border lg:hidden pb-[env(safe-area-inset-bottom)]">
      <div className="relative grid grid-cols-4 h-16">
        {/* Sliding Circle Indicator */}
        <div 
          className="absolute top-0 left-0 w-1/4 h-full pointer-events-none transition-transform duration-500 ease-spring"
          style={{ transform: `translateX(${activeIndex * 100}%)` }}
        >
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-14 h-14 bg-primary rounded-full shadow-[0_8px_20px_rgba(0,0,0,0.3)] flex items-center justify-center">
            {/* The active icon will be rendered by the link itself, but we use this circle as the background */}
            {/* Optional: Add a subtle glow or inner ring */}
            <div className="w-10 h-10 rounded-full border border-white/10" />
          </div>
        </div>

        {/* Navigation Items */}
        {navItems.map((item, index) => {
          const isActive = index === activeIndex;
          const Icon = item.icon;

          return (
            <Link
              key={item.name}
              to={item.href}
              className="relative flex flex-col items-center justify-center h-full group select-none"
              onClick={() => setActiveIndex(index)}
            >
              <span className={cn(
                "absolute transition-all duration-500 ease-spring z-10 left-1/2 -translate-x-1/2",
                isActive ? "-top-2.5 text-primary-foreground" : "top-1/2 -translate-y-1/2 text-muted-foreground group-hover:text-foreground"
              )}>
                <Icon className={cn("w-6 h-6", isActive && "w-7 h-7")} />
              </span>
              
              <span className={cn(
                "absolute bottom-2 w-full text-center text-[10px] font-medium transition-all duration-500 delay-100",
                isActive ? "opacity-100 translate-y-0 text-foreground" : "opacity-0 translate-y-2"
              )}>
                {item.name}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
