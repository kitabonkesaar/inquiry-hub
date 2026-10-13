import { Search, FileText, PhoneCall, MapPin, ArrowRight, ShieldCheck } from 'lucide-react';

const steps = [
  {
    icon: Search,
    stepBadge: 'Step 01',
    badgeText: 'Custom Plan',
    title: 'Share Your Plan',
    description: 'Tell us your dates, pickup city, and group size. We help you choose the ideal vehicle category.',
  },
  {
    icon: FileText,
    stepBadge: 'Step 02',
    badgeText: 'Instant Form',
    title: 'Submit Inquiry',
    description: 'Fill a simple form in under a minute. No upfront payment or documents needed to receive your quote.',
  },
  {
    icon: PhoneCall,
    stepBadge: 'Step 03',
    badgeText: 'Within 30 Mins',
    title: 'Receive Best Quote',
    description: 'Our team calls you within 30 minutes with verified vehicle photos and transparent, all-inclusive pricing.',
  },
  {
    icon: MapPin,
    stepBadge: 'Step 04',
    badgeText: 'Doorstep Pickup',
    title: 'Start Journey',
    description: 'Confirm in one quick call. Your verified vehicle arrives on time at your doorstep—just board and relax.',
  },
];

export function HowItWorksSection() {
  return (
    <section className="py-24 bg-[#0B1E33] text-white relative overflow-hidden border-y border-white/10">
      {/* Ambient background glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-accent/15 border border-accent/30 text-accent text-xs font-bold uppercase tracking-wider mb-4 shadow-xs">
            Simple & Transparent Process
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4 leading-tight">
            From Inquiry to Journey in{' '}
            <span className="text-accent underline decoration-accent/40 decoration-wavy decoration-2">
              4 Simple Steps
            </span>
          </h2>
          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            We remove the back-and-forth calls and confusion so you can focus on making memories—not managing transport.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {/* Connector Line - Desktop Only */}
          <div className="hidden lg:block absolute top-[4.5rem] left-[12%] right-[12%] h-[2px] bg-gradient-to-r from-accent/20 via-accent/60 to-accent/20 z-0 pointer-events-none" />

          {steps.map((step, index) => (
            <div
              key={step.title}
              className="relative z-10 flex flex-col items-center text-center p-7 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-accent/40 backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 shadow-lg group"
            >
              {/* Icon Container with Floating Number */}
              <div className="relative mb-6">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-accent/20 to-accent/5 border border-accent/30 flex items-center justify-center text-accent shadow-inner group-hover:scale-105 transition-transform duration-300">
                  <step.icon className="w-9 h-9 text-accent" />
                </div>
                {/* Step Number Badge */}
                <div className="absolute -top-2.5 -right-2.5 w-8 h-8 rounded-full bg-accent text-[#0B1E33] font-black text-xs flex items-center justify-center shadow-lg border-2 border-[#0B1E33]">
                  {index + 1}
                </div>
              </div>

              {/* Step Sub-badge */}
              <span className="inline-block px-2.5 py-0.5 rounded-md bg-white/10 text-accent text-[11px] font-semibold uppercase tracking-wider mb-2">
                {step.badgeText}
              </span>

              {/* Title */}
              <h3 className="text-lg font-bold text-white mb-2 group-hover:text-accent transition-colors">
                {step.title}
              </h3>

              {/* Description */}
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* Reassurance Footer */}
        <div className="mt-14 pt-8 border-t border-white/10 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs sm:text-sm text-slate-300">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-accent" />
            <span>Zero Advance Required to Get Quotes</span>
          </div>
          <span className="hidden sm:inline text-white/20">•</span>
          <div className="flex items-center gap-2">
            <PhoneCall className="w-4 h-4 text-accent" />
            <span>Dedicated Trip Coordinator Assigned</span>
          </div>
          <span className="hidden sm:inline text-white/20">•</span>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-accent" />
            <span>100% Punctual Doorstep Delivery</span>
          </div>
        </div>
      </div>
    </section>
  );
}

