import { useEffect, useState } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell, TableCaption } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { getCustomVehicles, saveCustomVehicles } from '@/lib/vehicleStore';
import type { Vehicle } from '@/data/vehicles';
import bus1 from '@/assets/bus-1.jpg';
import traveller1 from '@/assets/traveller-1.jpg';

type InquiryStatus = 'new' | 'contacted' | 'closed';

type InquiryRecord = {
  id: string;
  name: string;
  phone: string;
  email?: string;
  vehicleType: string;
  preferredVehicle: string;
  startDate: string;
  endDate: string;
  passengers: string;
  message: string;
  createdAt: string;
  status: InquiryStatus;
  notes?: string;
};

type LeadStatus = 'new' | 'contacted' | 'closed';

type LeadRecord = {
  id: string;
  name: string;
  phone: string;
  passengers: string;
  journeyDate: string;
  createdAt: string;
  status: LeadStatus;
  notes?: string;
};

const INQUIRIES_KEY = 'rentAnyBus_inquiries';
const LEADS_KEY = 'rentAnyBus_leads';

function getStatusBadgeVariant(status: InquiryStatus | LeadStatus) {
  switch (status) {
    case 'new':
      return 'default';
    case 'contacted':
      return 'outline';
    case 'closed':
      return 'secondary';
    default:
      return 'default';
  }
}

