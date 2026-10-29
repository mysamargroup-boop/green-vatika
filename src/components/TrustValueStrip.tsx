import React from 'react';
import { ShieldCheck, Sprout, PackageCheck, MessageCircle, ThermometerSun, IndianRupee } from 'lucide-react';

export const TrustValueStrip: React.FC = () => {
  const perks = [
    {
      icon: ThermometerSun,
      title: '100% Sun-Acclimatized',
      subtitle: 'Native hardy varieties grown under Indian climate, zero leaf drop',
      badge: 'Local Climate Ready',
    },
    {
      icon: PackageCheck,
      title: 'Root-Ball Safe Delivery',
      subtitle: 'Moist organic coco-peat packaging prevents root transit shock',
      badge: 'Zero Shock',
    },
    {
      icon: Sprout,
      title: 'Pot Optional (+₹60)',
      subtitle: 'Buy in grower polybag from ₹45 or add handcrafted planters',
      badge: 'Fair Pricing',
    },
    {
      icon: MessageCircle,
      title: 'Free WhatsApp Plant Doctor',
      subtitle: 'Direct lifetime guidance from senior Narsinghpur horticulturists',
      badge: '1-on-1 Advice',
    },
  ];

  return (
    <section className="relative z-20 -mt-6 sm:-mt-8 mb-12 sm:mb-16">
      <div className="container mx-auto px-4 md:px-8">
        <div className="bg-card/95 backdrop-blur-xl rounded-3xl p-4 sm:p-6 md:p-8 border border-border/80 shadow-2xl shadow-primary/5">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {perks.map((perk, idx) => {
              const Icon = perk.icon;
              return (
                <div
                  key={idx}
                  className="flex items-start gap-4 p-3 sm:p-4 rounded-2xl bg-secondary/40 hover:bg-secondary/70 border border-border/50 hover:border-primary/30 transition-all duration-300 group"
                >
                  <div className="h-12 w-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-heading font-extrabold text-sm sm:text-base text-foreground leading-snug">
                        {perk.title}
                      </h4>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed font-medium">
                      {perk.subtitle}
                    </p>
                    <span className="inline-block text-[10px] font-bold text-primary uppercase tracking-wider bg-primary/10 px-2 py-0.5 rounded-full mt-1">
                      {perk.badge}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
