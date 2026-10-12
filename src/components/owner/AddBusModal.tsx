import React, { useState } from 'react';
import { marketplaceStore } from '@/services/marketplaceStore';
import { BusLayout, BusType, BusCategory, MarketplaceBus } from '@/types/marketplace';
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
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';
import { Bus, Upload, Plus, CheckCircle2, ShieldCheck } from 'lucide-react';
import heroBus from '@/assets/hero-bus.jpg';
import bus1 from '@/assets/bus-1.jpg';
import bus2 from '@/assets/bus-2.jpg';
import traveller1 from '@/assets/traveller-1.jpg';

interface AddBusModalProps {
  isOpen: boolean;
  onClose: () => void;
  ownerId?: string;
  ownerName?: string;
}

const ALL_AMENITIES = [
  'Central Air Conditioning',
  'Push-Back Reclining Seats',
  'Individual Reading Lights',
  'USB Fast Charging Ports',
  'High-Speed Wi-Fi',
  'LED Entertainment TV',
  'Fresh Blankets & Pillows',
  'GPS Live Tracking',
  'First Aid Kit',
  'Onboard Washroom',
  'Water Bottles & Refreshments',
  'Dedicated Luggage Bay',
];

export function AddBusModal({
  isOpen,
  onClose,
  ownerId = 'owner-1',
  ownerName = 'Kalinga Express Lines',
}: AddBusModalProps) {
  const [name, setName] = useState('');
  const [type, setType] = useState<BusType>('bus');
  const [category, setCategory] = useState<BusCategory>('ac');
  const [layout, setLayout] = useState<BusLayout>('2x2 Sleeper');
  const [seatingCapacity, setSeatingCapacity] = useState<number>(40);
  const [registrationNumber, setRegistrationNumber] = useState('');
  const [location, setLocation] = useState('Bhubaneswar, Odisha');
  const [pricePerDay, setPricePerDay] = useState<number>(18000);
  const [pricePerKm, setPricePerKm] = useState<number>(45);
  const [driverAllowance, setDriverAllowance] = useState<number>(600);
  const [description, setDescription] = useState('');
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([
    'Central Air Conditioning',
    'Push-Back Reclining Seats',
    'USB Fast Charging Ports',
    'GPS Live Tracking',
  ]);
  const [selectedImage, setSelectedImage] = useState<string>(heroBus);

  const toggleAmenity = (amenity: string) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity) ? prev.filter((a) => a !== amenity) : [...prev, amenity]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !registrationNumber.trim() || pricePerDay <= 0) {
      toast.error('Please complete all required fields.');
      return;
    }

    try {
      marketplaceStore.addBus({
        name: name.trim(),
        type,
        category,
        layout,
        seatingCapacity: Number(seatingCapacity),
        pricePerDay: Number(pricePerDay),
        pricePerKm: Number(pricePerKm),
        minKmPerDay: 250,
        driverAllowancePerDay: Number(driverAllowance),
        images: [selectedImage, bus1, bus2],
        amenities: selectedAmenities,
        description: description.trim() || `${name} premium commercial passenger vehicle with ${layout} seating.`,
        ownerId,
        ownerName,
        ownerPhone: '+91 94370 12345',
        registrationNumber: registrationNumber.trim().toUpperCase(),
        location: location.trim(),
        blockedDates: [],
      });

      toast.success('Bus listing submitted successfully! Sent to Admin review queue.');
      onClose();
    } catch (err: any) {
      toast.error(err.message || 'Failed to submit vehicle listing');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto p-0 rounded-2xl">
        <div className="bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent p-6 border-b">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-600 flex items-center justify-center">
              <Bus className="w-5 h-5" />
            </div>
            <div>
              <DialogTitle className="text-xl font-bold">List a New Bus for Rent</DialogTitle>
              <DialogDescription className="text-xs">
                Add vehicle specifications, layouts, daily rates, and photos to start receiving charter bookings.
              </DialogDescription>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5 text-xs">
          {/* Section: Basic Vehicle Identification */}
          <div className="space-y-3">
            <h4 className="font-semibold text-foreground uppercase tracking-wider text-[11px] text-muted-foreground">
              Vehicle Identity & Specification
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label htmlFor="bus_name">Bus Name / Model</Label>
                <Input
                  id="bus_name"
                  placeholder="e.g. Volvo 9600 Multi-Axle AC Sleeper"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-1">
                <Label htmlFor="reg_no">Registration Number (Number Plate)</Label>
                <Input
                  id="reg_no"
                  placeholder="e.g. OD-02-AK-9988"
                  value={registrationNumber}
                  onChange={(e) => setRegistrationNumber(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="space-y-1">
                <Label>Vehicle Category</Label>
                <Select value={type} onValueChange={(v: any) => setType(v)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bus">Full Size Commercial Bus</SelectItem>
                    <SelectItem value="traveller">Tempo Traveller</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1">
                <Label>Cabin Layout</Label>
                <Select value={layout} onValueChange={(v: any) => setLayout(v)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2x2 Sleeper">2x2 Sleeper (Upper/Lower)</SelectItem>
                    <SelectItem value="2x1 Sleeper">2x1 Luxury Sleeper</SelectItem>
                    <SelectItem value="3x2 Seater">3x2 Seater Deluxe</SelectItem>
                    <SelectItem value="2x2 Seater">2x2 Executive Coach</SelectItem>
                    <SelectItem value="Luxury Maharaja">Luxury Maharaja Lounge</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1">
                <Label htmlFor="cap">Seating / Berth Capacity</Label>
                <Input
                  id="cap"
                  type="number"
                  min={10}
                  max={60}
                  value={seatingCapacity}
                  onChange={(e) => setSeatingCapacity(Number(e.target.value))}
                  required
                />
              </div>
            </div>
          </div>

          {/* Section: Pricing & Base Depot */}
          <div className="space-y-3 pt-2 border-t">
            <h4 className="font-semibold text-foreground uppercase tracking-wider text-[11px] text-muted-foreground">
              Rental Pricing & Operating Location
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="space-y-1">
                <Label htmlFor="daily_rate">Daily Rent Rate (₹/day)</Label>
                <Input
                  id="daily_rate"
                  type="number"
                  min={2000}
                  value={pricePerDay}
                  onChange={(e) => setPricePerDay(Number(e.target.value))}
                  required
                />
              </div>

              <div className="space-y-1">
                <Label htmlFor="km_rate">Extra Rate per KM (₹/km)</Label>
                <Input
                  id="km_rate"
                  type="number"
                  value={pricePerKm}
                  onChange={(e) => setPricePerKm(Number(e.target.value))}
                />
              </div>

              <div className="space-y-1">
                <Label htmlFor="city">Base Garage / City</Label>
                <Input
                  id="city"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  required
                />
              </div>
            </div>
          </div>

          {/* Section: 16:9 Aspect Ratio Photos */}
          <div className="space-y-3 pt-2 border-t">
            <h4 className="font-semibold text-foreground uppercase tracking-wider text-[11px] text-muted-foreground">
              16:9 Showcase Imagery
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { label: 'Volvo Sleeper Hero', src: heroBus },
                { label: 'Coach Front View', src: bus1 },
                { label: 'Executive Side Profile', src: bus2 },
                { label: 'Luxury Cruiser', src: traveller1 },
              ].map((img, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setSelectedImage(img.src)}
                  className={`aspect-video rounded-xl overflow-hidden border-2 transition-all relative ${
                    selectedImage === img.src
                      ? 'border-primary ring-2 ring-primary/30'
                      : 'border-border opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img.src} alt={img.label} className="w-full h-full object-cover" />
                  {selectedImage === img.src && (
                    <span className="absolute top-1 right-1 bg-primary text-white p-0.5 rounded-full">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Section: Amenities Checklist */}
          <div className="space-y-3 pt-2 border-t">
            <h4 className="font-semibold text-foreground uppercase tracking-wider text-[11px] text-muted-foreground">
              Onboard Amenities & Features
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {ALL_AMENITIES.map((amenity) => (
                <label
                  key={amenity}
                  className="flex items-center gap-2.5 p-2 rounded-lg border bg-muted/20 hover:bg-muted/40 cursor-pointer"
                >
                  <Checkbox
                    checked={selectedAmenities.includes(amenity)}
                    onCheckedChange={() => toggleAmenity(amenity)}
                  />
                  <span>{amenity}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Vehicle Description */}
          <div className="space-y-1.5 pt-2 border-t">
            <Label htmlFor="desc">Vehicle Highlights & Overview</Label>
            <Textarea
              id="desc"
              placeholder="Highlight suspension quality, legroom, recent maintenance, sound system, luggage capacity..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="min-h-[80px]"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 pt-2">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1 h-11 rounded-xl">
              Cancel
            </Button>
            <Button type="submit" className="flex-1 h-11 rounded-xl font-semibold bg-amber-600 hover:bg-amber-700 text-white">
              Submit Bus Listing for Approval
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
