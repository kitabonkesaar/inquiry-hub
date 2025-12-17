import { useState } from 'react';
import { AdminLayout, AdminSection } from '@/components/admin/AdminLayout';
import { DashboardOverview } from '@/components/admin/DashboardOverview';
import { RentalLeads } from '@/components/admin/RentalLeads';
import { BusOwnerLeads } from '@/components/admin/BusOwnerLeads';
import { VehicleManagement } from '@/components/admin/VehicleManagement';

export default function AdminPage() {
  const [activeSection, setActiveSection] = useState<AdminSection>('dashboard');

  return (
    <AdminLayout activeSection={activeSection} onSectionChange={setActiveSection}>
      {activeSection === 'dashboard' && <DashboardOverview />}
      {activeSection === 'rental-leads' && <RentalLeads />}
      {activeSection === 'bus-owner-leads' && <BusOwnerLeads />}
      {activeSection === 'vehicles' && <VehicleManagement />}
    </AdminLayout>
  );
}
