import { useState } from 'react';
import { Bus, CheckCircle2, ShieldCheck, Banknote, Users, Sparkles, TrendingUp, Building2, Phone, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

export function ListYourBusSection() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [selectedFleetTypes, setSelectedFleetTypes] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    city: '',
    vehicleDetails: '',
  });

  const fleetTypeOptions = [
    'Volvo / Multi-Axle',
    'AC Sleeper Coach',
    'Push-Back Deluxe',
    'Tempo Traveller',
    'Mini Bus 25-32'
  ];

  const toggleFleetType = (type: string) => {
    setSelectedFleetTypes((prev) => {
      const next = prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type];
      const detailsSuffix = next.length > 0 ? `Types: ${next.join(', ')}` : '';
      setFormData((f) => ({
        ...f,
        vehicleDetails: f.vehicleDetails.includes('Types:')
          ? f.vehicleDetails.replace(/Types:.*$/, detailsSuffix).trim()
          : (f.vehicleDetails ? `${f.vehicleDetails} | ${detailsSuffix}` : detailsSuffix).trim()
      }));
      return next;
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const compiledDetails = [
        selectedFleetTypes.length > 0 ? `Selected Fleet: ${selectedFleetTypes.join(', ')}` : '',
        formData.vehicleDetails
      ].filter(Boolean).join('\n');

      const { error } = await supabase
        .from('bus_owner_leads')
        .insert({
          full_name: formData.name,
          mobile: formData.mobile,
          city: formData.city,
          vehicle_details: compiledDetails || 'Bus Owner Inquiry',
          status: 'new'
        });

      if (error) throw error;

      setSubmitted(true);
      toast({
        title: 'Fleet Registered Successfully!',
        description: 'Our operator manager will contact you within 2 business hours.',
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: 'Error',
        description: 'Failed to submit fleet details. Please check connection and try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <section className="py-20 bg-[#0B1E33] text-white">
        <div className="container mx-auto px-4 text-center max-w-xl">
          <div className="w-20 h-20 bg-accent/20 border-2 border-accent rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl shadow-accent/20">
            <CheckCircle2 className="w-10 h-10 text-accent" />
          </div>
          <span className="text-xs font-bold uppercase tracking-widest text-accent mb-2 block">
            Registration Received
          </span>
          <h2 className="text-3xl font-extrabold mb-4">Welcome to RentAnyBus Operator Network!</h2>
          <p className="text-slate-300 leading-relaxed mb-8">
            We have received your fleet information. Our dedicated Bus Owner Relationship Manager will call you within 2 hours to verify vehicle permits and initiate your first corporate bookings.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10"
              onClick={() => {
                setSubmitted(false);
                setSelectedFleetTypes([]);
                setFormData({ name: '', mobile: '', city: '', vehicleDetails: '' });
              }}
            >
              Register Another Bus or Fleet
            </Button>
            <a href="/owner">
              <Button variant="accent" className="font-bold">
                Go to Bus Owner Dashboard →
              </Button>
            </a>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="list-your-bus" className="py-24 bg-[#081829] text-white relative overflow-hidden border-t border-white/10">
      {/* Background radial glows & texture */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-accent/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-[450px] h-[450px] bg-primary/40 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 xl:gap-16 items-center">
          
          {/* Left Column - Targeted Bus Owner Value Proposition */}
          <div className="lg:col-span-7 space-y-7">
            {/* High-visibility Bus Owner Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-accent text-[#081829] font-black text-xs uppercase tracking-wider shadow-md shadow-accent/20">
              <Bus className="w-4 h-4 text-[#081829]" />
              <span>For Bus Owners & Fleet Operators</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight tracking-tight">
              Own Buses or Tempo Travellers?{' '}
              <span className="text-accent underline decoration-accent/40 decoration-wavy decoration-2">
                Monetize Idle Days
              </span>{' '}
              & Maximize Daily Earnings
            </h2>

            <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
              Stop letting your commercial vehicles sit idle at depots. Partner with RentAnyBus to receive guaranteed charter trips from top corporate companies, educational institutes, wedding events, and pilgrim tours across Odisha.
            </p>

            {/* Operator Benefits Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-white/[0.05] border border-white/10 backdrop-blur-sm space-y-1.5">
                <div className="flex items-center gap-2 text-accent font-bold text-sm">
                  <Banknote className="w-4 h-4" />
                  <span>Guaranteed Trip Advances</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Receive fuel & driver advances before every trip. Settle remaining payments on agreement completion.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.05] border border-white/10 backdrop-blur-sm space-y-1.5">
                <div className="flex items-center gap-2 text-accent font-bold text-sm">
                  <ShieldCheck className="w-4 h-4" />
                  <span>100% Zero Listing Fees</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  No registration charges, no hidden commissions. You keep your agreed charter rate per kilometer or day.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.05] border border-white/10 backdrop-blur-sm space-y-1.5">
                <div className="flex items-center gap-2 text-accent font-bold text-sm">
                  <Users className="w-4 h-4" />
                  <span>Corporate & Wedding Bookings</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Verified high-ticket charters from schools, IT hubs, and multi-day outstation pilgrimages across Odisha.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.05] border border-white/10 backdrop-blur-sm space-y-1.5">
                <div className="flex items-center gap-2 text-accent font-bold text-sm">
                  <TrendingUp className="w-4 h-4" />
                  <span>Your Bus, Your Drivers</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  You maintain full control of your vehicles and staff. We simply connect you with paying clients.
                </p>
              </div>
            </div>

            {/* Operator Network Proof Stats */}
            <div className="pt-4 border-t border-white/10 flex flex-wrap items-center gap-6 sm:gap-10 text-slate-300">
              <div>
                <span className="text-2xl font-black text-white block">150+</span>
                <span className="text-xs text-slate-400">Verified Fleet Partners</span>
              </div>
              <div className="w-px h-8 bg-white/15" />
              <div>
                <span className="text-2xl font-black text-accent block">₹3.5 Cr+</span>
                <span className="text-xs text-slate-400">Paid to Bus Operators</span>
              </div>
              <div className="w-px h-8 bg-white/15" />
              <div>
                <span className="text-2xl font-black text-white block">24/7</span>
                <span className="text-xs text-slate-400">Operator Dispatch Desk</span>
              </div>
            </div>
          </div>

          {/* Right Column - Dedicated Bus Operator Onboarding Form */}
          <div className="lg:col-span-5">
            <div className="bg-card text-foreground rounded-2xl p-6 sm:p-8 shadow-2xl border border-border/80 relative">
              {/* Form Title Banner */}
              <div className="flex items-start justify-between gap-3 mb-6 pb-4 border-b">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2 py-0.5 rounded bg-accent/20 text-accent font-bold text-[10px] uppercase tracking-wider">
                      Operator Portal
                    </span>
                    <span className="text-xs text-muted-foreground font-medium">• Instant Onboarding</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black tracking-tight text-foreground">
                    Register Your Bus / Fleet
                  </h3>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Start receiving verified charter inquiries in your city.
                  </p>
                </div>
                <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  <Bus className="w-6 h-6" />
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div className="space-y-1.5">
                    <Label htmlFor="owner-name" className="text-xs font-bold text-foreground/90">
                      Owner / Agency Name *
                    </Label>
                    <Input 
                      id="owner-name" 
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g., Rajesh Transport" 
                      required 
                      className="h-10 text-xs"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="owner-mobile" className="text-xs font-bold text-foreground/90">
                      WhatsApp Mobile Number *
                    </Label>
                    <Input 
                      id="owner-mobile" 
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleChange}
                      type="tel" 
                      placeholder="10-digit mobile number" 
                      required 
                      className="h-10 text-xs"
                    />
                  </div>
                </div>
                
                <div className="space-y-1.5">
                  <Label htmlFor="owner-city" className="text-xs font-bold text-foreground/90">
                    Depot / Base City in Odisha *
                  </Label>
                  <Input 
                    id="owner-city" 
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="e.g., Bhubaneswar, Cuttack, Puri, Berhampur, Rourkela" 
                    required 
                    className="h-10 text-xs"
                  />
                </div>

                {/* Fleet Category Quick Select Chips */}
                <div className="space-y-2 pt-1">
                  <Label className="text-xs font-bold text-foreground/90 block">
                    What vehicles do you own? (Tap to select)
                  </Label>
                  <div className="flex flex-wrap gap-1.5">
                    {fleetTypeOptions.map((type) => {
                      const isSelected = selectedFleetTypes.includes(type);
                      return (
                        <button
                          key={type}
                          type="button"
                          onClick={() => toggleFleetType(type)}
                          className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all border ${
                            isSelected
                              ? 'bg-primary text-primary-foreground border-primary shadow-xs'
                              : 'bg-muted/60 text-muted-foreground border-border hover:bg-muted hover:text-foreground'
                          }`}
                        >
                          {isSelected ? '✓ ' : '+ '}
                          {type}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="vehicle-details" className="text-xs font-bold text-foreground/90">
                    Fleet Count & Vehicle Details
                  </Label>
                  <Textarea 
                    id="vehicle-details" 
                    name="vehicleDetails"
                    value={formData.vehicleDetails}
                    onChange={handleChange}
                    placeholder="e.g., 2× 45-Seater AC Coach (2023 model), 1× Force Urbania 17-Seater..." 
                    className="resize-none text-xs"
                    rows={2}
                  />
                </div>

                <Button 
                  type="submit" 
                  variant="accent" 
                  className="w-full h-12 font-extrabold text-sm shadow-md hover:shadow-lg transition-all" 
                  disabled={loading}
                >
                  {loading ? 'Submitting...' : '🚍 Register Fleet & Start Receiving Bookings'}
                </Button>

                <div className="pt-2 text-center border-t border-border/50">
                  <a 
                    href="/owner" 
                    className="inline-flex items-center gap-1.5 text-xs text-primary font-bold hover:underline"
                  >
                    <span>Already a registered partner? Open Bus Owner Dashboard</span>
                    <span>→</span>
                  </a>
                </div>
              </form>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

