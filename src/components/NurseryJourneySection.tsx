import React from 'react';
import { Sprout, CheckCircle2, ShieldCheck, HeartHandshake, Leaf, ArrowRight } from 'lucide-react';

export const NurseryJourneySection: React.FC = () => {
  const steps = [
    {
      step: '01',
      title: 'Grown in Native Soil Beds',
      subtitle: 'Sun-Hardened Flora',
      description:
        'Cultivated organically in our nursery ground beds at Teen Puliya, Narsinghpur. Hardened to endure hot Central Indian climates (up to 45°C) without leaf scorch.',
      icon: Sprout,
      badge: 'Native Soil',
    },
    {
      step: '02',
      title: '3-Step Quality Screening',
      subtitle: 'Roots & Leaf Check',
      description:
        'Every plant undergoes deep root-density checks, stem vigor testing, and a certified 100% pest-free natural neem-oil wash before being approved for release.',
      icon: CheckCircle2,
      badge: 'Triple Inspected',
    },
    {
      step: '03',
      title: 'Moisture-Locked Eco Wrap',
      subtitle: 'Zero Root Disturbance',
      description:
        'Roots are wrapped in organic coco-peat and vermicompost enriched bio-wrap, retaining moisture and essential microbes without breaking the root ball.',
      icon: ShieldCheck,
      badge: 'Moisture Lock',
    },
    {
      step: '04',
      title: 'Direct Handover & Thriving Growth',
      subtitle: 'Zero Acclimatization Shock',
      description:
        'Pick up fresh from our nursery within 2 hours or order custom coordination. Your plant transitions into your living room or balcony seamlessly.',
      icon: HeartHandshake,
      badge: 'Zero Shock',
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-[#FAF7F2] dark:bg-card/50 border-y border-border/50 relative overflow-hidden">
      {/* Decorative botanical subtle backdrop orb */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        {/* Section Heading: Ugaao Editorial Luxury Style */}
        <div className="max-w-3xl mx-auto text-center mb-14 md:mb-18 space-y-3">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1 text-xs font-bold uppercase tracking-wider text-primary">
            <Leaf className="h-3.5 w-3.5" /> The Green Vatika Standard
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">
            From Our Nursery to Your Living Room
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground font-medium max-w-xl mx-auto">
            Unlike commercial roadside sellers, every sapling is lovingly nurtured in organic potting beds, certified pest-free, and prepared for zero transplant shock.
          </p>
        </div>

        {/* 4-Column Step Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="group relative rounded-2xl bg-white dark:bg-card p-6 border border-[#EBE5DA] dark:border-border/80 shadow-xs hover:shadow-xl hover:border-primary/40 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Top Step Number & Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-heading font-black text-3xl text-primary/20 group-hover:text-primary transition-colors">
                      {item.step}
                    </span>
                    <div className="h-12 w-12 rounded-2xl bg-[#0A4C36]/10 text-[#0A4C36] dark:text-emerald-400 flex items-center justify-center group-hover:bg-[#0A4C36] group-hover:text-white transition-all shadow-xs">
                      <Icon className="h-6 w-6" />
                    </div>
                  </div>

                  {/* Badge */}
                  <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-primary bg-primary/10 px-2.5 py-0.5 rounded-full mb-2">
                    {item.badge}
                  </span>

                  {/* Title & Subtitle */}
                  <h3 className="font-heading font-bold text-lg text-foreground group-hover:text-primary transition-colors leading-snug">
                    {item.title}
                  </h3>
                  <div className="text-xs text-muted-foreground font-medium mb-3">
                    {item.subtitle}
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Bottom Progress Accent */}
                <div className="mt-6 pt-4 border-t border-border/40 flex items-center gap-1 text-[11px] font-bold text-primary">
                  <span>Guaranteed Freshness</span>
                  <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
