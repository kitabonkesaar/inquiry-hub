import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MarketplaceBus, Booking } from '@/types/marketplace';
import { marketplaceStore } from '@/services/marketplaceStore';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import {
  Calendar,
  MapPin,
  Users,
  CreditCard,
  QrCode,
  Building2,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Bus,
  Sparkles,
  ArrowRight,
  Lock,
} from 'lucide-react';

interface BookingModalProps {
  bus: MarketplaceBus;
  isOpen: boolean;
  onClose: () => void;
  prefill?: {
    startDate?: string;
    endDate?: string;
    pickupLocation?: string;
    dropLocation?: string;
    passengers?: number;
  };
}

export function BookingModal({ bus, isOpen, onClose, prefill }: BookingModalProps) {
  const navigate = useNavigate();
  const settings = marketplaceStore.getSettings();

  // Step state: 1 = Trip Details, 2 = Payment Gateway Checkout, 3 = Confirmed Success
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState<Booking | null>(null);

  // Form inputs
  const [pickupLocation, setPickupLocation] = useState(prefill?.pickupLocation || 'Bhubaneswar, Odisha');
  const [dropLocation, setDropLocation] = useState(prefill?.dropLocation || 'Puri Jagannath Temple & Beach');
  
  // Default dates (3 days starting 3 days from now)
  const defaultStart = new Date(Date.now() + 3 * 24 * 3600 * 1000).toISOString().split('T')[0];
  const defaultEnd = new Date(Date.now() + 6 * 24 * 3600 * 1000).toISOString().split('T')[0];
  
  const [startDate, setStartDate] = useState(prefill?.startDate || defaultStart);
  const [endDate, setEndDate] = useState(prefill?.endDate || defaultEnd);
  const [passengers, setPassengers] = useState(prefill?.passengers || Math.min(bus.seatingCapacity, 25));

  // Customer Contact Info
  const [customerName, setCustomerName] = useState('Rahul Mohapatra');
  const [customerPhone, setCustomerPhone] = useState('+91 98531 22334');
  const [customerEmail, setCustomerEmail] = useState('rahul.m@example.com');

  // Payment method
  const [paymentGateway, setPaymentGateway] = useState<'Razorpay' | 'Stripe'>('Razorpay');
  const [paymentMethod, setPaymentMethod] = useState<'UPI' | 'Card' | 'NetBanking'>('UPI');
  const [upiId, setUpiId] = useState('rahul@okaxis');
  const [cardNumber, setCardNumber] = useState('4532 •••• •••• 9812');
  const [cardExpiry, setCardExpiry] = useState('08/29');
  const [cardCvv, setCardCvv] = useState('781');

  // Calculate duration
  const startObj = new Date(startDate);
  const endObj = new Date(endDate);
  const durationDays = Math.max(1, Math.ceil((endObj.getTime() - startObj.getTime()) / (1000 * 3600 * 24)) + 1);

  // Validation: 2 to 20 days
  const isDurationValid = durationDays >= settings.minTripDays && durationDays <= settings.maxTripDays;

  // Pricing
  const totalAmount = bus.pricePerDay * durationDays;
  const upfrontToken = Math.min(settings.upfrontTokenAmount, totalAmount);
  const balanceOnAgreement = Math.max(0, totalAmount - upfrontToken);

  const handleProceedToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isDurationValid) {
      toast.error(`Rental bookings must be between ${settings.minTripDays} and ${settings.maxTripDays} days.`);
      return;
    }
    if (!pickupLocation.trim() || !dropLocation.trim() || !customerName.trim() || !customerPhone.trim()) {
      toast.error('Please fill in all mandatory booking fields.');
      return;
    }
    setStep(2);
  };

  const handleExecutePayment = async () => {
    setIsProcessing(true);

    try {
      // Simulate real gateway processing delay
      await new Promise((res) => setTimeout(res, 1200));

      const booking = marketplaceStore.createBooking({
        busId: bus.id,
        customerName,
        customerPhone,
        customerEmail,
        pickupLocation,
        dropLocation,
        startDate,
        endDate,
        durationDays,
        passengers,
        paymentGateway,
        paymentMethod,
      });

      setConfirmedBooking(booking);
      setStep(3);
      toast.success('Payment authorized! Booking confirmed successfully.');
    } catch (err: any) {
      toast.error(err.message || 'Payment processing failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleResetAndClose = () => {
    setStep(1);
    setConfirmedBooking(null);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleResetAndClose}>
      <DialogContent className="sm:max-w-xl max-h-[90vh] overflow-y-auto p-0 rounded-2xl">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent p-6 border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/20 text-primary flex items-center justify-center">
                <Bus className="w-5 h-5" />
              </div>
              <div>
                <DialogTitle className="text-xl font-bold text-foreground">
                  {step === 3 ? 'Booking Confirmed!' : `Rent ${bus.name}`}
                </DialogTitle>
                <DialogDescription className="text-xs text-muted-foreground mt-0.5">
                  {step === 1 && 'Step 1: Configure trip itinerary and passenger details'}
                  {step === 2 && 'Step 2: Pay ₹10,000 token advance via secure gateway'}
                  {step === 3 && `Reference #${confirmedBooking?.bookingNumber}`}
                </DialogDescription>
              </div>
            </div>

            <Badge variant="outline" className="bg-card text-xs">
              {bus.layout}
            </Badge>
          </div>
        </div>

        {/* STEP 1: TRIP DETAILS FORM */}
        {step === 1 && (
          <form onSubmit={handleProceedToPayment} className="p-6 space-y-5">
            {/* Itinerary Dates */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="start_date" className="text-xs flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-primary" /> Start Date
                </Label>
                <Input
                  id="start_date"
                  type="date"
                  value={startDate}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(e) => setStartDate(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="end_date" className="text-xs flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-primary" /> End Date
                </Label>
                <Input
                  id="end_date"
                  type="date"
                  value={endDate}
                  min={startDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Duration Notice & Validation */}
            <div
              className={`p-3 rounded-xl border text-xs flex items-center justify-between ${
                isDurationValid
                  ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-700 dark:text-emerald-300'
                  : 'bg-rose-500/10 border-rose-500/20 text-rose-700 dark:text-rose-300'
              }`}
            >
              <div className="flex items-center gap-2">
                {isDurationValid ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-rose-500" />
                )}
                <span>
                  Trip Duration: <strong>{durationDays} Days</strong> (Allowed: {settings.minTripDays}–{settings.maxTripDays} Days)
                </span>
              </div>
              <span className="font-semibold text-foreground">
                ₹{bus.pricePerDay.toLocaleString('en-IN')}/day
              </span>
            </div>

            {/* Pickup & Drop Location */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="pickup" className="text-xs flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-primary" /> Pickup Location
                </Label>
                <Input
                  id="pickup"
                  placeholder="e.g. Master Canteen, Bhubaneswar"
                  value={pickupLocation}
                  onChange={(e) => setPickupLocation(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="drop" className="text-xs flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-primary" /> Destination / Drop Location
                </Label>
                <Input
                  id="drop"
                  placeholder="e.g. Puri, Konark, or Varanasi"
                  value={dropLocation}
                  onChange={(e) => setDropLocation(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Passengers count */}
            <div className="space-y-1.5">
              <Label htmlFor="passengers" className="text-xs flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-primary" /> Number of Passengers (Max {bus.seatingCapacity})
              </Label>
              <Input
                id="passengers"
                type="number"
                min={1}
                max={bus.seatingCapacity}
                value={passengers}
                onChange={(e) => setPassengers(Number(e.target.value))}
                required
              />
            </div>

            {/* Customer Details */}
            <Separator />
            <div className="space-y-3">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Contact & Booker Details
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="space-y-1">
                  <Label htmlFor="c_name" className="text-xs">Full Name</Label>
                  <Input
                    id="c_name"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="c_phone" className="text-xs">Phone (WhatsApp)</Label>
                  <Input
                    id="c_phone"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="c_email" className="text-xs">Email</Label>
                  <Input
                    id="c_email"
                    type="email"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Fare Breakdown Box */}
            <div className="bg-muted/40 rounded-xl p-4 border space-y-2 text-xs">
              <div className="flex justify-between text-muted-foreground">
                <span>Daily Charter Fare ({durationDays} days × ₹{bus.pricePerDay.toLocaleString('en-IN')})</span>
                <span className="font-medium text-foreground">₹{totalAmount.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Certified Driver & Fuel Allowance</span>
                <span className="text-emerald-600 font-medium">Included</span>
              </div>
              <Separator />
              <div className="flex justify-between items-center text-sm font-bold text-foreground">
                <span>Total Estimated Trip Fare</span>
                <span>₹{totalAmount.toLocaleString('en-IN')}</span>
              </div>

              {/* Partial Payment Highlight */}
              <div className="mt-3 p-3 bg-amber-500/10 border border-amber-500/30 rounded-lg space-y-1">
                <div className="flex justify-between items-center font-semibold text-amber-800 dark:text-amber-300">
                  <span>Upfront Advance Due Now (Partial Payment)</span>
                  <span className="text-base font-bold">₹{upfrontToken.toLocaleString('en-IN')}</span>
                </div>
                <p className="text-[11px] text-amber-700/80 dark:text-amber-400">
                  Pay only ₹10,000 today to confirm your bus reservation. Remaining balance (₹{balanceOnAgreement.toLocaleString('en-IN')}) is payable on trip commencement as per agreement.
                </p>
              </div>
            </div>

            <Button
              type="submit"
              disabled={!isDurationValid}
              className="w-full h-11 text-sm font-semibold rounded-xl"
            >
              Continue to Payment (Pay ₹{upfrontToken.toLocaleString('en-IN')} Advance)
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </form>
        )}

        {/* STEP 2: PAYMENT GATEWAY CHECKOUT MODAL */}
        {step === 2 && (
          <div className="p-6 space-y-5">
            {/* Summary Banner */}
            <div className="flex items-center justify-between bg-primary/10 border border-primary/20 rounded-xl p-3.5 text-xs">
              <div>
                <span className="text-muted-foreground block">Advance Token Due</span>
                <span className="text-xl font-bold text-primary">₹{upfrontToken.toLocaleString('en-IN')}</span>
              </div>
              <div className="text-right">
                <span className="text-muted-foreground block">{durationDays} Days Charter</span>
                <span className="font-semibold text-foreground">{bus.name}</span>
              </div>
            </div>

            {/* Gateway Selector */}
            <div className="flex items-center justify-between border rounded-xl p-2 bg-muted/30">
              <span className="text-xs font-medium text-muted-foreground ml-2">Choose Gateway:</span>
              <div className="flex gap-2">
                <Button
                  type="button"
                  size="sm"
                  variant={paymentGateway === 'Razorpay' ? 'default' : 'outline'}
                  onClick={() => setPaymentGateway('Razorpay')}
                  className="h-8 text-xs font-semibold"
                >
                  Razorpay India (Recommended)
                </Button>
                <Button
                  type="button"
                  size="sm"
                  variant={paymentGateway === 'Stripe' ? 'default' : 'outline'}
                  onClick={() => setPaymentGateway('Stripe')}
                  className="h-8 text-xs"
                >
                  Stripe Global
                </Button>
              </div>
            </div>

            {/* Payment Method Tabs */}
            <Tabs value={paymentMethod} onValueChange={(v: any) => setPaymentMethod(v)} className="w-full">
              <TabsList className="grid grid-cols-3 w-full">
                <TabsTrigger value="UPI" className="text-xs flex items-center gap-1.5">
                  <QrCode className="w-3.5 h-3.5" /> Instant UPI
                </TabsTrigger>
                <TabsTrigger value="Card" className="text-xs flex items-center gap-1.5">
                  <CreditCard className="w-3.5 h-3.5" /> Cards
                </TabsTrigger>
                <TabsTrigger value="NetBanking" className="text-xs flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5" /> NetBanking
                </TabsTrigger>
              </TabsList>

              {/* UPI Tab */}
              <TabsContent value="UPI" className="space-y-4 pt-3">
                <div className="border rounded-xl p-4 bg-card text-center space-y-3">
                  <div className="inline-block p-2 bg-white rounded-lg border shadow-xs">
                    <img
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=140x140&data=upi://pay?pa=rentanybus@hdfcbank&pn=RentAnyBus&am=${upfrontToken}&cu=INR`}
                      alt="UPI QR Code"
                      className="w-28 h-28 mx-auto"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Scan via Google Pay, PhonePe, Paytm, or BHIM to pay ₹{upfrontToken.toLocaleString('en-IN')}
                  </p>
                  <Separator />
                  <div className="text-left space-y-1.5">
                    <Label htmlFor="upi_id" className="text-xs">Or Enter Virtual Payment Address (VPA)</Label>
                    <Input
                      id="upi_id"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      placeholder="mobile@upi or username@okaxis"
                    />
                  </div>
                </div>
              </TabsContent>

              {/* Card Tab */}
              <TabsContent value="Card" className="space-y-3 pt-3">
                <div className="border rounded-xl p-4 bg-card space-y-3">
                  <div className="space-y-1">
                    <Label htmlFor="card_no" className="text-xs">Card Number</Label>
                    <Input
                      id="card_no"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <Label htmlFor="exp" className="text-xs">Expiry Date (MM/YY)</Label>
                      <Input
                        id="exp"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                      />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="cvv" className="text-xs">CVV</Label>
                      <Input
                        id="cvv"
                        type="password"
                        maxLength={4}
                        value={cardCvv}
                        onChange={(e) => setCardCvv(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* NetBanking Tab */}
              <TabsContent value="NetBanking" className="pt-3">
                <div className="border rounded-xl p-4 bg-card space-y-2 text-xs">
                  <p className="text-muted-foreground">Select your bank for instant direct debit:</p>
                  <div className="grid grid-cols-2 gap-2 pt-1">
                    {['HDFC Bank', 'State Bank of India', 'ICICI Bank', 'Axis Bank', 'Kotak Mahindra', 'Punjab National Bank'].map((b) => (
                      <button
                        key={b}
                        type="button"
                        className="p-2.5 rounded-lg border text-left hover:border-primary hover:bg-primary/5 transition-all font-medium"
                      >
                        {b}
                      </button>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            {/* Security Notice */}
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Lock className="w-3.5 h-3.5 text-emerald-500" />
              <span>256-Bit SSL Bank Grade Encryption. Authorized via {paymentGateway}.</span>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => setStep(1)}
                className="flex-1 h-11 rounded-xl"
              >
                Back to Details
              </Button>
              <Button
                type="button"
                disabled={isProcessing}
                onClick={handleExecutePayment}
                className="flex-1 h-11 rounded-xl font-bold bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                {isProcessing ? 'Authorizing Payment...' : `Pay ₹${upfrontToken.toLocaleString('en-IN')} & Confirm`}
              </Button>
            </div>
          </div>
        )}

        {/* STEP 3: BOOKING CONFIRMED SUCCESS */}
        {step === 3 && confirmedBooking && (
          <div className="p-6 text-center space-y-5">
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-500/30">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <h3 className="text-2xl font-bold text-foreground">Booking Confirmed!</h3>
              <p className="text-xs text-muted-foreground mt-1 max-w-sm mx-auto">
                Your ₹10,000 partial advance payment has been successfully recorded. SMS and WhatsApp confirmations have been dispatched.
              </p>
            </div>

            {/* Receipt Summary Card */}
            <div className="bg-muted/40 border rounded-2xl p-4 text-left space-y-3 text-xs">
              <div className="flex justify-between items-center border-b pb-2">
                <span className="text-muted-foreground">Booking Reference:</span>
                <span className="font-mono font-bold text-primary text-sm">
                  {confirmedBooking.bookingNumber}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Transaction ID:</span>
                <span className="font-mono text-foreground">{confirmedBooking.transactionId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Reserved Vehicle:</span>
                <span className="font-semibold text-foreground">{confirmedBooking.busName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Trip Duration:</span>
                <span className="text-foreground">
                  {confirmedBooking.startDate} to {confirmedBooking.endDate} ({confirmedBooking.durationDays} Days)
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Pickup & Drop:</span>
                <span className="text-foreground font-medium truncate max-w-[240px]">
                  {confirmedBooking.pickupLocation} → {confirmedBooking.dropLocation}
                </span>
              </div>
              <Separator />
              <div className="flex justify-between items-center">
                <span className="font-semibold text-foreground">Advance Paid Today:</span>
                <span className="text-emerald-600 font-bold text-sm">
                  ₹{confirmedBooking.advanceAmount.toLocaleString('en-IN')}
                </span>
              </div>
              <div className="flex justify-between items-center text-muted-foreground">
                <span>Remaining Balance on Trip:</span>
                <span className="font-medium text-foreground">
                  ₹{confirmedBooking.balanceAmount.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <Button
                variant="outline"
                className="h-11 rounded-xl"
                onClick={() => {
                  handleResetAndClose();
                  navigate('/profile');
                }}
              >
                View in My Bookings
              </Button>
              <Button
                className="h-11 rounded-xl font-semibold"
                onClick={() => {
                  handleResetAndClose();
                  navigate('/vehicles');
                }}
              >
                Browse More Buses
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
