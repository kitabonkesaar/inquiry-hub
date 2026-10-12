import React, { useState, useEffect } from 'react';
import { Layout } from '@/components/layout/Layout';
import { marketplaceStore } from '@/services/marketplaceStore';
import { Booking } from '@/types/marketplace';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { BookingChatModal } from '@/components/chat/BookingChatModal';
import { TripReviewModal } from '@/components/reviews/TripReviewModal';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { toast } from 'sonner';
import {
  User,
  Calendar,
  MapPin,
  Clock,
  CheckCircle2,
  AlertCircle,
  FileText,
  MessageCircle,
  Star,
  XCircle,
  Bus,
  Phone,
  Mail,
  Receipt,
  Download,
  CreditCard,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function CustomerProfile() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [activeTab, setActiveTab] = useState<'all' | 'Confirmed' | 'Pending' | 'Completed' | 'Cancelled'>('all');

  // Customer Profile details (editable)
  const [profile, setProfile] = useState({
    name: 'Rahul Mohapatra',
    phone: '+91 98531 22334',
    email: 'rahul.m@example.com',
    city: 'Bhubaneswar, Odisha',
  });

  // Modal states
  const [chatBooking, setChatBooking] = useState<Booking | null>(null);
  const [reviewBooking, setReviewBooking] = useState<Booking | null>(null);
  const [cancelBooking, setCancelBooking] = useState<Booking | null>(null);
  const [cancelReason, setCancelReason] = useState('Change of family travel dates');
  const [selectedVoucher, setSelectedVoucher] = useState<Booking | null>(null);

  useEffect(() => {
    const load = () => {
      setBookings(marketplaceStore.getBookings());
    };
    load();
    const unsub = marketplaceStore.subscribe(load);
    return unsub;
  }, []);

  const handleCancelBooking = () => {
    if (!cancelBooking) return;
    try {
      const { refundAmount } = marketplaceStore.cancelBooking(cancelBooking.id, cancelReason);
      toast.success(`Booking #${cancelBooking.bookingNumber} cancelled. Refund of ₹${refundAmount.toLocaleString('en-IN')} initiated.`);
      setCancelBooking(null);
    } catch (err: any) {
      toast.error(err.message || 'Cancellation failed');
    }
  };

  const filteredBookings = bookings.filter((b) => {
    if (activeTab === 'all') return true;
    return b.bookingStatus === activeTab;
  });

  const getStatusBadge = (status: Booking['bookingStatus']) => {
    switch (status) {
      case 'Confirmed':
        return (
          <Badge className="bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border-emerald-300 dark:border-emerald-800">
            Confirmed & Chartered
          </Badge>
        );
      case 'Pending':
        return (
          <Badge className="bg-amber-500/15 text-amber-700 dark:text-amber-400 border-amber-300 dark:border-amber-800">
            Awaiting Operator Assign
          </Badge>
        );
      case 'Completed':
        return (
          <Badge className="bg-blue-500/15 text-blue-700 dark:text-blue-400 border-blue-300 dark:border-blue-800">
            Trip Completed
          </Badge>
        );
      case 'Cancelled':
        return (
          <Badge className="bg-rose-500/15 text-rose-700 dark:text-rose-400 border-rose-300 dark:border-rose-800">
            Cancelled
          </Badge>
        );
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 lg:px-8 py-8 max-w-5xl space-y-8">
        {/* Customer Header Card */}
        <div className="bg-card border rounded-2xl p-6 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center font-bold text-2xl border border-primary/20">
              RM
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold text-foreground">{profile.name}</h1>
                <Badge variant="outline" className="text-xs bg-emerald-500/10 text-emerald-600 border-emerald-300">
                  Verified Traveler
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground mt-1 flex flex-wrap items-center gap-3">
                <span className="flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5" /> {profile.phone}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5" /> {profile.email}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" /> {profile.city}
                </span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right pr-2">
              <span className="text-xs text-muted-foreground block">Total Bookings</span>
              <span className="text-xl font-bold text-foreground">{bookings.length}</span>
            </div>
            <Separator orientation="vertical" className="h-10" />
            <div className="text-right pl-2">
              <span className="text-xs text-muted-foreground block">Active Trips</span>
              <span className="text-xl font-bold text-primary">
                {bookings.filter((b) => b.bookingStatus === 'Confirmed').length}
              </span>
            </div>
          </div>
        </div>

        {/* Bookings Section */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-foreground">My Rental Bookings</h2>
              <p className="text-xs text-muted-foreground mt-0.5">
                Review your bus itineraries, download trip receipts, and chat with fleet operators.
              </p>
            </div>

            {/* Filter Tabs */}
            <Tabs
              value={activeTab}
              onValueChange={(v: any) => setActiveTab(v)}
              className="w-full sm:w-auto"
            >
              <TabsList className="grid grid-cols-5 w-full sm:w-auto text-xs">
                <TabsTrigger value="all" className="text-xs">All</TabsTrigger>
                <TabsTrigger value="Confirmed" className="text-xs">Confirmed</TabsTrigger>
                <TabsTrigger value="Pending" className="text-xs">Pending</TabsTrigger>
                <TabsTrigger value="Completed" className="text-xs">Completed</TabsTrigger>
                <TabsTrigger value="Cancelled" className="text-xs">Cancelled</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* Bookings List */}
          {filteredBookings.length === 0 ? (
            <div className="bg-card border rounded-2xl p-12 text-center text-muted-foreground space-y-3">
              <Bus className="w-12 h-12 mx-auto stroke-1 opacity-40 text-primary" />
              <h3 className="font-semibold text-foreground text-base">No bookings found in this status</h3>
              <p className="text-xs max-w-sm mx-auto">
                Ready to plan your next interstate family or corporate trip? Choose from our verified fleet of AC sleepers and coaches.
              </p>
              <Button onClick={() => (window.location.href = '/vehicles')} className="mt-2 text-xs">
                Browse Buses for Rent
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredBookings.map((b) => (
                <div
                  key={b.id}
                  className="bg-card border rounded-2xl p-5 shadow-sm hover:border-primary/40 transition-all space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b pb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl overflow-hidden bg-muted border shrink-0">
                        <img
                          src={b.busImage}
                          alt={b.busName}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-foreground text-base">{b.busName}</h3>
                          {getStatusBadge(b.bookingStatus)}
                        </div>
                        <p className="text-xs text-muted-foreground flex items-center gap-2 mt-0.5">
                          <span className="font-mono text-primary font-semibold">Ref: #{b.bookingNumber}</span>
                          <span>•</span>
                          <span>Booked on {new Date(b.createdAt).toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                        </p>
                      </div>
                    </div>

                    <div className="text-left sm:text-right">
                      <span className="text-xs text-muted-foreground block">Advance Paid (Partial)</span>
                      <span className="text-lg font-bold text-emerald-600">
                        ₹{b.advanceAmount.toLocaleString('en-IN')}
                      </span>
                      <span className="text-[11px] text-muted-foreground block">
                        Total Fare: ₹{b.totalAmount.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>

                  {/* Route & Travel Info Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-muted/20 p-3.5 rounded-xl border text-xs">
                    <div className="space-y-1">
                      <span className="text-muted-foreground flex items-center gap-1.5 font-medium">
                        <MapPin className="w-3.5 h-3.5 text-primary" /> Route Itinerary
                      </span>
                      <p className="font-semibold text-foreground truncate">
                        {b.pickupLocation} → {b.dropLocation}
                      </p>
                    </div>

                    <div className="space-y-1">
                      <span className="text-muted-foreground flex items-center gap-1.5 font-medium">
                        <Calendar className="w-3.5 h-3.5 text-primary" /> Trip Dates ({b.durationDays} Days)
                      </span>
                      <p className="font-semibold text-foreground">
                        {b.startDate} to {b.endDate}
                      </p>
                    </div>

                    <div className="space-y-1">
                      <span className="text-muted-foreground flex items-center gap-1.5 font-medium">
                        <CreditCard className="w-3.5 h-3.5 text-primary" /> Payment Method
                      </span>
                      <p className="font-semibold text-foreground">
                        {b.paymentGateway} ({b.paymentMethod}) • {b.paymentStatus.replace('_', ' ').toUpperCase()}
                      </p>
                    </div>
                  </div>

                  {/* Booking Action Buttons */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                    <div className="flex items-center gap-2">
                      {/* Chat with Bus Owner */}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setChatBooking(b)}
                        className="text-xs h-8 rounded-lg flex items-center gap-1.5"
                      >
                        <MessageCircle className="w-3.5 h-3.5 text-primary" />
                        <span>Chat with Operator</span>
                      </Button>

                      {/* View Voucher / Invoice */}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedVoucher(b)}
                        className="text-xs h-8 rounded-lg flex items-center gap-1.5"
                      >
                        <FileText className="w-3.5 h-3.5" />
                        <span>Trip Voucher</span>
                      </Button>
                    </div>

                    <div className="flex items-center gap-2">
                      {/* Rate & Review Trip (Available for Completed Trips) */}
                      {b.bookingStatus === 'Completed' && !b.hasReviewed && (
                        <Button
                          size="sm"
                          onClick={() => setReviewBooking(b)}
                          className="text-xs h-8 rounded-lg bg-amber-500 hover:bg-amber-600 text-white flex items-center gap-1.5"
                        >
                          <Star className="w-3.5 h-3.5 fill-white" />
                          <span>Leave Review & Rating</span>
                        </Button>
                      )}

                      {/* Cancel Booking Button (Available for Confirmed / Pending) */}
                      {(b.bookingStatus === 'Confirmed' || b.bookingStatus === 'Pending') && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setCancelBooking(b)}
                          className="text-xs h-8 rounded-lg text-rose-600 hover:text-rose-700 hover:bg-rose-500/10"
                        >
                          Cancel Booking
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Direct Chat Modal */}
      {chatBooking && (
        <BookingChatModal
          booking={chatBooking}
          isOpen={!!chatBooking}
          onClose={() => setChatBooking(null)}
          senderRole="customer"
        />
      )}

      {/* Review Modal */}
      {reviewBooking && (
        <TripReviewModal
          booking={reviewBooking}
          isOpen={!!reviewBooking}
          onClose={() => setReviewBooking(null)}
        />
      )}

      {/* Cancellation Confirmation Dialog */}
      {cancelBooking && (
        <Dialog open={!!cancelBooking} onOpenChange={() => setCancelBooking(null)}>
          <DialogContent className="sm:max-w-md p-6 rounded-2xl">
            <DialogHeader className="space-y-1">
              <div className="w-12 h-12 rounded-2xl bg-rose-500/10 text-rose-600 flex items-center justify-center mb-1">
                <XCircle className="w-6 h-6" />
              </div>
              <DialogTitle className="text-xl font-bold">Cancel Trip Booking?</DialogTitle>
              <DialogDescription className="text-xs">
                Ref #{cancelBooking.bookingNumber} • {cancelBooking.busName}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-3 pt-2 text-xs">
              <div className="p-3 bg-muted/40 rounded-xl border space-y-1">
                <span className="font-semibold text-foreground">RentAnyBus Refund Policy:</span>
                <p className="text-muted-foreground">
                  • More than 7 days prior: 90% advance refund (₹9,000)<br />
                  • 2 to 7 days prior: 70% advance refund (₹7,000)<br />
                  • Less than 48 hours: 50% advance refund (₹5,000)
                </p>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="cancel_reason" className="text-xs">Reason for Cancellation</Label>
                <Input
                  id="cancel_reason"
                  value={cancelReason}
                  onChange={(e) => setCancelReason(e.target.value)}
                  placeholder="e.g. Itinerary change, flight cancelled..."
                />
              </div>

              <div className="flex items-center gap-3 pt-2">
                <Button
                  variant="outline"
                  onClick={() => setCancelBooking(null)}
                  className="flex-1 rounded-xl h-10 text-xs"
                >
                  Keep Booking
                </Button>
                <Button
                  variant="destructive"
                  onClick={handleCancelBooking}
                  className="flex-1 rounded-xl h-10 text-xs font-semibold"
                >
                  Confirm Cancellation
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Trip Voucher Preview Modal */}
      {selectedVoucher && (
        <Dialog open={!!selectedVoucher} onOpenChange={() => setSelectedVoucher(null)}>
          <DialogContent className="sm:max-w-md p-6 rounded-2xl space-y-4">
            <div className="border-b pb-3 flex items-center justify-between">
              <div>
                <span className="text-xs text-muted-foreground uppercase font-mono">Official Charter Voucher</span>
                <h3 className="font-bold text-foreground text-base">RentAnyBus Private Limited</h3>
              </div>
              <Badge className="bg-emerald-500/10 text-emerald-600 border-emerald-300">
                Authorized
              </Badge>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Booking Number:</span>
                <span className="font-mono font-bold text-primary">{selectedVoucher.bookingNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Reserved Vehicle:</span>
                <span className="font-semibold text-foreground">{selectedVoucher.busName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Customer:</span>
                <span className="text-foreground">{selectedVoucher.customerName} ({selectedVoucher.customerPhone})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Travel Dates:</span>
                <span className="text-foreground">{selectedVoucher.startDate} to {selectedVoucher.endDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Route:</span>
                <span className="text-foreground">{selectedVoucher.pickupLocation} → {selectedVoucher.dropLocation}</span>
              </div>
              <Separator />
              <div className="flex justify-between text-emerald-600 font-semibold">
                <span>Advance Paid:</span>
                <span>₹{selectedVoucher.advanceAmount.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Remaining Balance on Trip:</span>
                <span className="text-foreground font-semibold">₹{selectedVoucher.balanceAmount.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <Button
              onClick={() => {
                toast.success('Voucher PDF downloaded to device');
                setSelectedVoucher(null);
              }}
              className="w-full rounded-xl text-xs flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" /> Download PDF Tax Invoice
            </Button>
          </DialogContent>
        </Dialog>
      )}
    </Layout>
  );
}
