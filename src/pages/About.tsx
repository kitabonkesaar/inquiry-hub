import { Link } from 'react-router-dom';
import { Award, Users, MapPin, Shield, Clock, Heart, ArrowRight } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';

const stats = [
  { value: '10+', label: 'Years Experience' },
  { value: '500+', label: 'Happy Clients' },
  { value: '50+', label: 'Vehicles' },
  { value: '100+', label: 'Cities Served' },
];

const values = [
  {
    icon: Shield,
    title: 'Safety First',
    description: 'All our vehicles are regularly maintained, verified, and fully insured for your peace of mind.',
  },
  {
    icon: Clock,
    title: 'Reliability',
    description: 'We pride ourselves on punctuality. Our vehicles arrive on time, every time.',
  },
  {
    icon: Heart,
    title: 'Customer Care',
    description: "From your first inquiry to the end of your journey, we're here to support you.",
  },
  {
    icon: Award,
    title: 'Quality Service',
    description: 'Professional drivers, clean vehicles, and attention to detail in everything we do.',
  },
];

export default function AboutPage() {
  return (
    <Layout>
      {/* Hero */}
      <section className="hero-gradient py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-block px-4 py-1 rounded-full bg-primary-foreground/10 text-primary-foreground text-sm font-medium mb-6">
              About Us
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
              Your Trusted Partner for <span className="text-gradient">Safe Journeys</span>
            </h1>
            <p className="text-lg text-primary-foreground/80">
              For over a decade, RentAnyBus has been helping families, corporates, and tour groups travel across India with comfort, safety, and reliability.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-card border-b border-border">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-4xl md:text-5xl font-bold text-accent mb-2">{stat.value}</p>
                <p className="text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="inline-block px-4 py-1 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
                Our Story
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                A Journey Built on Trust
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  RentAnyBus started in 2013 with a simple mission: to make bus and traveler rentals easy, transparent, and reliable for everyone. What began with just 3 vehicles has grown into a fleet of over 50 well-maintained buses and tempo travellers.
                </p>
                <p>
                  Our founder, having experienced the frustration of unreliable rental services during family trips, decided to build a company that puts customer trust and safety above everything else.
                </p>
                <p>
                  Today, we serve clients across 100+ cities in India, from family pilgrimages to corporate events, from wedding transportation to school excursions. Every journey is personal to us.
                </p>
              </div>
              <Link to="/vehicles" className="inline-block mt-8">
                <Button variant="accent" size="lg">
                  Explore Our Fleet
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-2xl bg-muted overflow-hidden">
                <img
                  src="/placeholder.svg"
                  alt="Our team"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 p-6 rounded-xl bg-accent text-accent-foreground shadow-lg">
                <p className="text-4xl font-bold">10+</p>
                <p className="text-sm">Years of Trust</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-muted/50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="inline-block px-4 py-1 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
              Our Values
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              What Drives Us
            </h2>
            <p className="text-muted-foreground text-lg">
              These core values guide every decision we make and every service we provide.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value) => (
              <div
                key={value.title}
                className="p-8 rounded-2xl bg-card border border-border card-shadow text-center"
              >
                <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-7 h-7 text-accent" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Regions */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="inline-block px-4 py-1 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
              Coverage
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Where We Operate
            </h2>
            <p className="text-muted-foreground text-lg">
              We provide services across major cities and popular tourist destinations in North India.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            {['Delhi NCR', 'Rajasthan', 'Uttarakhand', 'Himachal Pradesh', 'Punjab', 'Haryana', 'Uttar Pradesh', 'Madhya Pradesh'].map((region) => (
              <div
                key={region}
                className="flex items-center gap-2 px-6 py-3 rounded-full bg-card border border-border"
              >
                <MapPin className="w-4 h-4 text-accent" />
                <span className="font-medium text-foreground">{region}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 hero-gradient">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            Ready to Start Your Journey?
          </h2>
          <p className="text-lg text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Let us help you plan your next trip. Get a free quote today.
          </p>
          <Link to="/inquiry">
            <Button variant="hero" size="xl">
              Get Free Quote
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
}
