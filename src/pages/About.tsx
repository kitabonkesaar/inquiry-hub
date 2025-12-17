import { Layout } from '@/components/layout/Layout';
import { Shield, Users, Award, MapPin, Check } from 'lucide-react';

export default function About() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="hero-gradient py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
              About RentAnyBus
            </h1>
            <p className="text-xl text-primary-foreground/80 leading-relaxed">
              We are Odisha's leading bus and tempo traveller rental service, dedicated to making group travel seamless, comfortable, and affordable across the state.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-foreground">
                Odisha's Only Dedicated Bus Rental Service
              </h2>
              <p className="text-muted-foreground text-lg">
                RentAnyBus stands alone as the premier specialized provider for group transportation in Odisha. We are the only service fully dedicated to:
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                   <div className="mt-1 p-1 bg-accent/10 rounded-full"><Check className="w-4 h-4 text-accent" /></div>
                   <div>
                     <strong className="block text-foreground">Tirth Yatra & Pilgrimages</strong>
                     <span className="text-muted-foreground">Specialized fleet for Jagannath Dham, Lingaraj, and extended religious tours.</span>
                   </div>
                </li>
                <li className="flex items-start gap-3">
                   <div className="mt-1 p-1 bg-accent/10 rounded-full"><Check className="w-4 h-4 text-accent" /></div>
                   <div>
                     <strong className="block text-foreground">Corporate Tours</strong>
                     <span className="text-muted-foreground">Premium AC coaches with Wi-Fi for offsites and conferences.</span>
                   </div>
                </li>
                <li className="flex items-start gap-3">
                   <div className="mt-1 p-1 bg-accent/10 rounded-full"><Check className="w-4 h-4 text-accent" /></div>
                   <div>
                     <strong className="block text-foreground">School & College Picnics</strong>
                     <span className="text-muted-foreground">Safe, verified buses with experienced drivers for student excursions.</span>
                   </div>
                </li>
              </ul>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="p-6 bg-accent/10 rounded-2xl">
                <h3 className="text-4xl font-bold text-accent mb-2">10+</h3>
                <p className="font-medium">Years of Experience</p>
              </div>
              <div className="p-6 bg-primary/10 rounded-2xl">
                <h3 className="text-4xl font-bold text-primary mb-2">500+</h3>
                <p className="font-medium">Happy Corporate Clients</p>
              </div>
              <div className="p-6 bg-success/10 rounded-2xl">
                <h3 className="text-4xl font-bold text-success mb-2">10k+</h3>
                <p className="font-medium">Successful Trips</p>
              </div>
              <div className="p-6 bg-warning/10 rounded-2xl">
                <h3 className="text-4xl font-bold text-warning mb-2">50+</h3>
                <p className="font-medium">Cities Covered</p>
              </div>
            </div>
          </div>

          {/* Why Choose Us */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-center mb-12">Why Rent With Us?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-8 rounded-2xl bg-card border border-border card-shadow hover:shadow-lg transition-shadow">
                <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center mb-6">
                  <Shield className="w-7 h-7 text-accent" />
                </div>
                <h3 className="text-xl font-bold mb-4">Safety First</h3>
                <p className="text-muted-foreground">
                  Every bus and traveller in our fleet undergoes rigorous safety checks. Our drivers are verified, experienced, and well-versed with Odisha's routes.
                </p>
              </div>
              <div className="p-8 rounded-2xl bg-card border border-border card-shadow hover:shadow-lg transition-shadow">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                  <Award className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-4">Premium Fleet</h3>
                <p className="text-muted-foreground">
                  From 13-seater Winger to 50-seater Volvo Multi-axle buses, we have the widest range of luxury and standard vehicles in Bhubaneswar and Cuttack.
                </p>
              </div>
              <div className="p-8 rounded-2xl bg-card border border-border card-shadow hover:shadow-lg transition-shadow">
                <div className="w-14 h-14 rounded-full bg-success/10 flex items-center justify-center mb-6">
                  <MapPin className="w-7 h-7 text-success" />
                </div>
                <h3 className="text-xl font-bold mb-4">Local Expertise</h3>
                <p className="text-muted-foreground">
                  We know Odisha best. Get expert route planning for Golden Triangle tours (Bhubaneswar-Puri-Konark), Chilika Lake, and tribal tours.
                </p>
              </div>
            </div>
          </div>

          {/* Areas We Serve */}
          <div className="bg-muted/30 rounded-3xl p-8 md:p-12">
            <h2 className="text-3xl font-bold text-center mb-8">Serving All Across Odisha</h2>
            <div className="flex flex-wrap justify-center gap-4">
              {['Bhubaneswar', 'Cuttack', 'Puri', 'Rourkela', 'Sambalpur', 'Balasore', 'Berhampur', 'Baripada', 'Angul', 'Jharsuguda'].map((city) => (
                <span key={city} className="px-6 py-3 rounded-full bg-background border border-border font-medium shadow-sm">
                  {city}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
