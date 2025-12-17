import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { logoutAdmin } from '@/lib/adminAuth';
import { Bus, ClipboardList, LogOut, Settings, PhoneCall } from 'lucide-react';

interface AdminLayoutProps {
  children: ReactNode;
  activeSection: 'inquiries' | 'vehicles';
  onSectionChange: (section: 'inquiries' | 'vehicles') => void;
}

export function AdminLayout({ children, activeSection, onSectionChange }: AdminLayoutProps) {
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutAdmin();
    navigate('/admin-login', { replace: true });
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
            <p className="text-sm font-semibold">Admin Dashboard</p>
          </div>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-1 text-sm">
          <SidebarItem
            icon={ClipboardList}
            label="Inquiries & Leads"
            active={activeSection === 'inquiries'}
            onClick={() => onSectionChange('inquiries')}
          />
          <SidebarItem
            icon={PhoneCall}
            label="Vehicles"
            active={activeSection === 'vehicles'}
            onClick={() => onSectionChange('vehicles')}
          />
          <SidebarItem icon={Settings} label="Settings" />
        </nav>

        <div className="px-4 pb-4 text-xs text-muted-foreground">
          <p className="mb-1 font-medium">Logged in as</p>
          <p>admin@rentanybus.com</p>
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
              <p className="text-xs uppercase tracking-wide text-muted-foreground">Dashboard</p>
              <h1 className="text-sm sm:text-base font-semibold">
                {activeSection === 'inquiries' ? 'Inquiries & Leads Overview' : 'Vehicle Management'}
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="icon" className="hidden sm:inline-flex" onClick={handleLogout}>
              <LogOut className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="sm" className="sm:hidden" onClick={handleLogout}>
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </header>

        {/* Content area */}
        <main className="flex-1 px-4 md:px-8 py-6 md:py-8">
          <div className="max-w-6xl mx-auto">{children}</div>
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
      <div className="w-8 h-8 rounded-xl bg-muted flex items-center justify-center">
        <Icon className="w-4 h-4" />
      </div>
      <span className="font-medium text-xs sm:text-sm">{label}</span>
    </button>
  );
}


