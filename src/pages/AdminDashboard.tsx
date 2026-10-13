import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { marketplaceStore } from '@/services/marketplaceStore';
import { AdminLayout, AdminSection } from '@/components/admin/AdminLayout';
import { MarketplaceAdminSection } from '@/components/admin/MarketplaceAdminSection';
import { DashboardOverview } from '@/components/admin/DashboardOverview';
import { RentalLeads } from '@/components/admin/RentalLeads';
import { BusOwnerLeads } from '@/components/admin/BusOwnerLeads';
import { VehicleManagement } from '@/components/admin/VehicleManagement';
import BlogManagement from '@/components/admin/blog/BlogManagement';
import AdminSettings from '@/components/admin/settings/AdminSettings';
import { RefreshCw } from 'lucide-react';
import { SEOHead } from '@/components/seo/SEOHead';

export default function AdminDashboard() {
  const { user, isStaff, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState<AdminSection>('marketplace');
  const isAdminRole = marketplaceStore.getActiveRole() === 'admin';

  useEffect(() => {
    if (!authLoading && !isAdminRole && (!user || !isStaff)) {
      navigate('/admin/auth');
    }
  }, [user, isStaff, authLoading, navigate, isAdminRole]);

  if (authLoading && !isAdminRole) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <RefreshCw className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <AdminLayout activeSection={activeSection} onSectionChange={setActiveSection}>
      <SEOHead 
        title="Admin Control Center | RentAnyBus" 
        description="Internal administration operations." 
        noindex={true} 
      />
      {activeSection === 'marketplace' && <MarketplaceAdminSection />}
      {activeSection === 'dashboard' && <DashboardOverview />}
      {activeSection === 'rental-leads' && <RentalLeads />}
      {activeSection === 'bus-owner-leads' && <BusOwnerLeads />}
      {activeSection === 'vehicles' && <VehicleManagement />}
      {activeSection === 'blog' && <BlogManagement />}
      {activeSection === 'settings' && <AdminSettings />}
    </AdminLayout>
  );
}
