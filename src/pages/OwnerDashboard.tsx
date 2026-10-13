import React, { useState, useEffect } from 'react';
import { Layout } from '@/components/layout/Layout';
import { marketplaceStore } from '@/services/marketplaceStore';
import { MarketplaceBus, Booking, PayoutRequest } from '@/types/marketplace';
import { AddBusModal } from '@/components/owner/AddBusModal';
import { OwnerKYCModal } from '@/components/owner/OwnerKYCModal';
import { BookingChatModal } from '@/components/chat/BookingChatModal';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { SEOHead } from '@/components/seo/SEOHead';
import {
  Bus,
  Briefcase,
  DollarSign,
  TrendingUp,
  Plus,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  MessageCircle,
  Clock,
  Calendar,
  MapPin,
  Wallet,
  ArrowUpRight,
  Download,
  AlertCircle,
  Star,
  Users,
} from 'lucide-react';

export default function OwnerDashboard() {
  const ownerId = 'owner-1';
  const ownerName = 'Kalinga Express Lines';

  const [buses, setBuses] = useState<MarketplaceBus[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [financials, setFinancials] = useState<any>({});
  const [payouts, setPayouts] = useState<PayoutRequest[]>([]);

  // Modals
  const [isAddBusOpen, setIsAddBusOpen] = useState(false);
  const [isKYCOpen, setIsKYCOpen] = useState(false);
  const [chatBooking, setChatBooking] = useState<Booking | null>(null);

  useEffect(() => {
    const load = () => {
      setBuses(marketplaceStore.getOwnerBuses(ownerId));
      setBookings(marketplaceStore.getOwnerBookings(ownerId));
      setFinancials(marketplaceStore.getOwnerFinancials(ownerId));
      setPayouts(marketplaceStore.getPayoutRequests(ownerId));
    };

    load();
    const unsub = marketplaceStore.subscribe(load);
    return unsub;
  }, []);

  const handleAcceptBooking = (b: Booking) => {
    marketplaceStore.updateBookingStatus(b.id, 'Confirmed');
    toast.success(`Booking #${b.bookingNumber} accepted. Trip confirmed for customer!`);
  };

  const handleRejectBooking = (b: Booking) => {
    marketplaceStore.updateBookingStatus(b.id, 'Cancelled');
    toast.error(`Booking #${b.bookingNumber} declined.`);
  };

  const handleRequestPayout = () => {
    if (financials.availableBalance <= 0) {
      toast.error('No unsettled balance available for withdrawal.');
      return;
    }
    const req = marketplaceStore.requestPayout(
      ownerId,
      financials.availableBalance,
      'HDFC Bank ****2348'
    );
    toast.success(`Payout of ₹${req.amount.toLocaleString('en-IN')} transferred to your bank account!`);
  };

  const kyc = marketplaceStore.getOwnerKYC(ownerId);

  return (
    <Layout>
      <SEOHead
        title="Bus Operator Partner Dashboard | RentAnyBus"
        description="Manage your bus charter bookings, driver assignments, payout settlements, and vehicle calendar."
        noindex={true}
      />
      <div className="container mx-auto px-4 lg:px-8 py-8 max-w-6xl space-y-8">
        {/* Owner Header Banner */}
        <div className="bg-gradient-to-r from-amber-500/15 via-amber-500/5 to-transparent border border-amber-500/20 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-sm">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <Badge className="bg-amber-600 text-white hover:bg-amber-700">
                Fleet Partner Portal
              </Badge>
              <Badge variant="outline" className="bg-background text-emerald-600 border-emerald-300">
                <ShieldCheck className="w-3 h-3 mr-1" />
                {kyc?.kycStatus === 'verified' ? 'KYC Verified' : 'KYC Pending'}
              </Badge>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
              {ownerName}
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Manage commercial buses, charter rental requests, customer inquiries, and automated earnings settlements.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Button
              variant="outline"
              onClick={() => setIsKYCOpen(true)}
              className="text-xs rounded-xl h-10 border-amber-300 hover:bg-amber-500/10"
            >
              <ShieldCheck className="w-4 h-4 mr-1.5 text-amber-600" />
              Manage KYC & Bank
            </Button>

            <Button
              onClick={() => setIsAddBusOpen(true)}
              className="text-xs rounded-xl h-10 font-bold bg-amber-600 hover:bg-amber-700 text-white shadow-sm"
            >
              <Plus className="w-4 h-4 mr-1.5" />
              Add New Bus
            </Button>
          </div>
        </div>

        {/* Financials & Overview Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="rounded-2xl border bg-card shadow-xs">
            <CardHeader className="pb-2 flex flex-row items-center justify-between">
              <CardTitle className="text-xs font-medium text-muted-foreground">Gross Booking Volume</CardTitle>
              <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-600 flex items-center justify-center">
                <DollarSign className="w-4 h-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">
                ₹{(financials.grossBookings || 0).toLocaleString('en-IN')}
              </div>
              <p className="text-[11px] text-muted-foreground mt-1">
                {financials.bookingsCount || 0} Total charters
              </p>
            </CardContent>
          </Card>

          <Card className="rounded-2xl border bg-card shadow-xs">
            <CardHeader className="pb-2 flex flex-row items-center justify-between">
              <CardTitle className="text-xs font-medium text-muted-foreground">Platform Commission (10%)</CardTitle>
              <div className="w-8 h-8 rounded-lg bg-rose-500/10 text-rose-600 flex items-center justify-center">
                <TrendingUp className="w-4 h-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">
                -₹{(financials.platformCommission || 0).toLocaleString('en-IN')}
              </div>
              <p className="text-[11px] text-muted-foreground mt-1">
                Rent - Commission = Payout
              </p>
            </CardContent>
          </Card>

          <Card className="rounded-2xl border bg-card shadow-xs">
            <CardHeader className="pb-2 flex flex-row items-center justify-between">
              <CardTitle className="text-xs font-medium text-muted-foreground">Net Owner Earnings</CardTitle>
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
                <Wallet className="w-4 h-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-emerald-600">
                ₹{(financials.netEarnings || 0).toLocaleString('en-IN')}
              </div>
              <p className="text-[11px] text-muted-foreground mt-1">
                Settled to your verified bank
              </p>
            </CardContent>
          </Card>

          <Card className="rounded-2xl border bg-card shadow-xs">
            <CardHeader className="pb-2 flex flex-row items-center justify-between">
              <CardTitle className="text-xs font-medium text-muted-foreground">Available Wallet Balance</CardTitle>
              <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-600 flex items-center justify-center">
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-amber-600">
                ₹{(financials.availableBalance || 0).toLocaleString('en-IN')}
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={handleRequestPayout}
                className="mt-2 w-full text-xs h-7 rounded-lg border-amber-300 hover:bg-amber-500/10"
              >
                Withdraw Payout
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Dashboard Tabs: My Buses, Bookings, Wallet */}
        <Tabs defaultValue="buses" className="space-y-6">
          <TabsList className="grid grid-cols-3 max-w-md text-xs">
            <TabsTrigger value="buses">My Fleet ({buses.length})</TabsTrigger>
            <TabsTrigger value="bookings">Bookings ({bookings.length})</TabsTrigger>
            <TabsTrigger value="payouts">Wallet & Payouts</TabsTrigger>
          </TabsList>

          {/* TAB 1: MY BUSES */}
          <TabsContent value="buses" className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-foreground">Registered Buses & Coaches</h3>
                <p className="text-xs text-muted-foreground">
                  Active listings available for customers to view and charter.
                </p>
              </div>
              <Button
                size="sm"
                onClick={() => setIsAddBusOpen(true)}
                className="text-xs rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-semibold"
              >
                <Plus className="w-3.5 h-3.5 mr-1" /> Add Bus
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {buses.map((bus) => (
                <div
                  key={bus.id}
                  className="bg-card border rounded-2xl overflow-hidden shadow-xs hover:border-primary/40 transition-all flex flex-col"
                >
                  {/* 16:9 Image */}
                  <div className="aspect-video relative bg-muted overflow-hidden">
                    <img
                      src={bus.images[0]}
                      alt={bus.name}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                    <div className="absolute top-2.5 left-2.5">
                      <Badge
                        className={
                          bus.status === 'approved'
                            ? 'bg-emerald-600 text-white'
                            : bus.status === 'pending'
                            ? 'bg-amber-500 text-white'
                            : 'bg-rose-600 text-white'
                        }
                      >
                        {bus.status.toUpperCase()}
                      </Badge>
                    </div>
                    <div className="absolute bottom-2.5 right-2.5 bg-background/90 backdrop-blur-xs text-foreground font-bold text-xs px-2.5 py-1 rounded-lg">
                      ₹{bus.pricePerDay.toLocaleString('en-IN')}/day
                    </div>
                  </div>

                  <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                    <div>
                      <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                        <span className="font-mono">{bus.registrationNumber}</span>
                        <span className="flex items-center gap-1 text-amber-500 font-semibold">
                          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                          {bus.rating} ({bus.reviewCount})
                        </span>
                      </div>
                      <h4 className="font-bold text-foreground text-sm line-clamp-1">{bus.name}</h4>
                      <p className="text-xs text-muted-foreground mt-1 flex items-center gap-2">
                        <Badge variant="outline" className="text-[10px]">{bus.layout}</Badge>
                        <span>•</span>
                        <span>{bus.seatingCapacity} Seats</span>
                        <span>•</span>
                        <span>{bus.location}</span>
                      </p>
                    </div>

                    <div className="pt-2 border-t flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">
                        Blocked Dates: {bus.blockedDates.length}
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-xs h-7 text-primary hover:bg-primary/5"
                        onClick={() => (window.location.href = `/vehicles/${bus.id}`)}
                      >
                        Preview Listing
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* TAB 2: BOOKINGS MANAGEMENT */}
          <TabsContent value="bookings" className="space-y-4">
            <div>
              <h3 className="text-lg font-bold text-foreground">Charter Rental Bookings</h3>
              <p className="text-xs text-muted-foreground">
                Accept or reject charter requests, chat with customers, and check advance payment receipts.
              </p>
            </div>

            <div className="space-y-3">
              {bookings.map((b) => (
                <div
                  key={b.id}
                  className="bg-card border rounded-2xl p-5 shadow-xs space-y-3 hover:border-primary/40 transition-all"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b pb-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-foreground text-base">{b.busName}</span>
                        <Badge
                          className={
                            b.bookingStatus === 'Confirmed'
                              ? 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border-emerald-300'
                              : b.bookingStatus === 'Pending'
                              ? 'bg-amber-500/15 text-amber-700 dark:text-amber-400 border-amber-300'
                              : 'bg-muted text-muted-foreground'
                          }
                        >
                          {b.bookingStatus}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        Ref: <strong className="font-mono text-primary">#{b.bookingNumber}</strong> • Booker: {b.customerName} ({b.customerPhone})
                      </p>
                    </div>

                    <div className="text-left sm:text-right">
                      <span className="text-xs text-muted-foreground block">Net Owner Payout</span>
                      <span className="text-base font-bold text-emerald-600">
                        ₹{b.ownerNetEarnings.toLocaleString('en-IN')}
                      </span>
                      <span className="text-[10px] text-muted-foreground block">
                        Gross: ₹{b.totalAmount.toLocaleString('en-IN')} • Comm: ₹{b.platformCommission.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>

                  {/* Route & Dates */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-muted/20 p-3 rounded-xl text-xs border">
                    <div>
                      <span className="text-muted-foreground block">Itinerary</span>
                      <span className="font-semibold text-foreground truncate block">
                        {b.pickupLocation} → {b.dropLocation}
                      </span>
                    </div>
                    <div>
                      <span className="text-muted-foreground block">Dates</span>
                      <span className="font-semibold text-foreground block">
                        {b.startDate} to {b.endDate} ({b.durationDays} Days)
                      </span>
                    </div>
                    <div>
                      <span className="text-muted-foreground block">Advance Received</span>
                      <span className="font-semibold text-emerald-600 block">
                        ₹{b.advanceAmount.toLocaleString('en-IN')} (Token Auth)
                      </span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setChatBooking(b)}
                      className="text-xs h-8 rounded-lg flex items-center gap-1.5"
                    >
                      <MessageCircle className="w-3.5 h-3.5 text-primary" />
                      <span>Chat with {b.customerName}</span>
                    </Button>

                    <div className="flex items-center gap-2">
                      {b.bookingStatus === 'Pending' && (
                        <>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleRejectBooking(b)}
                            className="text-xs h-8 rounded-lg"
                          >
                            Reject
                          </Button>
                          <Button
                            size="sm"
                            onClick={() => handleAcceptBooking(b)}
                            className="text-xs h-8 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold"
                          >
                            Accept Booking
                          </Button>
                        </>
                      )}
                      {b.bookingStatus === 'Confirmed' && (
                        <Badge variant="outline" className="text-xs text-emerald-600 bg-emerald-500/10">
                          Charter Active & Assigned
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* TAB 3: WALLET & PAYOUTS */}
          <TabsContent value="payouts" className="space-y-6">
            <div className="bg-card border rounded-2xl p-6 shadow-xs space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-4">
                <div>
                  <h3 className="text-lg font-bold text-foreground">Settlements & Automated Payouts</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Platform commission (10%) is automatically deducted. Net charter payouts settle into your verified bank account.
                  </p>
                </div>

                <Button
                  onClick={handleRequestPayout}
                  className="rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white"
                >
                  <ArrowUpRight className="w-4 h-4 mr-1.5" />
                  Request Instant Payout
                </Button>
              </div>

              {/* Settlement Account Box */}
              <div className="p-4 bg-muted/30 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div>
                  <span className="text-muted-foreground block">Verified Bank Account:</span>
                  <span className="font-semibold text-foreground text-sm">
                    {kyc?.bankAccountName || 'Kalinga Express Lines Pvt Ltd'}
                  </span>
                  <span className="text-muted-foreground block">
                    {kyc?.bankName || 'HDFC Bank'} • A/C: {kyc?.bankAccountNumber || '••••45612348'} • IFSC: {kyc?.bankIfsc || 'HDFC0000543'}
                  </span>
                </div>
                <Badge className="bg-emerald-500/10 text-emerald-600 border-emerald-300 w-fit">
                  Direct IMPS / NEFT Enabled
                </Badge>
              </div>

              {/* Payout History Table */}
              <div className="space-y-2 pt-2">
                <h4 className="font-semibold text-xs text-muted-foreground uppercase tracking-wider">
                  Recent Payout Transactions
                </h4>
                <div className="border rounded-xl divide-y text-xs">
                  {payouts.map((p) => (
                    <div key={p.id} className="p-3.5 flex items-center justify-between">
                      <div className="space-y-0.5">
                        <span className="font-semibold text-foreground">
                          ₹{p.amount.toLocaleString('en-IN')} Payout to {p.bankAccount}
                        </span>
                        <span className="text-muted-foreground block text-[11px]">
                          {new Date(p.requestedAt).toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' })} at{' '}
                          {new Date(p.requestedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                      <Badge className="bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border-emerald-300">
                        {p.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Add Bus Modal */}
      <AddBusModal
        isOpen={isAddBusOpen}
        onClose={() => setIsAddBusOpen(false)}
        ownerId={ownerId}
        ownerName={ownerName}
      />

      {/* KYC Modal */}
      <OwnerKYCModal
        isOpen={isKYCOpen}
        onClose={() => setIsKYCOpen(false)}
        ownerId={ownerId}
      />

      {/* Chat Modal */}
      {chatBooking && (
        <BookingChatModal
          booking={chatBooking}
          isOpen={!!chatBooking}
          onClose={() => setChatBooking(null)}
          senderRole="owner"
        />
      )}
    </Layout>
  );
}
