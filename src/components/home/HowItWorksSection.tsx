import { Search, FileText, PhoneCall, MapPin } from 'lucide-react';

const steps = [
  {
    icon: Search,
    title: 'Share Your Plan',
    description: 'Tell us your dates, pickup city and group size. We help you choose the ideal vehicle type.',
  },
  {
    icon: FileText,
    title: 'Submit Inquiry',
    description: 'Fill a simple form in under a minute. No advance payment or documents needed to get a quote.',
  },
  {
    icon: PhoneCall,
    title: 'Receive Best Quote',
    description: 'Our team calls you within 30 minutes with options, photos and transparent, all‑inclusive pricing.',
  },
  {
    icon: MapPin,
    title: 'Start Journey',
    description: 'Confirm in one call. Your verified vehicle arrives on time at your doorstep—just board and relax.',
  },
];

export function HowItWorksSection() {
  return (
    <section className="py-24 bg-secondary/50">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block px-4 py-1 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
            Simple Process
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            From inquiry to journey in four simple steps
          </h2>
          <p className="text-muted-foreground text-lg">
            We remove the back‑and‑forth calls and confusion so you can focus on the trip—not the transport.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {/* Connection Line - Desktop Only */}
          <div className="hidden lg:block absolute top-16 left-[12%] right-[12%] h-0.5 bg-gradient-to-r from-accent/20 via-accent to-accent/20" />

          {steps.map((step, index) => (
            <div
              key={step.title}
              className="relative text-center group animate-in fade-in slide-in-from-bottom-8 duration-700 fill-mode-forwards"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              {/* Step Number */}
              <div className="w-32 h-32 mx-auto mb-6 relative transition-transform duration-300 group-hover:scale-105">
                <div className="absolute inset-0 rounded-full bg-accent/10 group-hover:bg-accent/20 transition-colors" />
                <div className="absolute inset-4 rounded-full bg-card border-2 border-accent flex items-center justify-center shadow-lg">
                  <step.icon className="w-10 h-10 text-accent" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-accent text-accent-foreground font-bold flex items-center justify-center text-sm shadow-lg">
                  {index + 1}
                </div>
              </div>

              {/* Content */}
              <h3 className="text-xl font-semibold text-foreground mb-2">
                {step.title}
              </h3>
              <p className="text-muted-foreground">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
