import { useState } from 'react';
import { Bus, CheckCircle } from 'lucide-react';
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
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    city: '',
    vehicleDetails: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase
        .from('bus_owner_leads')
        .insert({
          full_name: formData.name,
          mobile: formData.mobile,
          city: formData.city,
          vehicle_details: formData.vehicleDetails,
          status: 'new'
        });

      if (error) throw error;

      setSubmitted(true);
      toast({
        title: 'Interest Registered!',
        description: 'We will contact you shortly to verify your details.',
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: 'Error',
        description: 'Failed to submit details. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold mb-4">Thank You!</h2>
          <p className="text-white/80 max-w-lg mx-auto">
            We have received your details. Our partner onboarding team will reach out to you within 24 hours to discuss the next steps.
          </p>
          <Button 
            variant="secondary" 
            className="mt-8"
            onClick={() => {
              setSubmitted(false);
              setFormData({ name: '', mobile: '', city: '', vehicleDetails: '' });
            }}
          >
            Register Another Vehicle
          </Button>
        </div>
      </section>
    );
  }

  return (
    <section id="list-your-bus" className="py-20 bg-primary text-primary-foreground relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=2069&auto=format&fit=crop')] bg-cover bg-center opacity-10" />
      <div className="absolute inset-0 bg-primary/90" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white text-xs font-medium mb-6">
              <Bus className="w-3 h-3" />
              <span>For Bus Owners</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
              Grow Your Business with RentAnyBus
            </h2>
            <p className="text-lg text-white/80 mb-8 max-w-xl">
              Join our network of verified bus operators. List your vehicles on our platform and get consistent bookings from corporate clients, schools, and tour groups.
            </p>
            <ul className="space-y-4 mb-8">
              {[
                'Zero listing fees',
                'Verified leads & bookings',
                'Timely payments',
                'Dedicated support team'
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                    <CheckCircle className="w-3.5 h-3.5 text-white" />
                  </div>
                  <span className="font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-background text-foreground rounded-2xl p-6 md:p-8 shadow-2xl">
            <h3 className="text-xl font-bold mb-2">Partner with us</h3>
            <p className="text-sm text-muted-foreground mb-6">
              Fill in your details and we'll help you get started.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="owner-name">Your Name</Label>
                  <Input 
                    id="owner-name" 
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter full name" 
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="owner-mobile">Mobile Number</Label>
                  <Input 
                    id="owner-mobile" 
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    type="tel" 
                    placeholder="10-digit mobile" 
                    required 
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="owner-city">City</Label>
                <Input 
                  id="owner-city" 
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="Where are you based?" 
                  required 
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="vehicle-details">Vehicle Details</Label>
                <Textarea 
                  id="vehicle-details" 
                  name="vehicleDetails"
                  value={formData.vehicleDetails}
                  onChange={handleChange}
                  placeholder="e.g., 2 x 45 Seater Volvo, 1 x Tempo Traveller..." 
                  className="resize-none"
                  rows={3}
                />
              </div>

              <Button type="submit" className="w-full" size="lg" disabled={loading}>
                {loading ? 'Submitting...' : 'Submit Request'}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
