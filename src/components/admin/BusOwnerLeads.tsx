import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { RefreshCw, MapPin, Truck, Phone, MessageCircle, Clock, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

interface BusOwnerLead {
  id: string;
  full_name: string;
  mobile: string;
  email: string | null;
  city: string;
  vehicle_details: string | null;
  status: string;
  created_at: string;
}

export function BusOwnerLeads() {
  const { toast } = useToast();
  const [leads, setLeads] = useState<BusOwnerLead[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('bus_owner_leads')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setLeads(data || []);
    } catch (err) {
      console.error('Error fetching leads:', err);
      toast({
        title: "Error",
        description: "Failed to load bus owner leads",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const updateStatus = async (id: string, status: string) => {
    try {
      const { error } = await supabase
        .from('bus_owner_leads')
        .update({ status })
        .eq('id', id);

      if (error) throw error;
      
      setLeads(prev => prev.map(lead => 
        lead.id === id ? { ...lead, status } : lead
      ));
      
      toast({ title: "Status updated" });
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to update status",
        variant: "destructive"
      });
    }
  };

  const handleDeleteLead = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete the partner lead for "${name || 'this operator'}"?`)) return;

    try {
      await supabase
        .from('bus_owner_leads')
        .delete()
        .eq('id', id);

      setLeads(prev => prev.filter(l => l.id !== id));
      toast({
        title: "Lead Deleted",
        description: `Bus owner lead for ${name || 'operator'} has been deleted.`,
      });
    } catch (err) {
      setLeads(prev => prev.filter(l => l.id !== id));
      toast({
        title: "Lead Removed",
        description: `Bus owner lead for ${name || 'operator'} has been removed.`,
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
            <h2 className="text-2xl font-bold tracking-tight">Bus Owner Leads</h2>
            <p className="text-muted-foreground">Partners interested in listing their buses.</p>
        </div>
        <Button variant="outline" size="icon" onClick={fetchLeads} disabled={loading}>
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
        </Button>
      </div>

      <Card>
        <CardHeader className="p-0" />
        <CardContent className="p-0">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Owner Details</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Vehicle Details</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {loading ? (
                        <TableRow>
                            <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                                Loading leads...
                            </TableCell>
                        </TableRow>
                    ) : leads.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                                No leads found.
                            </TableCell>
                        </TableRow>
                    ) : (
                        leads.map((lead) => (
                            <TableRow key={lead.id}>
                                <TableCell>
                                    <div className="font-bold text-foreground text-sm">{lead.full_name}</div>
                                    <div className="flex items-center gap-1.5 mt-1">
                                        <a
                                            href={`tel:${lead.mobile}`}
                                            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold text-foreground bg-primary/15 hover:bg-primary/25 border border-primary/30 transition-all text-primary"
                                            title="Call owner"
                                        >
                                            <Phone className="w-3.5 h-3.5 shrink-0" />
                                            <span>{lead.mobile}</span>
                                        </a>
                                        {lead.mobile && (
                                            <a
                                                href={`https://wa.me/${lead.mobile.replace(/[^0-9]/g, '')}`}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="p-1 rounded-lg text-emerald-500 hover:bg-emerald-500/10 border border-emerald-500/20"
                                                title="WhatsApp"
                                            >
                                                <MessageCircle className="w-3.5 h-3.5" />
                                            </a>
                                        )}
                                    </div>
                                    <div className="text-[11px] text-muted-foreground flex items-center gap-1 mt-1">
                                        <Clock className="w-3 h-3" />
                                        <span>Registered: {new Date(lead.created_at).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-2">
                                        <MapPin className="w-4 h-4 text-muted-foreground" />
                                        <span>{lead.city}</span>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="max-w-md text-sm text-muted-foreground">
                                        {lead.vehicle_details || 'No details provided'}
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <Badge variant={lead.status === 'new' ? 'default' : 'secondary'}>
                                        {lead.status}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <Select 
                                            defaultValue={lead.status} 
                                            onValueChange={(val) => updateStatus(lead.id, val)}
                                        >
                                            <SelectTrigger className="w-[120px] h-8 text-xs font-medium">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="new">New</SelectItem>
                                                <SelectItem value="contacted">Contacted</SelectItem>
                                                <SelectItem value="onboarded">Onboarded</SelectItem>
                                                <SelectItem value="rejected">Rejected</SelectItem>
                                            </SelectContent>
                                        </Select>

                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => handleDeleteLead(lead.id, lead.full_name)}
                                            className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg transition-colors shrink-0"
                                            title="Delete this partner lead"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </CardContent>
      </Card>
    </div>
  );
}
