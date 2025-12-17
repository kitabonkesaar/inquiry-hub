import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { Bus, LayoutDashboard, ClipboardList, LogOut, Settings, Truck, Users } from 'lucide-react';

export type AdminSection = 'dashboard' | 'vehicles' | 'bus-owner-leads' | 'rental-leads';

interface AdminLayoutProps {
  children: ReactNode;
  activeSection: AdminSection;
  onSectionChange: (section: AdminSection) => void;
}

export function AdminLayout({ children, activeSection, onSectionChange }: AdminLayoutProps) {
  const navigate = useNavigate();
  const { signOut, user } = useAuth();

  const handleLogout = async () => {
    await signOut();
    navigate('/admin/auth', { replace: true });
  };

  const getTitle = () => {
    switch(activeSection) {
      case 'dashboard': return 'Dashboard Overview';
      case 'vehicles': return 'Vehicle Management';
      case 'bus-owner-leads': return 'Bus Owner Leads';
      case 'rental-leads': return 'Bus Rental Inquiries';
      default: return 'Admin Panel';
    }
  };

  return (
    <div className="min-h-screen bg-muted/40 text-foreground flex">
      {/* Sidebar */}
      <aside className="hidden md:flex md:w-64 lg:w-72 flex-col border-r border-border bg-card/80 backdrop-blur-xl">
        <div className="flex items-center gap-3 px-6 py-5 border-b border-border/80">
          <div className="w-10 h-10 rounded-2xl bg-primary flex items-center justify-center text-primary-foreground">
            <Bus className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-muted-foreground">RentAnyBus</p>
            <p className="text-sm font-semibold">Admin Panel</p>
          </div>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-1 text-sm">
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
          
          <div className="pt-4 mt-4 border-t border-border">
            <SidebarItem icon={Settings} label="Settings" />
          </div>
        </nav>

        <div className="px-4 pb-4 text-xs text-muted-foreground">
          <p className="mb-1 font-medium">Logged in as</p>
          <p className="truncate" title={user?.email}>{user?.email}</p>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Top bar */}
        <header className="h-16 border-b border-border/80 bg-card/80 backdrop-blur-xl flex items-center justify-between px-4 md:px-8">
          <div className="flex items-center gap-3">
            <div className="md:hidden w-9 h-9 rounded-xl bg-primary flex items-center justify-center text-primary-foreground">
              <Bus className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-muted-foreground">Admin Area</p>
              <h1 className="text-sm sm:text-base font-semibold">
                {getTitle()}
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" onClick={handleLogout}>
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
        'w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-left hover:bg-primary/5 hover:text-primary transition-colors',
        active && 'bg-primary/10 text-primary',
      )}
    >
      <div className={cn(
        "w-8 h-8 rounded-xl flex items-center justify-center transition-colors",
        active ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"
      )}>
        <Icon className="w-4 h-4" />
      </div>
      <span className="font-medium text-xs sm:text-sm">{label}</span>
    </button>
  );
}