export default function AdminPage() {
  const [inquiries, setInquiries] = useState<InquiryRecord[]>([]);
  const [leads, setLeads] = useState<LeadRecord[]>([]);
  const [inquirySearch, setInquirySearch] = useState('');
  const [leadSearch, setLeadSearch] = useState('');
  const [inquiryStatusFilter, setInquiryStatusFilter] = useState<'all' | InquiryStatus>('all');
  const [leadStatusFilter, setLeadStatusFilter] = useState<'all' | LeadStatus>('all');
  const [activeSection, setActiveSection] = useState<'inquiries' | 'vehicles'>('inquiries');
  const [customVehicles, setCustomVehicles] = useState<Vehicle[]>([]);
  const [vehicleForm, setVehicleForm] = useState({
    name: '',
    type: 'bus' as Vehicle['type'],
    category: 'ac' as Vehicle['category'],
    seatingCapacity: '',
    pricePerDay: '',
    amenities: '',
    idealFor: '',
    availability: 'available' as Vehicle['availability'],
    imageUrl: '',
    description: '',
  });
  const [showVehicleForm, setShowVehicleForm] = useState(false);

  useEffect(() => {
    try {
      const storedInquiries = localStorage.getItem(INQUIRIES_KEY);
      const parsedInquiries: InquiryRecord[] = storedInquiries ? JSON.parse(storedInquiries) : [];
      const storedLeads = localStorage.getItem(LEADS_KEY);
      const parsedLeads: LeadRecord[] = storedLeads ? JSON.parse(storedLeads) : [];
      const storedCustomVehicles = getCustomVehicles();

      // Show latest first
      setInquiries(parsedInquiries.sort((a, b) => b.createdAt.localeCompare(a.createdAt)));
      setLeads(parsedLeads.sort((a, b) => b.createdAt.localeCompare(a.createdAt)));
      setCustomVehicles(storedCustomVehicles);
    } catch {
      setInquiries([]);
      setLeads([]);
    }
  }, []);

  const updateInquiries = (next: InquiryRecord[]) => {
    setInquiries(next);
    localStorage.setItem(INQUIRIES_KEY, JSON.stringify(next));
  };

  const updateLeads = (next: LeadRecord[]) => {
    setLeads(next);
    localStorage.setItem(LEADS_KEY, JSON.stringify(next));
  };

  const handleInquiryStatusChange = (id: string, status: InquiryStatus) => {
    updateInquiries(
      inquiries.map((inq) => (inq.id === id ? { ...inq, status } : inq)),
    );
  };

  const handleLeadStatusChange = (id: string, status: LeadStatus) => {
    updateLeads(
      leads.map((lead) => (lead.id === id ? { ...lead, status } : lead)),
    );
  };

  const handleInquiryNote = (id: string) => {
    const existing = inquiries.find((inq) => inq.id === id);
    const current = existing?.notes ?? '';
    const nextNote = window.prompt('Add or update internal note for this inquiry:', current);
    if (nextNote === null) return;
    updateInquiries(
      inquiries.map((inq) => (inq.id === id ? { ...inq, notes: nextNote.trim() || undefined } : inq)),
    );
  };

  const handleLeadNote = (id: string) => {
    const existing = leads.find((lead) => lead.id === id);
    const current = existing?.notes ?? '';
    const nextNote = window.prompt('Add or update internal note for this lead:', current);
    if (nextNote === null) return;
    updateLeads(
      leads.map((lead) => (lead.id === id ? { ...lead, notes: nextNote.trim() || undefined } : lead)),
    );
  };

  const filteredInquiries = inquiries.filter((inq) => {
    const matchesStatus = inquiryStatusFilter === 'all' || inq.status === inquiryStatusFilter;
    const term = inquirySearch.toLowerCase().trim();
    if (!term) return matchesStatus;
    const haystack = `${inq.name} ${inq.phone} ${inq.email ?? ''} ${inq.message ?? ''}`.toLowerCase();
    return matchesStatus && haystack.includes(term);
  });

  const filteredLeads = leads.filter((lead) => {
    const matchesStatus = leadStatusFilter === 'all' || lead.status === leadStatusFilter;
    const term = leadSearch.toLowerCase().trim();
    if (!term) return matchesStatus;
    const haystack = `${lead.name} ${lead.phone}`.toLowerCase();
    return matchesStatus && haystack.includes(term);
  });

  const handleClearInquiries = () => {
    if (confirm('Clear all inquiries? This cannot be undone.')) {
      updateInquiries([]);
    }
  };

  const handleClearLeads = () => {
    if (confirm('Clear all leads? This cannot be undone.')) {
      updateLeads([]);
    }
  };

  const handleVehicleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setVehicleForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddVehicle = (e: React.FormEvent) => {
    e.preventDefault();
    const capacity = parseInt(vehicleForm.seatingCapacity, 10);
    if (!vehicleForm.name.trim() || Number.isNaN(capacity)) {
      return;
    }

    const newVehicle: Vehicle = {
      id: `custom-${Date.now()}`,
      name: vehicleForm.name.trim(),
      type: vehicleForm.type,
      category: vehicleForm.category,
      seatingCapacity: capacity,
      pricePerDay: vehicleForm.pricePerDay || '₹0',
      amenities: vehicleForm.amenities
        .split(',')
        .map((a) => a.trim())
        .filter(Boolean),
      idealFor: vehicleForm.idealFor
        .split(',')
        .map((a) => a.trim())
        .filter(Boolean),
      availability: vehicleForm.availability,
      images: [
        vehicleForm.imageUrl.trim() ||
          (vehicleForm.type === 'bus' ? bus1 : traveller1),
      ],
      description:
        vehicleForm.description.trim() || 'Custom vehicle added from admin panel.',
    };

    const next = [...customVehicles, newVehicle];
    setCustomVehicles(next);
    saveCustomVehicles(next);

    setVehicleForm({
      name: '',
      type: 'bus',
      category: 'ac',
      seatingCapacity: '',
      pricePerDay: '',
      amenities: '',
      idealFor: '',
      availability: 'available',
      imageUrl: '',
      description: '',
    });
  };

  return (
    <AdminLayout activeSection={activeSection} onSectionChange={setActiveSection}>
      <section className="space-y-6">
        {activeSection === 'inquiries' && (
          <>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-2">
              <DashboardStat
                label="Total inquiries"
                value={inquiries.length}
                helper="Full quote form submissions"
              />
              <DashboardStat
                label="New inquiries"
                value={inquiries.filter((i) => i.status === 'new').length}
                helper="Awaiting first call"
              />
              <DashboardStat
                label="Total leads"
                value={leads.length}
                helper="Quick lead form"
              />
              <DashboardStat
                label="New leads"
                value={leads.filter((l) => l.status === 'new').length}
                helper="Need follow‑up"
              />
            </div>

            <Tabs defaultValue="inquiries" className="space-y-6">
              <TabsList>
                <TabsTrigger value="inquiries">
                  Inquiries
                  {inquiries.length > 0 && (
                    <span className="ml-2 inline-flex h-5 min-w-[20px] items-center justify-center rounded-full bg-accent/10 px-1 text-[11px] font-semibold text-accent">
                      {inquiries.length}
                    </span>
                  )}
                </TabsTrigger>
                <TabsTrigger value="leads">
                  Leads
                  {leads.length > 0 && (
                    <span className="ml-2 inline-flex h-5 min-w-[20px] items-center justify-center rounded-full bg-accent/10 px-1 text-[11px] font-semibold text-accent">
                      {leads.length}
                    </span>
                  )}
                </TabsTrigger>
              </TabsList>

              <TabsContent value="inquiries">
              <div className="flex flex-col gap-3 mb-3 md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-foreground">Customer inquiries</h2>
                  <p className="text-xs text-muted-foreground">
                    Search by name, phone or message and track follow‑up status.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
                  <input
                    type="text"
                    placeholder="Search inquiries…"
                    value={inquirySearch}
                    onChange={(e) => setInquirySearch(e.target.value)}
                    className="h-9 w-full sm:w-56 rounded-md border border-border bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  />
                  <select
                    value={inquiryStatusFilter}
                    onChange={(e) => setInquiryStatusFilter(e.target.value as 'all' | InquiryStatus)}
                    className="h-9 rounded-md border border-border bg-background px-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <option value="all">All statuses</option>
                    <option value="new">New</option>
                    <option value="contacted">Contacted</option>
                    <option value="closed">Closed</option>
                  </select>
                  <Button variant="outline" size="sm" onClick={handleClearInquiries} disabled={!inquiries.length}>
                    Clear all
                  </Button>
                </div>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Journey Dates</TableHead>
                    <TableHead>Vehicle</TableHead>
                    <TableHead>Passengers</TableHead>
                    <TableHead>Message</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredInquiries.map((inq) => (
                    <TableRow key={inq.id}>
                      <TableCell>
                        <div className="font-medium">{inq.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {new Date(inq.createdAt).toLocaleString()}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">{inq.phone}</div>
                        {inq.email && (
                          <div className="text-xs text-muted-foreground">{inq.email}</div>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          {inq.startDate} → {inq.endDate}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm capitalize">{inq.vehicleType || '—'}</div>
                        {inq.preferredVehicle && (
                          <div className="text-xs text-muted-foreground">
                            Preferred: {inq.preferredVehicle}
                          </div>
                        )}
                      </TableCell>
                      <TableCell>{inq.passengers || '—'}</TableCell>
                      <TableCell className="max-w-xs">
                        <p className="text-xs text-muted-foreground line-clamp-3">
                          {inq.message || '—'}
                        </p>
                        {inq.notes && (
                          <p className="mt-2 rounded bg-muted px-2 py-1 text-[11px] text-muted-foreground">
                            <span className="font-semibold text-foreground">Note:</span> {inq.notes}
                          </p>
                        )}
                      </TableCell>
                      <TableCell>
                        <Badge variant={getStatusBadgeVariant(inq.status)}>
                          {inq.status === 'new' ? 'New' : inq.status === 'contacted' ? 'Contacted' : 'Closed'}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleInquiryStatusChange(inq.id, 'contacted')}
                        >
                          Mark contacted
                        </Button>
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={() => handleInquiryStatusChange(inq.id, 'closed')}
                        >
                          Close
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleInquiryNote(inq.id)}
                        >
                          Add note
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                  {!filteredInquiries.length && (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center text-sm text-muted-foreground py-10">
                        No inquiries yet. Once a customer submits the full quote form, it will appear here.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
                <TableCaption>All data is stored locally in this browser for demo purposes.</TableCaption>
              </Table>
              </TabsContent>

              <TabsContent value="leads">
              <div className="flex flex-col gap-3 mb-3 md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-foreground">Quick leads</h2>
                  <p className="text-xs text-muted-foreground">
                    View short enquiries from the home‑page lead form and update their status.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
                  <input
                    type="text"
                    placeholder="Search leads…"
                    value={leadSearch}
                    onChange={(e) => setLeadSearch(e.target.value)}
                    className="h-9 w-full sm:w-56 rounded-md border border-border bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  />
                  <select
                    value={leadStatusFilter}
                    onChange={(e) => setLeadStatusFilter(e.target.value as 'all' | LeadStatus)}
                    className="h-9 rounded-md border border-border bg-background px-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <option value="all">All statuses</option>
                    <option value="new">New</option>
                    <option value="contacted">Contacted</option>
                    <option value="closed">Closed</option>
                  </select>
                  <Button variant="outline" size="sm" onClick={handleClearLeads} disabled={!leads.length}>
                    Clear all
                  </Button>
                </div>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Passengers</TableHead>
                    <TableHead>Date of Journey</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredLeads.map((lead) => (
                    <TableRow key={lead.id}>
                      <TableCell>
                        <div className="font-medium">{lead.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {new Date(lead.createdAt).toLocaleString()}
                        </div>
                      </TableCell>
                      <TableCell>{lead.phone}</TableCell>
                      <TableCell>{lead.passengers || '—'}</TableCell>
                      <TableCell className="max-w-[160px]">
                        <div className="text-sm">{lead.journeyDate || '—'}</div>
                        {lead.notes && (
                          <p className="mt-2 rounded bg-muted px-2 py-1 text-[11px] text-muted-foreground">
                            <span className="font-semibold text-foreground">Note:</span> {lead.notes}
                          </p>
                        )}
                      </TableCell>
                      <TableCell>
                        <Badge variant={getStatusBadgeVariant(lead.status)}>
                          {lead.status === 'new' ? 'New' : lead.status === 'contacted' ? 'Contacted' : 'Closed'}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleLeadStatusChange(lead.id, 'contacted')}
                        >
                          Mark contacted
                        </Button>
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={() => handleLeadStatusChange(lead.id, 'closed')}
                        >
                          Close
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleLeadNote(lead.id)}
                        >
                          Add note
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                  {!filteredLeads.length && (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center text-sm text-muted-foreground py-10">
                        No leads yet. When someone submits the home‑page lead form, it will show up here.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
                <TableCaption>All data is stored locally in this browser for demo purposes.</TableCaption>
              </Table>
              </TabsContent>
            </Tabs>
          </>
        )}

        {activeSection === 'vehicles' && (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
              <div>
                <h2 className="text-lg font-semibold text-foreground">Vehicle management</h2>
                <p className="text-xs text-muted-foreground">
                  View all custom vehicles added from this admin panel and keep your public fleet up to date.
                </p>
              </div>
              <Button
                variant={showVehicleForm ? 'outline' : 'default'}
                size="sm"
                onClick={() => setShowVehicleForm((prev) => !prev)}
              >
                {showVehicleForm ? 'Close form' : 'Add vehicle'}
              </Button>
            </div>

            {/* Vehicle Table - Full Width */}
            <div className="rounded-2xl bg-card border border-border card-shadow overflow-hidden">
              <div className="px-4 py-3 border-b border-border/70 flex items-center justify-between">
                <p className="text-sm font-medium">Custom vehicles</p>
                {customVehicles.length > 0 && (
                  <span className="inline-flex items-center rounded-full bg-accent/10 px-2 py-0.5 text-[11px] font-semibold text-accent">
                    {customVehicles.length} total
                  </span>
                )}
              </div>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="min-w-[180px]">Name</TableHead>
                      <TableHead className="min-w-[100px]">Type</TableHead>
                      <TableHead className="min-w-[80px]">AC Type</TableHead>
                      <TableHead className="min-w-[80px]">Seats</TableHead>
                      <TableHead className="min-w-[120px]">Price / day</TableHead>
                      <TableHead className="min-w-[200px]">Description</TableHead>
                      <TableHead className="min-w-[180px]">Amenities</TableHead>
                      <TableHead className="min-w-[150px]">Ideal For</TableHead>
                      <TableHead className="min-w-[100px]">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {customVehicles.map((vehicle) => (
                      <TableRow key={vehicle.id}>
                        <TableCell className="font-medium">{vehicle.name}</TableCell>
                        <TableCell className="capitalize text-sm">{vehicle.type}</TableCell>
                        <TableCell className="text-sm uppercase">{vehicle.category}</TableCell>
                        <TableCell className="text-sm">{vehicle.seatingCapacity}</TableCell>
                        <TableCell className="text-sm">{vehicle.pricePerDay || '—'}</TableCell>
                        <TableCell className="text-xs text-muted-foreground max-w-[200px]">
                          <p className="line-clamp-2">{vehicle.description || '—'}</p>
                        </TableCell>
                        <TableCell className="text-xs text-muted-foreground max-w-[180px]">
                          <p className="line-clamp-2">
                            {vehicle.amenities && vehicle.amenities.length > 0
                              ? vehicle.amenities.join(', ')
                              : '—'}
                          </p>
                        </TableCell>
                        <TableCell className="text-xs text-muted-foreground max-w-[150px]">
                          <p className="line-clamp-2">
                            {vehicle.idealFor && vehicle.idealFor.length > 0
                              ? vehicle.idealFor.join(', ')
                              : '—'}
                          </p>
                        </TableCell>
                        <TableCell className="capitalize text-xs">
                          <span className="inline-flex items-center rounded-full bg-muted px-2 py-0.5">
                            {vehicle.availability}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                    {!customVehicles.length && (
                      <TableRow>
                        <TableCell colSpan={9} className="text-center text-sm text-muted-foreground py-8">
                          No custom vehicles added yet. Click &quot;Add vehicle&quot; to create one.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
              <div className="px-4 py-2 border-t border-border/70">
                <p className="text-[11px] text-muted-foreground">
                  Note: These vehicles are stored locally in this browser and are merged with your main fleet on the
                  public site.
                </p>
              </div>
            </div>

            {/* Add Vehicle Form - Full Width */}
            {showVehicleForm && (
              <div className="rounded-2xl bg-card border border-border card-shadow p-6">
                <div className="mb-4">
                  <h3 className="text-lg font-semibold mb-1">Add new vehicle</h3>
                  <p className="text-xs text-muted-foreground">
                    Add vehicles with the same details shown on the vehicle pages. Amenities and &quot;ideal for&quot;
                    accept comma‑separated lists.
                  </p>
                </div>
                <form onSubmit={handleAddVehicle} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Name *</label>
                      <Input
                        name="name"
                        value={vehicleForm.name}
                        onChange={handleVehicleFormChange}
                        placeholder="e.g., 35 Seater AC Coach"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Price / day</label>
                      <Input
                        name="pricePerDay"
                        value={vehicleForm.pricePerDay}
                        onChange={handleVehicleFormChange}
                        placeholder="e.g., ₹15,000"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Type *</label>
                      <select
                        name="type"
                        value={vehicleForm.type}
                        onChange={handleVehicleFormChange}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        required
                      >
                        <option value="bus">Bus</option>
                        <option value="traveller">Tempo Traveller</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">AC Type *</label>
                      <select
                        name="category"
                        value={vehicleForm.category}
                        onChange={handleVehicleFormChange}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        required
                      >
                        <option value="ac">AC</option>
                        <option value="non-ac">Non-AC</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Seats *</label>
                      <Input
                        name="seatingCapacity"
                        type="number"
                        min={1}
                        value={vehicleForm.seatingCapacity}
                        onChange={handleVehicleFormChange}
                        placeholder="e.g., 35"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Description</label>
                    <Textarea
                      name="description"
                      rows={3}
                      value={vehicleForm.description}
                      onChange={handleVehicleFormChange}
                      placeholder="Short description shown on the detail page"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Amenities (comma separated)</label>
                      <Textarea
                        name="amenities"
                        rows={3}
                        value={vehicleForm.amenities}
                        onChange={handleVehicleFormChange}
                        placeholder="AC, Push-back seats, Music system"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">&quot;Ideal for&quot; tags (comma separated)</label>
                      <Textarea
                        name="idealFor"
                        rows={3}
                        value={vehicleForm.idealFor}
                        onChange={handleVehicleFormChange}
                        placeholder="Family trips, Corporate outings"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Image URL (optional)</label>
                      <Input
                        name="imageUrl"
                        value={vehicleForm.imageUrl}
                        onChange={handleVehicleFormChange}
                        placeholder="https://your-image.jpg"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Availability</label>
                      <select
                        name="availability"
                        value={vehicleForm.availability}
                        onChange={handleVehicleFormChange}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      >
                        <option value="available">Available</option>
                        <option value="limited">Limited</option>
                        <option value="booked">Booked</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex justify-end gap-3 pt-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setShowVehicleForm(false)}
                    >
                      Cancel
                    </Button>
                    <Button type="submit" size="sm">
                      Save vehicle
                    </Button>
                  </div>
                </form>
              </div>
            )}
          </div>
        )}
        </section>
      </AdminLayout>
  );
}

interface DashboardStatProps {
  label: string;
  value: number;
  helper?: string;
}

function DashboardStat({ label, value, helper }: DashboardStatProps) {
  return (
    <div className="rounded-2xl bg-card border border-border card-shadow px-4 py-3 md:px-5 md:py-4 flex flex-col justify-between">
      <p className="text-[11px] uppercase tracking-wide text-muted-foreground mb-1">{label}</p>
      <p className="text-xl md:text-2xl font-semibold mb-1">{value}</p>
      {helper && <p className="text-[11px] text-muted-foreground">{helper}</p>}
    </div>
  );
}

