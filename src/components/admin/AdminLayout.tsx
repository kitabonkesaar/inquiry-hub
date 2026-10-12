import { ReactNode, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { marketplaceStore } from '@/services/marketplaceStore';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Bus,
  LayoutDashboard,
  ClipboardList,
  LogOut,
  Settings,
  Truck,
  Users,
  FileText,
  ShoppingBag,
  Palette,
  Check,
} from 'lucide-react';

export type AdminSection = 'marketplace' | 'dashboard' | 'vehicles' | 'bus-owner-leads' | 'rental-leads' | 'blog' | 'settings';

interface AdminLayoutProps {
  children: ReactNode;
  activeSection: AdminSection;
  onSectionChange: (section: AdminSection) => void;
}

export function AdminLayout({ children, activeSection, onSectionChange }: AdminLayoutProps) {
  const navigate = useNavigate();
  const { signOut, user } = useAuth();
  const [adminTheme, setAdminTheme] = useState<string>(() => {
    return localStorage.getItem('rentanybus_admin_theme') || 'ybw-dark';
  });

  const handleSetTheme = (theme: string) => {
    setAdminTheme(theme);
    localStorage.setItem('rentanybus_admin_theme', theme);
  };

  const handleLogout = async () => {
    marketplaceStore.setActiveRole('customer');
    await signOut();
    navigate('/admin/auth', { replace: true });
  };

  const getTitle = () => {
    switch(activeSection) {
      case 'marketplace': return 'Marketplace & Booking Controls';
      case 'dashboard': return 'Dashboard Overview';
      case 'vehicles': return 'Vehicle Management';
      case 'bus-owner-leads': return 'Bus Owner Leads';
      case 'rental-leads': return 'Bus Rental Inquiries';
      case 'blog': return 'Blog Management';
      case 'settings': return 'Site Settings';
      default: return 'Admin Panel';
    }
  };

  const themeClass = adminTheme === 'ybw-dark' 
    ? 'theme-ybw-dark dark' 
    : adminTheme === 'ybw-light' 
    ? 'theme-ybw-light' 
    : '';

  return (
    <div className={cn("min-h-screen bg-background text-foreground flex transition-colors duration-200", themeClass)}>
      {/* Sidebar */}
      <aside className="hidden md:flex md:w-64 lg:w-72 flex-col border-r border-border bg-card/90 backdrop-blur-xl">
        <div className="flex items-center gap-3 px-6 py-5 border-b border-border/80">
          <div className="w-10 h-10 rounded-2xl bg-primary flex items-center justify-center text-primary-foreground shadow-sm">
            <Bus className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-muted-foreground font-semibold">RentAnyBus</p>
            <p className="text-sm font-bold">Admin Panel</p>
          </div>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-1 text-sm">
          <SidebarItem
            icon={ShoppingBag}
            label="Marketplace & Charters"
            active={activeSection === 'marketplace'}
            onClick={() => onSectionChange('marketplace')}
          />
          <SidebarItem
            icon={LayoutDashboard}
            label="Dashboard"
            active={activeSection === 'dashboard'}
            onClick={() => onSectionChange('dashboard')}
          />
          <SidebarItem
            icon={ClipboardList}
            label="Bus Rental Leads"
            active={activeSection === 'rental-leads'}
            onClick={() => onSectionChange('rental-leads')}
          />
          <SidebarItem
            icon={Users}
            label="Bus Owner Leads"
            active={activeSection === 'bus-owner-leads'}
            onClick={() => onSectionChange('bus-owner-leads')}
          />
          <SidebarItem
            icon={Truck}
            label="Vehicle Management"
            active={activeSection === 'vehicles'}
            onClick={() => onSectionChange('vehicles')}
          />
          <SidebarItem
            icon={FileText}
            label="Blog Management"
            active={activeSection === 'blog'}
            onClick={() => onSectionChange('blog')}
          />
          
          <div className="pt-4 mt-4 border-t border-border">
            <SidebarItem 
                icon={Settings} 
                label="Settings" 
                active={activeSection === 'settings'}
                onClick={() => onSectionChange('settings')}
            />
          </div>
        </nav>

        <div className="px-4 pb-4 text-xs text-muted-foreground">
          <p className="mb-1 font-medium">Logged in as</p>
          <p className="truncate" title={user?.email}>{user?.email || 'admin@rentanybus.com'}</p>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Top bar */}
        <header className="h-16 border-b border-border/80 bg-card/80 backdrop-blur-xl flex items-center justify-between px-4 md:px-8">
          <div className="flex items-center gap-3">
            <div className="md:hidden w-9 h-9 rounded-xl bg-primary flex items-center justify-center text-primary-foreground shadow-sm">
              <Bus className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-muted-foreground">Admin Area</p>
              <h1 className="text-sm sm:text-base font-semibold">
                {getTitle()}
              </h1>
            </div>
          </div>
          
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Yellow White Black Theme Switcher */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-9 gap-1.5 rounded-xl border-border bg-card hover:bg-muted text-foreground">
                  <Palette className="w-4 h-4 text-primary" />
                  <span className="hidden sm:inline text-xs font-semibold">Theme</span>
                  <span className="w-2.5 h-2.5 rounded-full bg-primary border border-foreground/20 shrink-0 ml-0.5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-64 p-2 rounded-xl shadow-lg border-border">
                <DropdownMenuLabel className="text-xs font-semibold px-2 py-1 text-muted-foreground uppercase tracking-wider">
                  Admin Theme Color
                </DropdownMenuLabel>
                
                <DropdownMenuItem
                  onClick={() => handleSetTheme('ybw-dark')}
                  className="flex items-center justify-between text-xs py-2 px-2.5 rounded-lg cursor-pointer hover:bg-muted font-medium"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-5 h-5 rounded-md bg-black border border-amber-400 flex items-center justify-center text-[10px] font-black text-amber-400 shadow-xs">
                      Y
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">Yellow, Black & White (Dark)</p>
                      <p className="text-[10px] text-muted-foreground">Signature high-contrast</p>
                    </div>
                  </div>
                  {adminTheme === 'ybw-dark' && <Check className="w-4 h-4 text-primary shrink-0" />}
                </DropdownMenuItem>

                <DropdownMenuItem
                  onClick={() => handleSetTheme('ybw-light')}
                  className="flex items-center justify-between text-xs py-2 px-2.5 rounded-lg cursor-pointer hover:bg-muted font-medium"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-5 h-5 rounded-md bg-white border border-black flex items-center justify-center text-[10px] font-black text-amber-500 shadow-xs">
                      Y
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">Yellow & White (Light)</p>
                      <p className="text-[10px] text-muted-foreground">Crisp clean light theme</p>
                    </div>
                  </div>
                  {adminTheme === 'ybw-light' && <Check className="w-4 h-4 text-primary shrink-0" />}
                </DropdownMenuItem>

                <DropdownMenuSeparator className="my-1" />

                <DropdownMenuItem
                  onClick={() => handleSetTheme('classic')}
                  className="flex items-center justify-between text-xs py-2 px-2.5 rounded-lg cursor-pointer hover:bg-muted font-medium"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-5 h-5 rounded-md bg-slate-800 border border-slate-600 flex items-center justify-center text-[10px] text-white">
                      C
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">Classic Theme</p>
                      <p className="text-[10px] text-muted-foreground">Original Slate / Indigo</p>
                    </div>
                  </div>
                  {adminTheme === 'classic' && <Check className="w-4 h-4 text-primary shrink-0" />}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button variant="outline" size="sm" onClick={handleLogout} className="h-9 rounded-xl border-border">
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </header>

        {/* Content area */}
        <main className="flex-1 px-4 md:px-8 py-6 md:py-8 overflow-auto">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}

interface SidebarItemProps {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  active?: boolean;
  onClick?: () => void;
}

function SidebarItem({ icon: Icon, label, active, onClick }: SidebarItemProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-all',
        active
          ? 'bg-primary text-primary-foreground font-semibold shadow-xs'
          : 'text-muted-foreground hover:bg-muted hover:text-foreground',
      )}
    >
      <div className={cn(
        "w-8 h-8 rounded-xl flex items-center justify-center transition-colors",
        active ? "bg-black/20 text-primary-foreground" : "bg-muted text-muted-foreground"
      )}>
        <Icon className="w-4 h-4" />
      </div>
      <span className="font-medium text-xs sm:text-sm">{label}</span>
    </button>
  );
}
