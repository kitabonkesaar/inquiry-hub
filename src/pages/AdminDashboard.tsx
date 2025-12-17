import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { AdminLayout, AdminSection } from '@/components/admin/AdminLayout';
import { DashboardOverview } from '@/components/admin/DashboardOverview';
import { RentalLeads } from '@/components/admin/RentalLeads';
import { BusOwnerLeads } from '@/components/admin/BusOwnerLeads';
import { VehicleManagement } from '@/components/admin/VehicleManagement';
import { RefreshCw } from 'lucide-react';

export default function AdminDashboard() {
  const { user, isStaff, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState<AdminSection>('dashboard');

  useEffect(() => {
    if (!authLoading && (!user || !isStaff)) {
      navigate('/admin/auth');
    }
  }, [user, isStaff, authLoading, navigate]);

  if (authLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <RefreshCw className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user || !isStaff) return null;

  return (
    <AdminLayout activeSection={activeSection} onSectionChange={setActiveSection}>
      {activeSection === 'dashboard' && <DashboardOverview />}
      {activeSection === 'rental-leads' && <RentalLeads />}
      {activeSection === 'bus-owner-leads' && <BusOwnerLeads />}
      {activeSection === 'vehicles' && <VehicleManagement />}
    </AdminLayout>
  );
}
