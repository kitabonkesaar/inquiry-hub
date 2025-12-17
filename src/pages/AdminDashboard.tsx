import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Bus, 
  FileText, 
  Users, 
  Calendar, 
  LogOut, 
  Clock, 
  CheckCircle, 
  Phone, 
  MessageCircle,
  RefreshCw,
  Filter
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Inquiry {
  id: string;
  full_name: string;
  mobile: string;
  email: string | null;
  vehicle_type: string;
  preferred_vehicle: string | null;
  journey_start_date: string;
  journey_end_date: string;
  pickup_location: string;
  drop_location: string;
  passenger_count: number;
  message: string | null;
  status: 'new' | 'contacted' | 'quoted' | 'converted' | 'closed' | 'lost';
  internal_notes: string | null;
  created_at: string;
}

const statusColors: Record<string, string> = {
  new: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
  contacted: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
  quoted: 'bg-purple-500/10 text-purple-500 border-purple-500/20',
  converted: 'bg-green-500/10 text-green-500 border-green-500/20',
  closed: 'bg-gray-500/10 text-gray-500 border-gray-500/20',
  lost: 'bg-red-500/10 text-red-500 border-red-500/20',
};

export default function AdminDashboard() {
  const { user, isStaff, loading: authLoading, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);

  useEffect(() => {
    if (!authLoading && (!user || !isStaff)) {
      navigate('/admin/auth');
    }
  }, [user, isStaff, authLoading, navigate]);

  const fetchInquiries = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('inquiries')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setInquiries(data || []);
    } catch (err) {
      console.error('Error fetching inquiries:', err);
      toast({
        title: "Error",
        description: "Failed to load inquiries",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user && isStaff) {
      fetchInquiries();
    }
  }, [user, isStaff]);

  const updateStatus = async (id: string, status: Inquiry['status']) => {
    try {
      const { error } = await supabase
        .from('inquiries')
        .update({ status })
        .eq('id', id);

      if (error) throw error;
      
      setInquiries(prev => prev.map(inq => 
        inq.id === id ? { ...inq, status } : inq
      ));
      
      if (selectedInquiry?.id === id) {
        setSelectedInquiry(prev => prev ? { ...prev, status } : null);
      }
      
      toast({ title: "Status updated" });
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to update status",
        variant: "destructive"
      });
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/admin/auth');
  };

  const filteredInquiries = statusFilter === 'all' 
    ? inquiries 
    : inquiries.filter(inq => inq.status === statusFilter);

  const stats = {
    total: inquiries.length,
    new: inquiries.filter(i => i.status === 'new').length,
    pending: inquiries.filter(i => ['contacted', 'quoted'].includes(i.status)).length,
    converted: inquiries.filter(i => i.status === 'converted').length,
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <RefreshCw className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
              <Bus className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="font-bold text-foreground">RentAnyBus Admin</h1>
              <p className="text-xs text-muted-foreground">{user?.email}</p>
            </div>
          </div>
          <Button variant="outline" size="sm" onClick={handleSignOut}>
            <LogOut className="w-4 h-4" />
            Sign Out
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-card rounded-xl p-4 border border-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                <FileText className="w-5 h-5 text-blue-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{stats.total}</p>
                <p className="text-xs text-muted-foreground">Total Inquiries</p>
              </div>
            </div>
          </div>
          <div className="bg-card rounded-xl p-4 border border-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-yellow-500/10 flex items-center justify-center">
                <Clock className="w-5 h-5 text-yellow-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{stats.new}</p>
                <p className="text-xs text-muted-foreground">New</p>
              </div>
            </div>
          </div>
          <div className="bg-card rounded-xl p-4 border border-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
                <Users className="w-5 h-5 text-purple-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{stats.pending}</p>
                <p className="text-xs text-muted-foreground">Pending</p>
              </div>
            </div>
          </div>
          <div className="bg-card rounded-xl p-4 border border-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-green-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{stats.converted}</p>
                <p className="text-xs text-muted-foreground">Converted</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filter & Refresh */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-muted-foreground" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="text-sm border border-input rounded-lg px-3 py-2 bg-background"
            >
              <option value="all">All Status</option>
              <option value="new">New</option>
              <option value="contacted">Contacted</option>
              <option value="quoted">Quoted</option>
              <option value="converted">Converted</option>
              <option value="closed">Closed</option>
              <option value="lost">Lost</option>
            </select>
          </div>
          <Button variant="outline" size="sm" onClick={fetchInquiries} disabled={loading}>
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Inquiry List */}
          <div className="lg:col-span-2 space-y-4">
            {loading ? (
              <div className="text-center py-12 text-muted-foreground">Loading inquiries...</div>
            ) : filteredInquiries.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">No inquiries found</div>
            ) : (
              filteredInquiries.map((inquiry) => (
                <div
                  key={inquiry.id}
                  onClick={() => setSelectedInquiry(inquiry)}
                  className={`bg-card rounded-xl p-4 border cursor-pointer transition-all ${
                    selectedInquiry?.id === inquiry.id
                      ? 'border-primary shadow-md'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-foreground">{inquiry.full_name}</h3>
                      <p className="text-sm text-muted-foreground">{inquiry.mobile}</p>
                    </div>
                    <Badge className={statusColors[inquiry.status]}>
                      {inquiry.status}
                    </Badge>
                  </div>
                  <div className="text-sm text-muted-foreground space-y-1">
                    <p>
                      <span className="text-foreground">{inquiry.vehicle_type}</span> • {inquiry.passenger_count} passengers
                    </p>
                    <p className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(inquiry.journey_start_date).toLocaleDateString()} - {new Date(inquiry.journey_end_date).toLocaleDateString()}
                    </p>
                    <p>{inquiry.pickup_location} → {inquiry.drop_location}</p>
                  </div>
                  <p className="text-xs text-muted-foreground mt-3">
                    {new Date(inquiry.created_at).toLocaleString()}
                  </p>
                </div>
              ))
            )}
          </div>

          {/* Detail Panel */}
          <div className="lg:col-span-1">
            {selectedInquiry ? (
              <div className="bg-card rounded-xl border border-border p-6 sticky top-24">
                <h3 className="font-semibold text-foreground mb-4">Inquiry Details</h3>
                
                <div className="space-y-4">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Customer</p>
                    <p className="font-medium text-foreground">{selectedInquiry.full_name}</p>
                    <p className="text-sm text-muted-foreground">{selectedInquiry.mobile}</p>
                    {selectedInquiry.email && (
                      <p className="text-sm text-muted-foreground">{selectedInquiry.email}</p>
                    )}
                  </div>

                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Journey</p>
                    <p className="text-sm text-foreground">
                      {selectedInquiry.pickup_location} → {selectedInquiry.drop_location}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(selectedInquiry.journey_start_date).toLocaleDateString()} - {new Date(selectedInquiry.journey_end_date).toLocaleDateString()}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Vehicle</p>
                    <p className="text-sm text-foreground capitalize">{selectedInquiry.vehicle_type}</p>
                    <p className="text-sm text-muted-foreground">{selectedInquiry.passenger_count} passengers</p>
                  </div>

                  {selectedInquiry.message && (
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Message</p>
                      <p className="text-sm text-foreground">{selectedInquiry.message}</p>
                    </div>
                  )}

                  <div>
                    <p className="text-xs text-muted-foreground mb-2">Update Status</p>
                    <div className="flex flex-wrap gap-2">
                      {(['new', 'contacted', 'quoted', 'converted', 'closed', 'lost'] as const).map((status) => (
                        <button
                          key={status}
                          onClick={() => updateStatus(selectedInquiry.id, status)}
                          className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors ${
                            selectedInquiry.status === status
                              ? statusColors[status]
                              : 'border-border text-muted-foreground hover:border-primary'
                          }`}
                        >
                          {status}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2 pt-4">
                    <a href={`tel:${selectedInquiry.mobile}`} className="flex-1">
                      <Button variant="outline" size="sm" className="w-full">
                        <Phone className="w-4 h-4" />
                        Call
                      </Button>
                    </a>
                    <a href={`https://wa.me/${selectedInquiry.mobile.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="flex-1">
                      <Button variant="accent" size="sm" className="w-full">
                        <MessageCircle className="w-4 h-4" />
                        WhatsApp
                      </Button>
                    </a>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-card rounded-xl border border-border p-6 text-center text-muted-foreground">
                Select an inquiry to view details
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
