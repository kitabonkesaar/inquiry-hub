import { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Send, Phone, MessageCircle, CheckCircle } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { vehicles } from '@/data/vehicles';
import { useToast } from '@/hooks/use-toast';

export default function InquiryPage() {
  const [searchParams] = useSearchParams();
  const preselectedVehicle = searchParams.get('vehicle');
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    vehicleType: preselectedVehicle ? vehicles.find(v => v.id === preselectedVehicle)?.type || '' : '',
    preferredVehicle: preselectedVehicle || '',
    startDate: '',
    endDate: '',
    pickupLocation: '',
    dropLocation: '',
    passengers: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    setLoading(false);
    setSubmitted(true);
    toast({
      title: "Inquiry Submitted!",
      description: "Our team will contact you within 30 minutes.",
    });
  };

  if (submitted) {
    return (
      <Layout>
        <section className="py-24 bg-background min-h-[70vh] flex items-center">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-xl mx-auto text-center">
              <div className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-success" />
              </div>
              <h1 className="text-3xl font-bold text-foreground mb-4">
                Inquiry Submitted Successfully!
              </h1>
              <p className="text-muted-foreground mb-8">
                Thank you for your interest! Our team will review your requirements and contact you within <strong>30 minutes</strong> during business hours.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer">
                  <Button variant="accent" size="lg">
                    <MessageCircle className="w-5 h-5" />
                    Chat on WhatsApp
                  </Button>
                </a>
                <Link to="/vehicles">
                  <Button variant="outline" size="lg">
                    Browse More Vehicles
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Hero */}
      <section className="hero-gradient py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-2xl">
            <h1 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
              Get a Free Quote
            </h1>
            <p className="text-lg text-primary-foreground/80">
              Fill out the form below and our team will contact you within 30 minutes with the best price.
            </p>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Form */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Info */}
                <div className="p-6 rounded-2xl bg-card border border-border card-shadow">
                  <h3 className="font-semibold text-foreground mb-4">Your Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Enter your name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Mobile Number *</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        placeholder="+91 98765 43210"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label htmlFor="email">Email (Optional)</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>
                </div>

                {/* Vehicle Preference */}
                <div className="p-6 rounded-2xl bg-card border border-border card-shadow">
                  <h3 className="font-semibold text-foreground mb-4">Vehicle Preference</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="vehicleType">Vehicle Type *</Label>
                      <select
                        id="vehicleType"
                        name="vehicleType"
                        value={formData.vehicleType}
                        onChange={handleChange}
                        required
                        className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      >
                        <option value="">Select type</option>
                        <option value="bus">Bus</option>
                        <option value="traveller">Tempo Traveller</option>
                      </select>
                    </div>
                    <div>
                      <Label htmlFor="preferredVehicle">Preferred Vehicle (Optional)</Label>
                      <select
                        id="preferredVehicle"
                        name="preferredVehicle"
                        value={formData.preferredVehicle}
                        onChange={handleChange}
                        className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      >
                        <option value="">Select vehicle</option>
                        {vehicles.map((v) => (
                          <option key={v.id} value={v.id}>{v.name}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <Label htmlFor="passengers">Number of Passengers *</Label>
                      <Input
                        id="passengers"
                        name="passengers"
                        type="number"
                        value={formData.passengers}
                        onChange={handleChange}
                        required
                        placeholder="e.g., 25"
                        min="1"
                      />
                    </div>
                  </div>
                </div>

                {/* Journey Details */}
                <div className="p-6 rounded-2xl bg-card border border-border card-shadow">
                  <h3 className="font-semibold text-foreground mb-4">Journey Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="startDate">Journey Start Date *</Label>
                      <Input
                        id="startDate"
                        name="startDate"
                        type="date"
                        value={formData.startDate}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="endDate">Journey End Date *</Label>
                      <Input
                        id="endDate"
                        name="endDate"
                        type="date"
                        value={formData.endDate}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="pickupLocation">Pickup Location *</Label>
                      <Input
                        id="pickupLocation"
                        name="pickupLocation"
                        value={formData.pickupLocation}
                        onChange={handleChange}
                        required
                        placeholder="e.g., Delhi, Connaught Place"
                      />
                    </div>
                    <div>
                      <Label htmlFor="dropLocation">Drop Location *</Label>
                      <Input
                        id="dropLocation"
                        name="dropLocation"
                        value={formData.dropLocation}
                        onChange={handleChange}
                        required
                        placeholder="e.g., Haridwar"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label htmlFor="message">Additional Requirements (Optional)</Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Any special requirements, multiple stops, overnight stay, etc."
                        rows={4}
                      />
                    </div>
                  </div>
                </div>

                {/* Submit */}
                <Button type="submit" variant="accent" size="xl" className="w-full" disabled={loading}>
                  {loading ? (
                    <>Submitting...</>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Submit Inquiry
                    </>
                  )}
                </Button>
              </form>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* Quick Contact */}
                <div className="p-6 rounded-2xl bg-card border border-border card-shadow">
                  <h3 className="font-semibold text-foreground mb-4">Need Help?</h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    Our team is available to assist you with your booking.
                  </p>
                  <div className="space-y-3">
                    <a
                      href="tel:+919876543210"
                      className="flex items-center gap-3 p-3 rounded-lg bg-muted hover:bg-muted/80 transition-colors"
                    >
                      <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                        <Phone className="w-5 h-5 text-accent" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">Call Us</p>
                        <p className="text-sm text-muted-foreground">+91 98765 43210</p>
                      </div>
                    </a>
                    <a
                      href="https://wa.me/919876543210"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 rounded-lg bg-muted hover:bg-muted/80 transition-colors"
                    >
                      <div className="w-10 h-10 rounded-full bg-success/10 flex items-center justify-center">
                        <MessageCircle className="w-5 h-5 text-success" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">WhatsApp</p>
                        <p className="text-sm text-muted-foreground">Quick Response</p>
                      </div>
                    </a>
                  </div>
                </div>

                {/* Why Choose Us */}
                <div className="p-6 rounded-2xl bg-primary text-primary-foreground">
                  <h3 className="font-semibold mb-4">Why Choose Us?</h3>
                  <ul className="space-y-3 text-sm text-primary-foreground/80">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-accent" />
                      Response within 30 minutes
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-accent" />
                      No hidden charges
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-accent" />
                      Verified & insured vehicles
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-accent" />
                      Professional drivers
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-accent" />
                      24/7 support
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
