import { useState } from 'react';
import { CalendarDays, Users, PhoneCall, Wallet } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import heroBus from '@/assets/bus-2.jpg';

interface LeadFormState {
  name: string;
  phone: string;
  passengers: string;
  journeyDate: string;
}

export function LeadFormSection() {
  const { toast } = useToast();
  const [leadForm, setLeadForm] = useState<LeadFormState>({
    name: '',
    phone: '',
    passengers: '',
    journeyDate: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLeadForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const { error } = await supabase.from('inquiries').insert({
        full_name: leadForm.name,
        mobile: leadForm.phone,
        passenger_count: parseInt(leadForm.passengers) || 0,
        journey_start_date: leadForm.journeyDate,
        status: 'new'
      });

      if (error) throw error;

      toast({
        title: 'Lead submitted!',
        description: 'Thank you. Our team will get back to you within 30 minutes.',
      });

      setLeadForm({
        name: '',
        phone: '',
        passengers: '',
        journeyDate: '',
      });
    } catch (error) {
      console.error('Error submitting lead:', error);
      toast({
        title: 'Error',
        description: 'Failed to submit lead. Please try again.',
        variant: 'destructive',
      });
    }
  };

  return (
    <section className="py-16 bg-muted/40">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Text + Image */}
          <div className="space-y-6">
            <p className="text-xs sm:text-sm font-semibold uppercase tracking-wide text-accent">
              Share your travel plan
            </p>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground">
              Get a{' '}
              <span className="text-gradient">personalised quote</span> in minutes.
            </h2>
            <p className="text-muted-foreground max-w-xl">
              Tell us when you&apos;re travelling and how many people are in your group.
              We&apos;ll recommend the right vehicle, share route suggestions and send you
              the most competitive pricing—no obligation to book.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                  <PhoneCall className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">Callback in 30 mins</p>
                  <p className="text-muted-foreground text-xs">During business hours</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Users className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">All group sizes</p>
                  <p className="text-muted-foreground text-xs">From 8 to 50+ guests</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-success/10 flex items-center justify-center">
                  <Wallet className="w-5 h-5 text-success" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">Day wise dry pricing</p>
                  <p className="text-muted-foreground text-xs">One-way or round trip</p>
                </div>
              </div>
            </div>

            <div className="relative mt-4 w-full rounded-2xl overflow-hidden shadow-xl border border-border">
              <img
                src={heroBus}
                alt="Comfortable RentAnyBus coach"
                className="w-full h-48 object-cover"
              />
            </div>
          </div>

          {/* Lead Form */}
          <div className="p-6 md:p-8 rounded-2xl bg-card border border-border card-shadow max-w-lg ml-auto w-full">
            <h3 className="text-xl md:text-2xl font-semibold text-foreground mb-1">
              Want to rent a bus ?
            </h3>
            <p className="text-sm text-muted-foreground mb-6">
              Just share basic details and we&apos;ll call you with route options, prices,
              and vehicle suggestions.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="leadName">Name</Label>
                <Input
                  id="leadName"
                  name="name"
                  value={leadForm.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  required
                />
              </div>
              <div>
                <Label htmlFor="leadPhone">Contact No</Label>
                <Input
                  id="leadPhone"
                  name="phone"
                  type="tel"
                  value={leadForm.phone}
                  onChange={handleChange}
                  placeholder="+91 82495 29220"
                  required
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="leadPassengers">No. of Passengers</Label>
                  <Input
                    id="leadPassengers"
                    name="passengers"
                    type="number"
                    min="1"
                    value={leadForm.passengers}
                    onChange={handleChange}
                    placeholder="e.g., 25"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="leadJourneyDate">Date of Journey</Label>
                  <Input
                    id="leadJourneyDate"
                    name="journeyDate"
                    type="date"
                    value={leadForm.journeyDate}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <Button type="submit" variant="accent" className="w-full">
                Submit
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}


