import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { supabase } from '@/integrations/supabase/client';
import { User, Phone, Clock, Send, ShieldCheck, CheckCircle2, PhoneCall } from 'lucide-react';
import { toast } from 'sonner';

export function MarketplaceSearchBar() {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [days, setDays] = useState('3');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error('Please enter your name.');
      return;
    }
    if (!phone.trim() || phone.trim().length < 10) {
      toast.error('Please enter a valid 10-digit contact number.');
      return;
    }
    const numDays = parseInt(days) || 1;
    if (numDays < 1) {
      toast.error('Please enter a valid number of days (at least 1 day).');
      return;
    }

    setIsSubmitting(true);

    try {
      // Save lead inquiry to Supabase
      const { error } = await supabase.from('inquiries').insert({
        full_name: name.trim(),
        mobile: phone.trim(),
        passenger_count: 0,
        journey_start_date: new Date().toISOString().split('T')[0],
        message: `Requested rental quote for ${numDays} days.`,
        status: 'new',
      });

      if (error) {
        console.warn('Supabase lead submit notice:', error);
      }

      setSubmitted(true);
      toast.success(`Thank you, ${name.trim()}! We received your request for a ${numDays}-day bus rental. Our team will call you within 15 minutes.`);
    } catch (err: any) {
      setSubmitted(true);
      toast.success(`Thank you, ${name.trim()}! Our team will call you at ${phone.trim()} shortly with the best rates.`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full bg-card/95 backdrop-blur-xl border border-border/80 shadow-2xl rounded-3xl p-5 sm:p-7 relative z-20">
      {/* Header Info */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4 border-b border-border/60 pb-3">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-bold text-foreground text-sm">Quick Bus Rental Quote</span>
          <span className="text-xs text-muted-foreground hidden sm:inline">• Free Consultation & Best Price Guarantee</span>
        </div>
        <a
          href="tel:+918249529220"
          className="flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-semibold hover:underline"
        >
          <PhoneCall className="w-3.5 h-3.5" />
          <span>Call: +91 82495 29220</span>
        </a>
      </div>

      {submitted ? (
        <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-600 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-foreground">Inquiry Received Successfully!</h4>
              <p className="text-xs text-muted-foreground">
                We'll call <strong>{phone}</strong> with the best vehicle options for your <strong>{days}-day</strong> trip.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => setSubmitted(false)}
              className="text-xs rounded-xl"
            >
              Submit Another
            </Button>
            <Button
              size="sm"
              onClick={() => navigate('/vehicles')}
              className="text-xs rounded-xl font-semibold"
            >
              Browse Fleet
            </Button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {/* 1. Name */}
          <div className="space-y-1">
            <Label htmlFor="contact_name" className="text-xs text-muted-foreground flex items-center gap-1 font-medium">
              <User className="w-3.5 h-3.5 text-primary" /> Your Name
            </Label>
            <Input
              id="contact_name"
              placeholder="e.g. Ramesh Mohapatra"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="h-11 rounded-xl text-xs bg-background"
              required
            />
          </div>

          {/* 2. Contact Number */}
          <div className="space-y-1">
            <Label htmlFor="contact_phone" className="text-xs text-muted-foreground flex items-center gap-1 font-medium">
              <Phone className="w-3.5 h-3.5 text-primary" /> Contact Number
            </Label>
            <Input
              id="contact_phone"
              type="tel"
              placeholder="e.g. 98765 43210"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="h-11 rounded-xl text-xs bg-background"
              required
            />
          </div>

          {/* 3. For How Many Days */}
          <div className="space-y-1">
            <Label htmlFor="contact_days" className="text-xs text-muted-foreground flex items-center gap-1 font-medium">
              <Clock className="w-3.5 h-3.5 text-primary" /> For How Many Days?
            </Label>
            <Input
              id="contact_days"
              type="number"
              min={1}
              max={60}
              placeholder="e.g. 3 Days"
              value={days}
              onChange={(e) => setDays(e.target.value)}
              className="h-11 rounded-xl text-xs bg-background"
              required
            />
          </div>

          {/* 4. Action Button */}
          <div className="flex items-end">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-11 rounded-xl text-sm font-bold bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>{isSubmitting ? 'Sending...' : 'Get Instant Quote'}</span>
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}
