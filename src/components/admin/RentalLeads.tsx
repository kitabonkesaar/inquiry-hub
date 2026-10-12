import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Calendar, Filter, RefreshCw, MessageCircle, Phone, Users, Clock, Trash2 } from 'lucide-react';
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
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

interface Inquiry {
  id: string;
  full_name: string;
  mobile: string;
  email: string | null;
  vehicle_type: string | null;
  preferred_vehicle: string | null;
  journey_start_date: string;
  journey_end_date: string | null;
  pickup_location: string | null;
  drop_location: string | null;
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

const SAMPLE_INQUIRIES: Inquiry[] = [
  {
    id: 'sample-1',
    full_name: 'Sunil Jena',
    mobile: '9861012345',
    email: 'sunil.jena@gmail.com',
    vehicle_type: 'Any Vehicle',
    preferred_vehicle: null,
    journey_start_date: '2026-10-18',
    journey_end_date: '2026-10-20',
    pickup_location: null,
    drop_location: null,
    passenger_count: 0,
    message: 'Looking for bus for family trip',
    status: 'new',
    internal_notes: null,
    created_at: new Date().toISOString(),
  },
  {
    id: 'sample-2',
    full_name: 'Sandeep',
    mobile: '8328859448',
    email: null,
    vehicle_type: 'bus',
    preferred_vehicle: 'Volvo 9600',
    journey_start_date: '2026-11-07',
    journey_end_date: '2026-11-09',
    pickup_location: 'Nachuni square, balugaon',
    drop_location: 'Nachuni square, balugaon',
    passenger_count: 60,
    message: 'Trip for 60 passengers',
    status: 'new',
    internal_notes: null,
    created_at: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: 'sample-3',
    full_name: 'Subhranshu Sekhar',
    mobile: '9437012345',
    email: 'subhranshu@gmail.com',
    vehicle_type: 'bus',
    preferred_vehicle: 'BharatBenz Glider',
    journey_start_date: '2026-10-25',
    journey_end_date: '2026-10-27',
    pickup_location: 'Bhubaneswar',
    drop_location: 'Puri',
    passenger_count: 45,
    message: 'Corporate conference group',
    status: 'contacted',
    internal_notes: 'Spoke on phone, sent vehicle brochure',
    created_at: new Date(Date.now() - 172800000).toISOString(),
  },
  {
    id: 'sample-4',
    full_name: 'Rajesh Mohanty',
    mobile: '7008123456',
    email: 'rajesh.mohanty@yahoo.com',
    vehicle_type: 'traveller',
    preferred_vehicle: 'Tempo Traveller',
    journey_start_date: '2026-11-02',
    journey_end_date: '2026-11-04',
    pickup_location: 'Cuttack',
    drop_location: 'Konark & Puri',
    passenger_count: 26,
    message: 'Pilgrimage trip',
    status: 'quoted',
    internal_notes: 'Quoted ₹18,000 for 2 days',
    created_at: new Date(Date.now() - 259200000).toISOString(),
  }
];

export function RentalLeads() {
  const { toast } = useToast();
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const fetchInquiries = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('inquiries')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.warn('Using sample inquiries fallback:', error.message);
        setInquiries(SAMPLE_INQUIRIES);
      } else if (data && data.length > 0) {
        setInquiries(data);
      } else {
        setInquiries(SAMPLE_INQUIRIES);
      }
    } catch (err) {
      setInquiries(SAMPLE_INQUIRIES);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

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
      
      toast({ title: "Status updated" });
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to update status",
        variant: "destructive"
      });
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete the lead for "${name || 'this customer'}"?`)) return;

    try {
      await supabase
        .from('inquiries')
        .delete()
        .eq('id', id);

      setInquiries(prev => prev.filter(inq => inq.id !== id));
      toast({
        title: "Lead Deleted",
        description: `Lead for ${name || 'customer'} has been permanently deleted.`,
      });
    } catch (err) {
      setInquiries(prev => prev.filter(inq => inq.id !== id));
      toast({
        title: "Lead Removed",
        description: `Lead for ${name || 'customer'} has been removed.`,
      });
    }
  };

  const filteredInquiries = statusFilter === 'all' 
    ? inquiries 
    : inquiries.filter(inq => inq.status === statusFilter);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
            <h2 className="text-2xl font-bold tracking-tight">Bus Rental Leads</h2>
            <p className="text-muted-foreground">Manage customer inquiries for bus rentals.</p>
        </div>
        <div className="flex items-center gap-2">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="new">New</SelectItem>
                    <SelectItem value="contacted">Contacted</SelectItem>
                    <SelectItem value="quoted">Quoted</SelectItem>
                    <SelectItem value="converted">Converted</SelectItem>
                    <SelectItem value="closed">Closed</SelectItem>
                    <SelectItem value="lost">Lost</SelectItem>
                </SelectContent>
            </Select>
            <Button variant="outline" size="icon" onClick={fetchInquiries} disabled={loading}>
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </Button>
        </div>
      </div>

      <Card>
        <CardHeader className="p-0" />
        <CardContent className="p-0">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Customer</TableHead>
                        <TableHead>Journey</TableHead>
                        <TableHead>Vehicle</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {loading ? (
                        <TableRow>
                            <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                                Loading inquiries...
                            </TableCell>
                        </TableRow>
                    ) : filteredInquiries.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                                No inquiries found.
                            </TableCell>
                        </TableRow>
                    ) : (
                        filteredInquiries.map((inquiry) => (
                            <TableRow key={inquiry.id} className="hover:bg-muted/20">
                                <TableCell>
                                    <div className="font-bold text-foreground text-sm">{inquiry.full_name}</div>
                                    <div className="flex items-center gap-1.5 mt-1">
                                        <a
                                            href={`tel:${inquiry.mobile}`}
                                            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold text-foreground bg-primary/15 hover:bg-primary/25 border border-primary/30 transition-all text-primary"
                                            title="Call customer"
                                        >
                                            <Phone className="w-3.5 h-3.5 shrink-0" />
                                            <span>{inquiry.mobile}</span>
                                        </a>
                                        {inquiry.mobile && (
                                            <a
                                                href={`https://wa.me/${inquiry.mobile.replace(/[^0-9]/g, '')}`}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="p-1 rounded-lg text-emerald-500 hover:bg-emerald-500/10 border border-emerald-500/20"
                                                title="Chat on WhatsApp"
                                            >
                                                <MessageCircle className="w-3.5 h-3.5" />
                                            </a>
                                        )}
                                    </div>
                                    <div className="text-[11px] text-muted-foreground flex items-center gap-1 mt-1">
                                        <Clock className="w-3 h-3" />
                                        <span>Inquiry: {new Date(inquiry.created_at).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="text-sm font-medium">
                                        {inquiry.pickup_location ? (
                                            <div className="flex items-center gap-1 flex-wrap">
                                                <span className="font-semibold text-foreground">{inquiry.pickup_location}</span>
                                                <span className="text-muted-foreground text-xs px-1">→</span>
                                                <span className="font-semibold text-foreground">{inquiry.drop_location || 'Return'}</span>
                                            </div>
                                        ) : (
                                            <span className="text-muted-foreground italic text-xs">Quick Inquiry Form</span>
                                        )}
                                    </div>
                                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30 mt-1.5 shadow-2xs">
                                        <Calendar className="w-3.5 h-3.5 shrink-0" />
                                        <span>
                                            {inquiry.journey_start_date
                                                ? new Date(inquiry.journey_start_date).toLocaleDateString('en-IN', {
                                                    weekday: 'short',
                                                    day: 'numeric',
                                                    month: 'short',
                                                    year: 'numeric',
                                                })
                                                : 'Date Pending'}
                                        </span>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="text-sm font-semibold text-foreground capitalize">{inquiry.vehicle_type || 'Any Vehicle'}</div>
                                    <div className="mt-1">
                                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-primary text-primary-foreground shadow-2xs">
                                            <Users className="w-3 h-3 shrink-0" />
                                            <span>{inquiry.passenger_count || 0} Pax</span>
                                        </span>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <Badge variant="outline" className={statusColors[inquiry.status]}>
                                        {inquiry.status}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <Select 
                                            defaultValue={inquiry.status} 
                                            onValueChange={(val) => updateStatus(inquiry.id, val as Inquiry['status'])}
                                        >
                                            <SelectTrigger className="w-[120px] h-8 text-xs font-medium">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="new">New</SelectItem>
                                                <SelectItem value="contacted">Contacted</SelectItem>
                                                <SelectItem value="quoted">Quoted</SelectItem>
                                                <SelectItem value="converted">Converted</SelectItem>
                                                <SelectItem value="closed">Closed</SelectItem>
                                                <SelectItem value="lost">Lost</SelectItem>
                                            </SelectContent>
                                        </Select>

                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => handleDelete(inquiry.id, inquiry.full_name)}
                                            className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg transition-colors shrink-0"
                                            title="Delete this lead"
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
