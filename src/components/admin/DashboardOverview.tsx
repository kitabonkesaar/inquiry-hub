import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { FileText, Users, Clock, CheckCircle, TrendingUp, Bus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function DashboardOverview() {
  const [stats, setStats] = useState({
    totalInquiries: 0,
    newInquiries: 0,
    convertedInquiries: 0,
    totalOperators: 0,
    activeVehicles: 0,
    newLeads: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Parallel fetching
        const [
          { count: totalInq },
          { count: newInq },
          { count: convInq },
          { count: totalOps },
          { count: activeVeh },
          { count: newLeads }
        ] = await Promise.all([
          supabase.from('inquiries').select('*', { count: 'exact', head: true }),
          supabase.from('inquiries').select('*', { count: 'exact', head: true }).eq('status', 'new'),
          supabase.from('inquiries').select('*', { count: 'exact', head: true }).eq('status', 'converted'),
          supabase.from('operators').select('*', { count: 'exact', head: true }),
          supabase.from('vehicles').select('*', { count: 'exact', head: true }).eq('status', 'active'),
          supabase.from('bus_owner_leads').select('*', { count: 'exact', head: true }).eq('status', 'new')
        ]);

        setStats({
          totalInquiries: totalInq || 0,
          newInquiries: newInq || 0,
          convertedInquiries: convInq || 0,
          totalOperators: totalOps || 0,
          activeVehicles: activeVeh || 0,
          newLeads: newLeads || 0
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return <div className="text-muted-foreground">Loading dashboard...</div>;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold tracking-tight">Dashboard Overview</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <StatsCard 
          title="Total Inquiries" 
          value={stats.totalInquiries} 
          icon={FileText} 
          color="text-blue-500" 
          bgColor="bg-blue-500/10" 
        />
        <StatsCard 
          title="New Inquiries" 
          value={stats.newInquiries} 
          icon={Clock} 
          color="text-yellow-500" 
          bgColor="bg-yellow-500/10" 
        />
        <StatsCard 
          title="Converted" 
          value={stats.convertedInquiries} 
          icon={CheckCircle} 
          color="text-green-500" 
          bgColor="bg-green-500/10" 
        />
        <StatsCard 
          title="Bus Owner Leads" 
          value={stats.newLeads} 
          icon={TrendingUp} 
          color="text-purple-500" 
          bgColor="bg-purple-500/10" 
          desc="New potential partners"
        />
        <StatsCard 
          title="Active Vehicles" 
          value={stats.activeVehicles} 
          icon={Bus} 
          color="text-indigo-500" 
          bgColor="bg-indigo-500/10" 
        />
        <StatsCard 
          title="Total Operators" 
          value={stats.totalOperators} 
          icon={Users} 
          color="text-orange-500" 
          bgColor="bg-orange-500/10" 
        />
      </div>
    </div>
  );
}

function StatsCard({ title, value, icon: Icon, color, bgColor, desc }: any) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center gap-4">
          <div className={`w-12 h-12 rounded-xl ${bgColor} flex items-center justify-center`}>
            <Icon className={`w-6 h-6 ${color}`} />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <h3 className="text-2xl font-bold">{value}</h3>
            {desc && <p className="text-xs text-muted-foreground mt-1">{desc}</p>}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
