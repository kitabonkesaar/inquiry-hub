import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Calendar, Filter, RefreshCw, MessageCircle } from 'lucide-react';
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
                            <TableRow key={inquiry.id}>
                                <TableCell>
                                    <div className="font-medium">{inquiry.full_name}</div>
                                    <div className="text-sm text-muted-foreground">{inquiry.mobile}</div>
                                    <div className="text-xs text-muted-foreground">{new Date(inquiry.created_at).toLocaleDateString()}</div>
                                </TableCell>
                                <TableCell>
                                    <div className="text-sm">
                                        {inquiry.pickup_location ? (
                                            <>
                                                <span className="font-medium">{inquiry.pickup_location}</span>
                                                <span className="text-muted-foreground mx-1">to</span>
                                                <span className="font-medium">{inquiry.drop_location || '?'}</span>
                                            </>
                                        ) : (
                                            <span className="text-muted-foreground italic">Quick Inquiry</span>
                                        )}
                                    </div>
                                    <div className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                                        <Calendar className="w-3 h-3" />
                                        {new Date(inquiry.journey_start_date).toLocaleDateString()}
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="text-sm">{inquiry.vehicle_type || 'Any Vehicle'}</div>
                                    <div className="text-xs text-muted-foreground">{inquiry.passenger_count} Pax</div>
                                </TableCell>
                                <TableCell>
                                    <Badge variant="outline" className={statusColors[inquiry.status]}>
                                        {inquiry.status}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-right">
                                    <Select 
                                        defaultValue={inquiry.status} 
                                        onValueChange={(val) => updateStatus(inquiry.id, val as Inquiry['status'])}
                                    >
                                        <SelectTrigger className="w-[130px] ml-auto h-8">
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
