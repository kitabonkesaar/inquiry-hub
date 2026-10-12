import React, { useState, useEffect } from 'react';
import { marketplaceStore } from '@/services/marketplaceStore';
import { MarketplaceBus, Booking, OwnerKYC, PlatformSettings } from '@/types/marketplace';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import {
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Download,
  DollarSign,
  TrendingUp,
  Percent,
  Megaphone,
  Users,
  Bus,
  RotateCcw,
  AlertTriangle,
  FileSpreadsheet,
} from 'lucide-react';

export function MarketplaceAdminSection() {
  const [metrics, setMetrics] = useState(marketplaceStore.getAdminMetrics());
  const [buses, setBuses] = useState<MarketplaceBus[]>(marketplaceStore.getBuses());
  const [bookings, setBookings] = useState<Booking[]>(marketplaceStore.getBookings());
  const [kycs, setKycs] = useState<OwnerKYC[]>(marketplaceStore.getAllOwnerKYCs());
  const [settings, setSettings] = useState<PlatformSettings>(marketplaceStore.getSettings());

  // Commission settings inputs
  const [commType, setCommType] = useState<'percentage' | 'flat'>(settings.commissionType);
  const [commValue, setCommValue] = useState<number>(settings.commissionValue);

  // Broadcast announcement
  const [announceTitle, setAnnounceTitle] = useState('');
  const [announceMessage, setAnnounceMessage] = useState('');

  useEffect(() => {
    const refresh = () => {
      setMetrics(marketplaceStore.getAdminMetrics());
      setBuses(marketplaceStore.getBuses());
      setBookings(marketplaceStore.getBookings());
      setKycs(marketplaceStore.getAllOwnerKYCs());
      setSettings(marketplaceStore.getSettings());
    };
    refresh();
    const unsub = marketplaceStore.subscribe(refresh);
    return unsub;
  }, []);

  const handleApproveBus = (busId: string) => {
    marketplaceStore.updateBusStatus(busId, 'approved');
    toast.success('Bus approved! Now published and live on the marketplace.');
  };

  const handleRejectBus = (busId: string) => {
    marketplaceStore.updateBusStatus(busId, 'rejected');
    toast.error('Bus listing rejected.');
  };

  const handleVerifyKYC = (ownerId: string) => {
    marketplaceStore.verifyOwnerKYC(ownerId, 'verified');
    toast.success('Owner KYC marked as verified! Payouts enabled.');
  };

  const handleProcessRefund = (b: Booking) => {
    marketplaceStore.processRefund(b.id);
    toast.success(`Refund of ₹${(b.refundAmount || 0).toLocaleString('en-IN')} processed to ${b.customerName}.`);
  };

  const handleSaveCommission = (e: React.FormEvent) => {
    e.preventDefault();
    marketplaceStore.updateSettings({
      commissionType: commType,
      commissionValue: Number(commValue),
    });
    toast.success(`Platform commission updated to ${commValue}${commType === 'percentage' ? '%' : ' INR'}.`);
  };

  const handleBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    if (!announceTitle.trim() || !announceMessage.trim()) return;

    marketplaceStore.addNotification({
      recipientRole: 'all',
      title: announceTitle.trim(),
      message: announceMessage.trim(),
      type: 'announcement',
      channel: 'push',
    });

    toast.success('Announcement broadcasted to all customers and bus owners!');
    setAnnounceTitle('');
    setAnnounceMessage('');
  };

  const downloadCSV = (type: 'earnings' | 'users' | 'trips') => {
    const csvContent = marketplaceStore.exportCSV(type);
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `RentAnyBus_${type}_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success(`Downloaded ${type} report.`);
  };

  const pendingBuses = buses.filter((b) => b.status === 'pending');
  const disputes = bookings.filter((b) => b.disputeStatus === 'refund_requested');

  return (
    <div className="space-y-6">
      {/* Top Banner & CSV Quick Export Bar */}
      <div className="bg-gradient-to-r from-indigo-500/10 via-purple-500/5 to-transparent border border-indigo-500/20 rounded-2xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Badge className="bg-indigo-600 text-white">Super Admin Management</Badge>
            {pendingBuses.length > 0 && (
              <Badge variant="destructive" className="animate-pulse">
                {pendingBuses.length} Pending Bus Approvals
              </Badge>
            )}
          </div>
          <h2 className="text-2xl font-bold text-foreground mt-1">Rent Any Bus Marketplace Control</h2>
          <p className="text-xs text-muted-foreground">
            Manage charter bookings, KYC compliance, disputes, commissions, and CSV exports.
          </p>
        </div>

        {/* CSV Export Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => downloadCSV('earnings')}
            className="text-xs h-9 rounded-xl flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5 text-emerald-600" />
            <span>Earnings CSV</span>
          </Button>

          <Button
            size="sm"
            variant="outline"
            onClick={() => downloadCSV('trips')}
            className="text-xs h-9 rounded-xl flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5 text-blue-600" />
            <span>Trips CSV</span>
          </Button>

          <Button
            size="sm"
            variant="outline"
            onClick={() => downloadCSV('users')}
            className="text-xs h-9 rounded-xl flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5 text-indigo-600" />
            <span>Users CSV</span>
          </Button>
        </div>
      </div>

      {/* Admin KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card className="rounded-2xl border shadow-xs">
          <CardHeader className="pb-1">
            <CardTitle className="text-xs font-medium text-muted-foreground">Gross Merchandise Volume</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold text-foreground">
              ₹{metrics.gmv.toLocaleString('en-IN')}
            </div>
            <p className="text-[11px] text-muted-foreground mt-0.5">{metrics.totalBookings} Total Charters</p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border shadow-xs">
          <CardHeader className="pb-1">
            <CardTitle className="text-xs font-medium text-muted-foreground">Platform Commission</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold text-emerald-600">
              ₹{metrics.totalCommission.toLocaleString('en-IN')}
            </div>
            <p className="text-[11px] text-muted-foreground mt-0.5">Rate: {settings.commissionValue}{settings.commissionType === 'percentage' ? '%' : '₹'}</p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border shadow-xs">
          <CardHeader className="pb-1">
            <CardTitle className="text-xs font-medium text-muted-foreground">Active Trips</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold text-blue-600">{metrics.activeTrips}</div>
            <p className="text-[11px] text-muted-foreground mt-0.5">Currently on road</p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border shadow-xs">
          <CardHeader className="pb-1">
            <CardTitle className="text-xs font-medium text-muted-foreground">Marketplace Fleet</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold text-foreground">{metrics.fleetCount} Buses</div>
            <p className="text-[11px] text-muted-foreground mt-0.5">{pendingBuses.length} Pending Review</p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border shadow-xs">
          <CardHeader className="pb-1">
            <CardTitle className="text-xs font-medium text-muted-foreground">Disputes & Refunds</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold text-rose-600">{disputes.length} Pending</div>
            <p className="text-[11px] text-muted-foreground mt-0.5">Action required</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Tabs */}
      <Tabs defaultValue="approvals" className="space-y-4">
        <TabsList className="grid grid-cols-5 max-w-2xl text-xs">
          <TabsTrigger value="approvals">
            Approvals ({pendingBuses.length + kycs.filter((k) => k.kycStatus === 'pending').length})
          </TabsTrigger>
          <TabsTrigger value="disputes">Disputes ({disputes.length})</TabsTrigger>
          <TabsTrigger value="commission">Commission Settings</TabsTrigger>
          <TabsTrigger value="directory">Users & Owners</TabsTrigger>
          <TabsTrigger value="broadcast">Announcements</TabsTrigger>
        </TabsList>

        {/* TAB 1: BUS & KYC APPROVALS */}
        <TabsContent value="approvals" className="space-y-4">
          <div className="bg-card border rounded-2xl p-5 shadow-xs space-y-4">
            <h3 className="text-base font-bold text-foreground">Bus Listing Approval Queue</h3>
            {pendingBuses.length === 0 ? (
              <p className="text-xs text-muted-foreground py-4 text-center">
                All submitted buses have been reviewed. No pending queue.
              </p>
            ) : (
              <div className="space-y-3">
                {pendingBuses.map((b) => (
                  <div
                    key={b.id}
                    className="p-4 border rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-muted/20"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-14 h-10 rounded-lg overflow-hidden bg-muted shrink-0">
                        <img src={b.images[0]} alt={b.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-sm text-foreground">{b.name}</h4>
                          <Badge variant="outline" className="text-[10px]">{b.layout}</Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Owner: <strong>{b.ownerName}</strong> • Plate: {b.registrationNumber} • Rent: ₹{b.pricePerDay.toLocaleString('en-IN')}/day
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleRejectBus(b.id)}
                        className="text-xs h-8 rounded-lg"
                      >
                        <XCircle className="w-3.5 h-3.5 mr-1" /> Reject
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => handleApproveBus(b.id)}
                        className="text-xs h-8 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> Approve & Publish
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <Separator />

            {/* KYC Approvals */}
            <h3 className="text-base font-bold text-foreground pt-2">Owner KYC Submissions</h3>
            <div className="space-y-3">
              {kycs.map((k) => (
                <div
                  key={k.ownerId}
                  className="p-4 border rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-muted/10 text-xs"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-foreground text-sm">{k.businessName}</span>
                      <Badge
                        className={
                          k.kycStatus === 'verified'
                            ? 'bg-emerald-500/10 text-emerald-600 border-emerald-300'
                            : 'bg-amber-500/10 text-amber-600 border-amber-300'
                        }
                      >
                        {k.kycStatus.toUpperCase()}
                      </Badge>
                    </div>
                    <p className="text-muted-foreground mt-0.5">
                      Contact: {k.contactPerson} ({k.phone}) • GST: {k.gstNumber} • Bank: {k.bankName} (A/C: {k.bankAccountNumber})
                    </p>
                  </div>

                  {k.kycStatus !== 'verified' && (
                    <Button
                      size="sm"
                      onClick={() => handleVerifyKYC(k.ownerId)}
                      className="text-xs h-8 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold"
                    >
                      <ShieldCheck className="w-3.5 h-3.5 mr-1" /> Approve KYC
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        {/* TAB 2: DISPUTES & REFUNDS */}
        <TabsContent value="disputes" className="space-y-4">
          <div className="bg-card border rounded-2xl p-5 shadow-xs space-y-4">
            <h3 className="text-base font-bold text-foreground">Disputes & Cancellation Refund Requests</h3>
            {disputes.length === 0 ? (
              <p className="text-xs text-muted-foreground py-6 text-center">
                No active refund requests or customer disputes.
              </p>
            ) : (
              <div className="space-y-3">
                {disputes.map((b) => (
                  <div
                    key={b.id}
                    className="p-4 border rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-rose-500/5 border-rose-500/20 text-xs"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-foreground text-sm">#{b.bookingNumber} - {b.busName}</span>
                        <Badge variant="destructive">Refund Pending</Badge>
                      </div>
                      <p className="text-muted-foreground mt-0.5">
                        Customer: {b.customerName} ({b.customerPhone}) • Reason: "{b.cancellationReason || 'N/A'}"
                      </p>
                      <p className="text-rose-600 font-semibold mt-1">
                        Advance Paid: ₹{b.advanceAmount.toLocaleString('en-IN')} • Eligible Refund: ₹{(b.refundAmount || 0).toLocaleString('en-IN')}
                      </p>
                    </div>

                    <Button
                      size="sm"
                      onClick={() => handleProcessRefund(b)}
                      className="text-xs h-9 rounded-xl font-bold bg-rose-600 hover:bg-rose-700 text-white"
                    >
                      <RotateCcw className="w-3.5 h-3.5 mr-1.5" />
                      Process ₹{(b.refundAmount || 0).toLocaleString('en-IN')} Refund
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </TabsContent>

        {/* TAB 3: COMMISSION SETTINGS */}
        <TabsContent value="commission" className="space-y-4">
          <div className="bg-card border rounded-2xl p-6 shadow-xs max-w-xl space-y-4">
            <div>
              <h3 className="text-base font-bold text-foreground">Platform Commission Configuration</h3>
              <p className="text-xs text-muted-foreground">
                Set how the platform earns on each completed charter rental.
              </p>
            </div>

            <form onSubmit={handleSaveCommission} className="space-y-4 text-xs">
              <div className="space-y-1.5">
                <Label>Commission Model</Label>
                <Select value={commType} onValueChange={(v: any) => setCommType(v)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="percentage">Percentage Fee (% of Total Trip Fare)</SelectItem>
                    <SelectItem value="flat">Flat Platform Fee (Fixed ₹ per Charter)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="comm_val">
                  Commission Value ({commType === 'percentage' ? 'Percentage %' : 'Flat Amount ₹'})
                </Label>
                <Input
                  id="comm_val"
                  type="number"
                  min={1}
                  value={commValue}
                  onChange={(e) => setCommValue(Number(e.target.value))}
                  required
                />
              </div>

              <div className="p-3 bg-muted/40 rounded-xl text-[11px] text-muted-foreground border">
                <strong>Current Formula:</strong> Owner Net Earnings = Total Rent Fare -{' '}
                {commType === 'percentage' ? `${commValue}% Commission` : `₹${commValue} Flat Fee`}.
              </div>

              <Button type="submit" className="w-full rounded-xl h-10 text-xs font-semibold">
                Save Platform Commission
              </Button>
            </form>
          </div>
        </TabsContent>

        {/* TAB 4: USERS & OWNERS DIRECTORY */}
        <TabsContent value="directory" className="space-y-4">
          <div className="bg-card border rounded-2xl p-5 shadow-xs space-y-4 text-xs">
            <h3 className="text-base font-bold text-foreground">Verified Fleet Operators</h3>
            <div className="border rounded-xl divide-y">
              {kycs.map((k) => (
                <div key={k.ownerId} className="p-3 flex items-center justify-between">
                  <div>
                    <span className="font-semibold text-foreground text-sm block">{k.businessName}</span>
                    <span className="text-muted-foreground">
                      Contact: {k.contactPerson} ({k.phone}) • {k.email}
                    </span>
                  </div>
                  <Badge className="bg-emerald-500/10 text-emerald-600 border-emerald-300">
                    {k.kycStatus.toUpperCase()}
                  </Badge>
                </div>
              ))}
            </div>

            <h3 className="text-base font-bold text-foreground pt-3">Recent Charter Customers</h3>
            <div className="border rounded-xl divide-y">
              {bookings.map((b) => (
                <div key={b.id} className="p-3 flex items-center justify-between">
                  <div>
                    <span className="font-semibold text-foreground block">{b.customerName}</span>
                    <span className="text-muted-foreground">
                      {b.customerPhone} • {b.customerEmail} • Destination: {b.dropLocation}
                    </span>
                  </div>
                  <Badge variant="outline">{b.bookingNumber}</Badge>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        {/* TAB 5: BROADCAST ANNOUNCEMENTS */}
        <TabsContent value="broadcast" className="space-y-4">
          <div className="bg-card border rounded-2xl p-6 shadow-xs max-w-xl space-y-4">
            <div>
              <h3 className="text-base font-bold text-foreground">Broadcast Platform Announcement</h3>
              <p className="text-xs text-muted-foreground">
                Send an immediate notification alert to all travelers and bus operators.
              </p>
            </div>

            <form onSubmit={handleBroadcast} className="space-y-3 text-xs">
              <div className="space-y-1">
                <Label htmlFor="ann_title">Announcement Title</Label>
                <Input
                  id="ann_title"
                  placeholder="e.g. Special Holiday Booking Incentive or Policy Update"
                  value={announceTitle}
                  onChange={(e) => setAnnounceTitle(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-1">
                <Label htmlFor="ann_msg">Announcement Body</Label>
                <Textarea
                  id="ann_msg"
                  placeholder="Type the message that will pop up in in-app notification centers..."
                  value={announceMessage}
                  onChange={(e) => setAnnounceMessage(e.target.value)}
                  className="min-h-[100px]"
                  required
                />
              </div>

              <Button type="submit" className="w-full rounded-xl h-10 text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white">
                <Megaphone className="w-4 h-4 mr-1.5" /> Broadcast to All Users
              </Button>
            </form>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
